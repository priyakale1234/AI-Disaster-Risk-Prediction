from fastapi import FastAPI
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

from schemas import (
    FloodInput,
    DisasterInput,
    LanguageInput
)

from model_loader import model
from sqlalchemy import text
from database import engine
from schemas import CityInput
from weather_service import get_weather

from groq_service import (
    generate_disaster_advice,
    generate_emergency_kit,
    translate_text
)


app = FastAPI(
    title="AI Disaster Risk Prediction & Awareness Assistant"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===================================================
# HOME API
# ===================================================

@app.get("/")
def home():
    return {
        "message": "AI Disaster Risk Prediction API Running"
    }


# ===================================================
# PREDICT API
# ===================================================

@app.post("/predict")
def predict(data: FloodInput):

    df = pd.DataFrame([data.model_dump()])

    probability = float(
        model.predict(df)[0]
    )

    if probability < 0.33:
        risk = "Low"

    elif probability < 0.66:
        risk = "Medium"

    else:
        risk = "High"

    advice = generate_disaster_advice(risk)

    # Save Prediction in MySQL
    with engine.connect() as conn:

        conn.execute(
            text("""
                INSERT INTO predictions
                (flood_probability, risk_level)
                VALUES
                (:probability, :risk)
            """),
            {
                "probability": probability,
                "risk": risk
            }
        )

        conn.commit()

    return {
        "flood_probability": round(probability, 4),
        "risk_level": risk,
        "advice": advice
    }


# ===================================================
# HISTORY API
# ===================================================

@app.get("/history")
def history():

    with engine.connect() as conn:

        result = conn.execute(
            text("""
                SELECT *
                FROM predictions
                ORDER BY id DESC
            """)
        )

        rows = result.fetchall()

        data = []

        for row in rows:

            data.append({
                "id": row.id,
                "flood_probability": row.flood_probability,
                "risk_level": row.risk_level,
                "created_at": str(row.created_at)
            })

        return data


# ===================================================
# EMERGENCY KIT API
# ===================================================

@app.post("/emergency-kit")
def emergency_kit(data: DisasterInput):

    kit = generate_emergency_kit(
        data.disaster
    )

    return {
        "disaster": data.disaster,
        "emergency_kit": kit
    }


# ===================================================
# TRANSLATION API
# ===================================================

@app.post("/translate")
def translate(data: LanguageInput):

    translated_text = translate_text(
        data.text,
        data.language
    )

    return {
        "language": data.language,
        "translated_text": translated_text
    }
@app.post("/weather")
def weather(data: CityInput):

    weather_data = get_weather(
        data.city
    )

    return weather_data