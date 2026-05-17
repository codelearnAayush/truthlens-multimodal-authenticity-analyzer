import whisper
import shutil
from fastapi import UploadFile, File
from PIL import Image
import easyocr
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from transformers import pipeline
import random

app = FastAPI()
reader = easyocr.Reader(['en'])

# Allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# AI model
classifier = pipeline("sentiment-analysis")
whisper_model = whisper.load_model("base")

class TextRequest(BaseModel):
    text: str

@app.get("/")
def home():
    return {"message": "TruthLens Backend Running"}

@app.post("/analyze-text")
def analyze_text(data: TextRequest):

    text = data.text

    sentiment = classifier(text)

    return {
        "text": text,
        "sentiment": sentiment,
        "humanity_score": random.randint(50, 95),
        "ai_probability": random.randint(10, 85),
        "manipulation_score": random.randint(20, 90),
        "explanation": "Content contains emotionally optimized and engagement-focused language patterns."
    }
    
@app.post("/analyze-image")
def analyze_image(file: UploadFile = File(...)):

       image = Image.open(file.file)

       results = reader.readtext(image)

       extracted_text = " ".join([res[1] for res in results])

       sentiment = classifier(extracted_text)

       return {
        "extracted_text": extracted_text,
        "sentiment": sentiment,
        "humanity_score": random.randint(50, 95),
        "ai_probability": random.randint(10, 85),
        "manipulation_score": random.randint(20, 90),
        "explanation": "Image text contains emotionally amplified language patterns."
    }
       
@app.post("/analyze-video")
def analyze_video(file: UploadFile = File(...)):

    temp_file = "temp_video.mp4"

    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    transcription = whisper_model.transcribe(temp_file)

    extracted_text = transcription["text"]

    sentiment = classifier(extracted_text)

    return {
        "transcription": extracted_text,
        "sentiment": sentiment,
        "humanity_score": random.randint(50, 95),
        "ai_probability": random.randint(10, 85),
        "manipulation_score": random.randint(20, 90),
        "explanation": "Speech contains persuasive and emotionally amplified communication patterns."
    }
    
