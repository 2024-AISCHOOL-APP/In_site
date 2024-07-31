from fastapi import FastAPI, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import logging
from wedding_model import load_tokenized_data, load_model_and_data, recommend_services_within_budget
from fastapi.responses import JSONResponse
import numpy as np
import pandas as pd
import mysql.connector

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
        host="project-db-stu3.smhrd.com",
        user="Insa5_App_hacksim_3",
        password="aischool3",
        database="Insa5_App_hacksim_3",
        port=3307
    )
    return connection

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
    global recommendation_result

    logging.info("Form Data Received:")
    logging.info(f"lref: {lref}")
    logging.info(f"sref: {sref}")
    logging.info(f"dates: {dates}")
    logging.info(f"times: {times}")
    logging.info(f"moneys: {moneys}")
    logging.info(f"persons: {persons}")
    logging.info(f"pluspersons: {pluspersons}")

    try:
        budget = parse_budget(moneys)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    user_latitude, user_longitude = map(float, sref.split(", "))

    # 모델 및 데이터 로드
    regressors, vectorizers = load_model_and_data('model_and_data.pkl')
    dress_data, makeup_data, studio_data, wedding_data = load_tokenized_data()

    # 추천 결과 생성
    recommendation = recommend_services_within_budget(dress_data, makeup_data, studio_data, wedding_data, regressors, vectorizers, budget, user_latitude, user_longitude)

    if recommendation:
        recommendation_result = recommendation
        return {"message": "Recommendation generated successfully"}
    else:
        raise HTTPException(status_code=404, detail="No suitable recommendations found within the budget")

@app.post("/recommend")
def recommend(request: RecommendationRequest):
    global recommendation_result

    regressors, vectorizers = load_model_and_data('model_and_data.pkl')
    dress_data, makeup_data, studio_data, wedding_data = load_tokenized_data()
    recommendation = recommend_services_within_budget(dress_data, makeup_data, studio_data, wedding_data, regressors, vectorizers, request.budget, request.user_latitude, request.user_longitude)
    
    if recommendation:
        recommendation_result = recommendation
        return recommendation
    else:
        raise HTTPException(status_code=404, detail="No suitable recommendations found within the budget")

@app.get("/data")
async def get_data():
    global recommendation_result

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
            cursor.execute("SELECT * FROM tbl_product")
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
        data = {
            "wedding-hall": {
                "mainItem": {
                    "img": '/img/dmer.jpg',
                    "name": recommendation['wedding'].iloc[0]['prod_name'],
                    "sit": '200~300',
                    "price": convert_to_serializable(recommendation['wedding'].iloc[0]['price']),
                    "date": '2024.07.19'
                },
            },
            "studio": {
                "mainItem": {
                    "img": '/img/studio.jpg',
                    "name": recommendation['studio'].iloc[0]['prod_name'],
                    "price": convert_to_serializable(recommendation['studio'].iloc[0]['price']),
                    "date": '2024.08.01'
                },
            },
            "dress": {
                "mainItem": {
                    "img": '/img/dress.jpg',
                    "name": recommendation['dress'].iloc[0]['prod_name'],
                    "price": convert_to_serializable(recommendation['dress'].iloc[0]['price']),
                    "date": '2024.08.15'
                },
            },
            "makeup": {
                "mainItem": {
                    "img": '/img/makeup.jpg',
                    "name": recommendation['makeup'].iloc[0]['prod_name'],
                    "price": convert_to_serializable(recommendation['makeup'].iloc[0]['price']),
                    "date": '2024.08.20'
                },
            }
        }

    return JSONResponse(content=data)

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8500)
