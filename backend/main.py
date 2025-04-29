from fastapi import FastAPI, Body
from agent import AgentGemini
from db import Database
from typing import Dict, Any
from prompts import Prompts

import dotenv
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Oder ["http://localhost"] etwas strenger
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



dotenv.load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

agent = AgentGemini(api_key=api_key)
database = Database()


@app.get("/")
def hello():
    return {"version": "0.3.7"}

@app.get("/generate_recipe")
def generate_recipe(data = None):
    recipe = agent.generate_recipe(data)
    return recipe

@app.post("/save_recipe")
def save_recipe(recipe: Dict[str, Any] = Body(...)):
    print("Received recipe:", recipe)  # Debug-Ausgabe
    try:
        database.save_recipe(recipe)
        return {"message": "Recipe saved successfully"}
    except Exception as e:
        return {"error": str(e)}


@app.get("/get_saved_recipes")
def get_saved_recipes():
    all_recipes = database.get_all_recipes()
    return {"recipes": all_recipes}

@app.post("/ingredients_at_home")
def ingredients_at_home(data: Dict[str, Any] = Body(...)):
    ingredients = data.get("ingredients", [])
    recipe = agent.generate_recipe(ingredients)
    return recipe