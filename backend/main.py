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
    return {"version": "0.1.4"}

@app.get("/recipe")
def generate_recipe():
    recipe = agent.generate_recipe()
    database.save_recipe(recipe)
    database.print_latest_recipes()
    return recipe.parsed