from fastapi import FastAPI, Body
from agent import AgentGemini
from db import Database
from typing import Dict, Any
from prompts import Prompts
from schemas import IngredientsRequest

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
    return {"version": "0.5.0"}

@app.get("/generate_recipe")
def generate_recipe(data = None):
    recipe = agent.generate_recipe(data)
    database.save_recipes_temp(recipe)
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
def ingredients_at_home(data: IngredientsRequest):
    ingredients = data.ingredients
    # portion_size = data.portion_size if data.portion_size else 1
    
    print(f"Received ingredients: {ingredients}")  # Debug
    
    recipe = agent.generate_recipe(ingredients=ingredients)
    database.save_recipes_temp(recipe)
    return recipe

# @app.post("/portion_size")
# def get_portion_size(data: PortionRequest):
#     portion_size = data.portion_size
#     print(f"Received portion_size: {portion_size}")  # Debug
    
#     recipe = agent.generate_recipe(portion_size=portion_size)
#     database.save_recipes_temp(recipe)
#     return recipe

@app.post("/delete_recipe")
def delete_recipe(recipe_title: str = Body(...)):
    try:
        print(f"Received delete request for recipe: {recipe_title}")
        database.delete_recipe(recipe_title)
        return {"message": "Recipe deleted successfully"}
    except Exception as e:
        return {"error": str(e)}