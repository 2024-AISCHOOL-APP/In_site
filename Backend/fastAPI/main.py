from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging
from wedding_model import load_tokenized_data, load_model_and_data, recommend_services_within_budget
from fastapi.responses import JSONResponse
import numpy as np
import pandas as pd
import mysql.connector
import random
from datetime import datetime, timedelta

# FastAPI 인스턴스 생성
app = FastAPI()

# CORS 설정 추가
origins = ["http://localhost:3000", "http://localhost:8300"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 로그 설정
logging.basicConfig(level=logging.INFO)

# 추천 결과를 저장할 전역 변수
recommendation_result = {}
# 날짜를 저장할 전역 변수
wedding_date_str = ""

# 요청 바디 정의
class RecommendationRequest(BaseModel):
    budget: int
    user_latitude: float
    user_longitude: float

# 예산 문자열을 숫자로 변환하는 함수
def parse_budget(budget_str):
    budget_str = budget_str.replace('만원', '').replace(' ', '')
    if '이하' in budget_str:
        return int(budget_str.split('이하')[0]) * 10000
    elif '이상' in budget_str:
        return int(budget_str.split('이상')[0]) * 10000
    elif '~' in budget_str:
        return int(budget_str.split('~')[1]) * 10000
    else:
        raise ValueError("Invalid budget format")

# 데이터베이스 연결 설정
def get_db_connection():
    connection = mysql.connector.connect(
        host = "project-db-stu3.smhrd.com",
        user = "Insa5_App_hacksim_3",
        password = "aischool3",
        database = "Insa5_App_hacksim_3",
        port = 3307
    )
    return connection

# DB에서 상품 정보를 가져오는 함수
def get_product_info_by_idx(idx, table):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        if table == 'tbl_product':
            query = "SELECT prod_idx, prod_img FROM tbl_product WHERE prod_idx = %s"
        else:
            query = "SELECT store_idx, store_img FROM tbl_store WHERE store_idx = %s"
        cursor.execute(query, (int(idx),))  # idx를 int로 변환
        product_info = cursor.fetchone()
        cursor.close()
        connection.close()
        return product_info
    except mysql.connector.Error as err:
        logging.error(f"Database error: {err}")
        return None

@app.post("/upload")
async def upload_images(
    lref: str = Form(...),
    sref: str = Form(...),
    dates: str = Form(...),
    times: str = Form(...),
    moneys: str = Form(...),
    persons: str = Form(...),
    pluspersons: str = Form(...)
):
    global recommendation_result, wedding_date_str

    logging.info("Form Data Received:")
    logging.info(f"lref: {lref}")
    logging.info(f"sref: {sref}")
    logging.info(f"dates: {dates}")
    logging.info(f"times: {times}")
    logging.info(f"moneys: {moneys}")
    logging.info(f"persons: {persons}")
    logging.info(f"pluspersons: {pluspersons}")

    wedding_date_str = dates

    try:
        budget = parse_budget(moneys)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    user_latitude, user_longitude = map(float, sref.split(", "))
    guest_count = int(persons)

    # 모델 및 데이터 로드
    regressors, vectorizers = load_model_and_data('model_and_data.pkl')
    dress_data, makeup_data, studio_data, wedding_data = load_tokenized_data()

    # 추천 결과 생성
    recommendation = recommend_services_within_budget(dress_data, makeup_data, studio_data, wedding_data, regressors, vectorizers, budget, user_latitude, user_longitude, guest_count)

    if recommendation:
        recommendation_result = recommendation
        return {"message": "Recommendation generated successfully"}
    else:
        raise HTTPException(status_code=404, detail="No suitable recommendations found within the budget")

@app.get("/data")
async def get_data():
    global recommendation_result, wedding_date_str

    def convert_to_serializable(data):
        if isinstance(data, np.int64):
            return int(data)
        if isinstance(data, pd.DataFrame):
            return data.to_dict(orient='records')
        raise TypeError(f"Object of type {type(data)} is not JSON serializable")

    if not recommendation_result:
        try:
            connection = get_db_connection()
            cursor = connection.cursor(dictionary=True)
            cursor.execute("SELECT * FROM tbl_store")
            products = cursor.fetchall()
            cursor.close()
            connection.close()
            
            # 데이터 변환
            data = {"products": [convert_to_serializable(prod) for prod in products]}
            return JSONResponse(content=data)

        except mysql.connector.Error as err:
            logging.error(f"Error: {err}")
            raise HTTPException(status_code=500, detail="Database connection error")
    else:
        recommendation = recommendation_result['recommendations']
        
        def get_img_by_idx(idx, category):
            if category == 'wedding':
                table = 'tbl_product'
                img_col = 'prod_img'
            else:
                table = 'tbl_store'
                img_col = 'store_img'
            product_info = get_product_info_by_idx(idx, table)
            if product_info:
                return product_info.get(img_col, '/img/default.jpg')
            else:
                logging.warning(f"No image found for idx {idx} in {category}")
                return '/img/default.jpg'
        
        def random_date(start_date, end_date):
            delta = end_date - start_date
            random_days = random.randint(0, delta.days)
            return start_date + timedelta(days=random_days)
        
        wedding_date = datetime.strptime(wedding_date_str, "%Y-%m-%d")
        studio_date = random_date(wedding_date - timedelta(days=180), wedding_date - timedelta(days=90))
        dress_date = random_date(studio_date - timedelta(days=30), studio_date - timedelta(days=10))
        makeup_date = studio_date

        data = {
            "wedding-hall": {
                "mainItem": {
                    "img": get_img_by_idx(int(recommendation['wedding'].iloc[0]['prod_idx']), 'wedding'),  # idx를 int로 변환
                    "name": recommendation['wedding'].iloc[0]['prod_name'],
                    "sit": int(recommendation['wedding'].iloc[0]['guest_count']),
                    "price": convert_to_serializable(recommendation['wedding'].iloc[0]['price']),
                    "date": wedding_date.strftime("%Y-%m-%d")
                },
            },
            "studio": {
                "mainItem": {
                    "img": get_img_by_idx(int(recommendation['studio'].iloc[0]['prod_idx']), 'studio'),  # idx를 int로 변환
                    "name": recommendation['studio'].iloc[0]['prod_name'],
                    "price": convert_to_serializable(recommendation['studio'].iloc[0]['price']),
                    "date": studio_date.strftime("%Y-%m-%d")
                },
            },
            "dress": {
                "mainItem": {
                    "img": get_img_by_idx(int(recommendation['dress'].iloc[0]['prod_idx']), 'dress'),  # idx를 int로 변환
                    "name": recommendation['dress'].iloc[0]['prod_name'],
                    "price": convert_to_serializable(recommendation['dress'].iloc[0]['price']),
                    "date": dress_date.strftime("%Y-%m-%d")
                },
            },
            "makeup": {
                "mainItem": {
                    "img": get_img_by_idx(int(recommendation['makeup'].iloc[0]['prod_idx']), 'makeup'),  # idx를 int로 변환
                    "name": recommendation['makeup'].iloc[0]['prod_name'],
                    "price": convert_to_serializable(recommendation['makeup'].iloc[0]['price']),
                    "date": makeup_date.strftime("%Y-%m-%d")
                },
            }
        }

    return JSONResponse(content=data)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8500)