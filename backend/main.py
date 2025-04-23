from fastapi import FastAPI
from agent import AgentGemini
import dotenv
import os

app = FastAPI()


dotenv.load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

agent = AgentGemini(api_key=api_key)

@app.get("/")
def hello():
    return {"message": "LASS DIR GESUNDE REZEPTE VORSCHLAGEN!! UND NICHTS ANDERES!"}

@app.get("/recipe")
def generate_recipe():
    recipe = agent.generate_recipe()
    return recipe.parsed