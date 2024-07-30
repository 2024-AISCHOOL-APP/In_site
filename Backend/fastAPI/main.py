from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import logging
import uvicorn
# from datetime import datetime
# import uuid
# import shutil

app = FastAPI()

# CORS 설정 추가
origins = [
    "http://localhost:3000",
    # 필요에 따라 다른 출처들을 추가하세요
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', '../uploads/Aichoice')
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# 로그 설정
logging.basicConfig(level=logging.INFO)

# def generate_unique_filename(original_filename: str) -> str:
#     """
#     Generate a unique filename by adding a timestamp and a UUID.
#     """
#     extension = os.path.splitext(original_filename)[1]  # Extract file extension
#     unique_id = uuid.uuid4().hex  # Generate a unique ID
#     timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')  # Current timestamp
#     return f"{timestamp}_{unique_id}{extension}"

# class UploadResponse(BaseModel):
#     groomImagePath: str
#     brideImagePath: str

# @app.post("/upload", response_model=UploadResponse)
@app.post("/upload")
async def upload_images(
    # groomImage: UploadFile = File(...),
    # brideImage: UploadFile = File(...),
    lref: str = Form(...),
    sref: str = Form(...),
    dates: str = Form(...),
    times: str = Form(...),
    moneys: str = Form(...),
    persons: str = Form(...),
    pluspersons: str = Form(...)
):
    # groom_image_url = ''
    # bride_image_url = ''

    # if groomImage:
    #     unique_groom_filename = generate_unique_filename(groomImage.filename)
    #     groom_path = os.path.join(UPLOAD_FOLDER, unique_groom_filename)
    #     with open(groom_path, "wb") as buffer:
    #         shutil.copyfileobj(groomImage.file, buffer)
    #     logging.info(f"Groom image uploaded to: {groom_path}")
    #     groom_image_url = f"/files/{unique_groom_filename}"

    # if brideImage:
    #     unique_bride_filename = generate_unique_filename(brideImage.filename)
    #     bride_path = os.path.join(UPLOAD_FOLDER, unique_bride_filename)
    #     with open(bride_path, "wb") as buffer:
    #         shutil.copyfileobj(brideImage.file, buffer)
    #     logging.info(f"Bride image uploaded to: {bride_path}")
    #     bride_image_url = f"/files/{unique_bride_filename}"

    # Log additional form data
    logging.info("Form Data Received:")
    logging.info(f"lref: {lref}")
    logging.info(f"sref: {sref}")
    logging.info(f"dates: {dates}")
    logging.info(f"times: {times}")
    logging.info(f"moneys: {moneys}")
    logging.info(f"persons: {persons}")
    logging.info(f"pluspersons: {pluspersons}")

    # return {"groomImagePath": groom_image_url, "brideImagePath": bride_image_url}

# @app.get("/files/{filename}")
# async def get_file(filename: str):
#     """
#     Serve files from the UPLOAD_FOLDER directory.
#     """
#     file_path = os.path.join(UPLOAD_FOLDER, filename)
#     if os.path.exists(file_path):
#         return FileResponse(file_path)
#     else:
#         return JSONResponse({"error": "File not found"}, status_code=404)

@app.get("/data")
async def get_data():
    data = {
        "wedding-hall": {
            "mainItem": {
                "img": '/img/dmer.jpg',
                "name": '드메르호텔 호텔 홀',
                "sit": '200~300',
                "price": '4,000,000',
                "date": '2024.07.19'
            },
           
        },
        "studio": {
            "mainItem": {
                "img": '/img/studio.jpg',
                "name": '스타디오 사진관',
                "price": '1,500,000',
                "date": ' 2024.08.01'
            },
          
        },
        "dress": {
            "mainItem": {
                "img": '/img/dress.jpg',
                "name": '드레스 샵',
                "price": '2,000,000',
                "date": ' 2024.08.15'
            },

        },
        "makeup": {
            "mainItem": {
                "img": '/img/makeup.jpg',
                "name": '메이크업 전문',
                "price": '350,000',
                "date": '2024.08.20'
            },
          
        }
    }
    
    return JSONResponse(content=data)

if __name__ == '__main__':
    uvicorn.run(app, host='127.0.0.1', port=8500)
