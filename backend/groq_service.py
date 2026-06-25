import os
from groq import Groq
from dotenv import load_dotenv

# Load Environment Variables
load_dotenv()

# Create Groq Client
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# ===================================================
# MODULE 2
# DISASTER ADVISOR
# ===================================================

def generate_disaster_advice(risk_level):

    prompt = f"""
You are a disaster management expert.

Flood Risk Level: {risk_level}

Generate:

Safety Precautions:
- point 1
- point 2

Emergency Preparation:
- point 1
- point 2

Important Warnings:
- point 1
- point 2

Rules:
- Plain text only
- No markdown symbols
- Maximum 100 words
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.4
    )

    return response.choices[0].message.content


# ===================================================
# MODULE 3
# EMERGENCY KIT GENERATOR
# ===================================================

def generate_emergency_kit(disaster):

    prompt = f"""
Generate an emergency preparedness kit for {disaster}.

Return exactly 8 important items.

Requirements:
- One item per line
- No numbering
- No explanation
- Plain text only
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )

    return response.choices[0].message.content


# ===================================================
# MODULE 4
# TRANSLATION
# ===================================================

def translate_text(text, language):

    prompt = f"""
Translate the following text into {language}.

Text:
{text}

Rules:
- Keep meaning exactly same
- Return only translated text
- No explanation
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )

    return response.choices[0].message.content