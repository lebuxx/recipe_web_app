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

# Generates a recipe and stores its title for the prompt variation. A failing
# Gemini call (e.g. invalid API key or unreachable API) must not crash with a
# bare 500 
def _generate_recipe(ingredients=None):
    try:
        recipe = get_agent().generate_recipe(ingredients=ingredients)
    except HTTPException:
        raise
    except Exception:
        logger.exception("Fehler bei der Rezeptgenerierung über die Gemini API")
        raise HTTPException(
            status_code=502,
            detail="Das Rezept konnte nicht generiert werden. Möglicherweise ist der "
                   "GEMINI_API_KEY ungültig oder die Gemini API ist gerade nicht "
                   "erreichbar. Bitte den API-Key prüfen und es erneut versuchen.",
        )
    database.save_recipes_temp(recipe)
    return recipe

# Endpoint to generate a recipe without ingredients
@app.get("/generate_recipe")
def generate_recipe(data = None):
    return _generate_recipe()

# Endpoint to generate a recipe with ingredients
@app.post("/generate_recipe_with_ingredients")
def ingredients_at_home(data: IngredientsRequest):
    return _generate_recipe(ingredients=data.ingredients)

# Endpoint to get all saved recipes
@app.get("/get_saved_recipes")
def get_saved_recipes():
    all_recipes = database.get_all_recipes()
    return {"recipes": all_recipes}

# Endpoint to save a recipe
@app.post("/save_recipe")
def save_recipe(recipe: Dict[str, Any] = Body(...)):
    try:
        database.save_recipe(recipe)
        return {"message": "Recipe saved successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Endpoint to delete a recipe
@app.post("/delete_recipe")
def delete_recipe(recipe_title: str = Body(...)):
    try:
        database.delete_recipe(recipe_title)
        return {"message": "Recipe deleted successfully"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))