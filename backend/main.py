from fastapi import FastAPI, Body, HTTPException
from agent import AgentGemini
from db import Database
from typing import Dict, Any
from prompts import Prompts
from schemas import IngredientsRequest

import dotenv
import logging
import os
from fastapi.middleware.cors import CORSMiddleware

logger = logging.getLogger("uvicorn.error")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# load API key from .env file
dotenv.load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

# Initialize the agent and database. A missing GEMINI_API_KEY must not crash
# the whole app - instead we keep the API up and fail only the endpoints
# that actually need Gemini, with a clear message.
if not api_key:
    logger.error(
        "GEMINI_API_KEY ist nicht gesetzt! Bitte die Umgebungsvariable "
        "GEMINI_API_KEY (z.B. in der .env Datei oder in deploy.yml) setzen. "
        "Endpunkte zur Rezeptgenerierung sind bis dahin deaktiviert."
    )
    agent = None
else:
    agent = AgentGemini(api_key=api_key)

database = Database()


def get_agent() -> AgentGemini:
    if agent is None:
        raise HTTPException(
            status_code=503,
            detail="GEMINI_API_KEY ist nicht gesetzt. Bitte die Umgebungsvariable "
                   "konfigurieren und den Backend-Container neu starten.",
        )
    return agent


@app.get("/")
def hello():
    return {"version": "0.5.0"}

# Endpoint to generate a recipe without ingredients
@app.get("/generate_recipe")
def generate_recipe(data = None):
    recipe = get_agent().generate_recipe(data)
    database.save_recipes_temp(recipe)
    return recipe

# Endpoint to generate a recipe with ingredients
@app.post("/generate_recipe_with_ingredients")
def ingredients_at_home(data: IngredientsRequest):
    ingredients = data.ingredients    
    print(f"Received ingredients: {ingredients}")  # Debugging
    
    recipe = get_agent().generate_recipe(ingredients=ingredients)
    database.save_recipes_temp(recipe)
    return recipe

# Endpoint to get all saved recipes
@app.get("/get_saved_recipes")
def get_saved_recipes():
    all_recipes = database.get_all_recipes()
    return {"recipes": all_recipes}

# Endpoint to save a recipe
@app.post("/save_recipe")
def save_recipe(recipe: Dict[str, Any] = Body(...)):
    print("Received recipe:", recipe)  # Debugging
    try:
        database.save_recipe(recipe)
        return {"message": "Recipe saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint to delete a recipe
@app.post("/delete_recipe")
def delete_recipe(recipe_title: str = Body(...)):
    try:
        print(f"Received delete request for recipe: {recipe_title}")
        database.delete_recipe(recipe_title)
        return {"message": "Recipe deleted successfully"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))