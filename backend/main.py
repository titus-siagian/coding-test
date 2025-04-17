from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import json
from pathlib import Path

app = FastAPI()

# CORS supaya bisa diakses dari frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ganti sesuai asal frontend kamu nanti
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/sales-reps")
def get_sales_reps():
    data_path = Path(__file__).parent / "dummyData.json"
    with open(data_path, "r") as f:
        data = json.load(f)
    return data

# Bonus: AI endpoint mock
@app.post("/api/ai")
async def ai_answer(request: Request):
    body = await request.json()
    question = body.get("question", "").lower()

    if "top sales rep" in question:
        return {"answer": "The top sales rep is Alice Johnson with $80,000 in deals."}
    return {"answer": "Sorry, I don't have an answer for that yet."}
