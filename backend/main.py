from fastapi import FastAPI
from agent import AgentGemini
from db import Database
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
    return {"version": "0.3.6"}

@app.get("/recipe")
def generate_recipe():
    recipe = agent.generate_recipe()
    return recipe

@app.post("/save_recipe")
def save_recipe(recipe: dict):
    try:
        database.save_recipe(recipe)
        return {"message": "Recipe saved successfully"}
    except Exception as e:
        return {"error": str(e)}


@app.get("/get_saved_recipes")
def get_saved_recipes():
    all_recipes = database.get_all_recipes()
    return {"recipes": all_recipes}