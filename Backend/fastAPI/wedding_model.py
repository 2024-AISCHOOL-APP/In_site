import pandas as pd
import numpy as np
from konlpy.tag import Okt
from scipy.optimize import linprog
import pickle
from joblib import Parallel, delayed

# 토큰화된 데이터 로드
def load_tokenized_data():
    dress_data = pd.read_pickle('dress_data_with_tokens.pkl')
    makeup_data = pd.read_pickle('makeup_data_with_tokens.pkl')
    studio_data = pd.read_pickle('studio_data_with_tokens.pkl')
    wedding_data = pd.read_pickle('wedding_data_with_tokens.pkl')
    return dress_data, makeup_data, studio_data, wedding_data

# 모델 및 데이터 로드
def load_model_and_data(filename):
    with open(filename, 'rb') as f:
        data = pickle.load(f)
    return data['regressors'], data['vectorizers']

# 데이터에 예측 평점을 추가
def add_predicted_scores(data, regressor, vectorizer):
    features = vectorizer.transform(data['tokens'])
    features = np.hstack((data[['price', 'latitude', 'longitude']].values, features.toarray()))
    data['predicted_score'] = regressor.predict(features)
    return data

# 병렬 처리를 사용하여 예측 평점을 추가하는 함수
def add_predicted_scores_parallel(data, regressor, vectorizer):
    result = Parallel(n_jobs=-1)(delayed(add_predicted_scores)(group, regressor, vectorizer) for name, group in data.groupby('category'))
    return pd.concat(result)

# guest_count를 피처에 추가
def add_predicted_scores(data, regressor, vectorizer, guest_count=None):
    features = vectorizer.transform(data['tokens'])
    
    if 'wedding' in data.columns:
        guest_count_column = np.full((features.shape[0], 1), guest_count)
        features = np.hstack((data[['price', 'latitude', 'longitude']].values, features.toarray(), guest_count_column))
    else:
        features = np.hstack((data[['price', 'latitude', 'longitude']].values, features.toarray()))
    
    data['predicted_score'] = regressor.predict(features)
    return data

# 선형 프로그래밍을 사용하여 최적 조합 찾기
# find_best_combination 함수에 guest_count 추가
def find_best_combination(dress_data, makeup_data, studio_data, wedding_data, regressors, vectorizers, budget, user_latitude, user_longitude, guest_count):
    dress_data = add_predicted_scores(dress_data, regressors['dress'], vectorizers['dress'])
    makeup_data = add_predicted_scores(makeup_data, regressors['makeup'], vectorizers['makeup'])
    studio_data = add_predicted_scores(studio_data, regressors['studio'], vectorizers['studio'])
    wedding_data = add_predicted_scores(wedding_data, regressors['wedding'], vectorizers['wedding'], guest_count)
    
    dress_data = dress_data.dropna(subset=['price'])
    makeup_data = makeup_data.dropna(subset=['price'])
    studio_data = studio_data.dropna(subset=['price'])
    wedding_data = wedding_data.dropna(subset=['price'])
    
    all_data = pd.concat([
        dress_data.assign(category='dress'),
        makeup_data.assign(category='makeup'),
        studio_data.assign(category='studio'),
        wedding_data.assign(category='wedding')
    ])
    
    num_items = len(all_data)
    c = -all_data['predicted_score'].values
    
    all_data['distance'] = np.sqrt((all_data['latitude'] - user_latitude)**2 + (all_data['longitude'] - user_longitude)**2)
    all_data['weighted_price'] = all_data['price'] * (1 + 2 * (all_data['distance'] / all_data['distance'].max()))
    
    A_ub = all_data['weighted_price'].values.reshape(1, -1)
    b_ub = [budget]
    
    bounds = [(0, 1) for _ in range(num_items)]
    
    A_eq = np.zeros((4, num_items))
    for i, category in enumerate(['dress', 'makeup', 'studio', 'wedding']):
        A_eq[i, all_data['category'] == category] = 1
    b_eq = [1, 1, 1, 1]
    
    res = linprog(c, A_ub=A_ub, b_ub=b_ub, A_eq=A_eq, b_eq=b_eq, bounds=bounds, method='highs')
    
    if res.success:
        selected_indices = res.x > 0.5
        selected_items = all_data.iloc[selected_indices]
        total_price = selected_items['price'].sum()
        selected_items = selected_items.reset_index(drop=True)
        
        while total_price > budget:
            excess_budget = total_price - budget
            penalty = 1e6 * excess_budget / budget
            c = -all_data['predicted_score'].values + penalty * all_data['price'].values
            res = linprog(c, A_ub=A_ub, b_ub=b_ub, A_eq=A_eq, b_eq=b_eq, bounds=bounds, method='highs')
            if res.success:
                selected_indices = res.x > 0.5
                selected_items = all_data.iloc[selected_indices]
                total_price = selected_items['price'].sum()
                selected_items = selected_items.reset_index(drop=True)
            else:
                break
        
        return selected_items, total_price
    else:
        return pd.DataFrame(), 0

# 추천 생성
def recommend_services_within_budget(dress_data, makeup_data, studio_data, wedding_data, regressors, vectorizers, budget, user_latitude, user_longitude, guest_count):
    selected_items, total_price = find_best_combination(dress_data, makeup_data, studio_data, wedding_data, regressors, vectorizers, budget, user_latitude, user_longitude, guest_count)
    
    if selected_items.empty:
        return None
    
    recommendations = {
        'dress': selected_items[selected_items['category'] == 'dress'],
        'makeup': selected_items[selected_items['category'] == 'makeup'],
        'studio': selected_items[selected_items['category'] == 'studio'],
        'wedding': selected_items[selected_items['category'] == 'wedding']
    }
    
    return {
        'total_price': int(total_price),
        'recommendations': recommendations
    }