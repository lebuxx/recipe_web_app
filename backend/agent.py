
from google import genai
from prompts import Prompts
from schemas import RecipeFormat
import sqlite3


class AgentGemini:
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)

    def generate_recipe(self, portion_size: int = None, ingredients: list = None, ) -> RecipeFormat:
        if portion_size is None:
            portion_size = 1
            
        print(f"Agent generiert Rezept - Portionen: {portion_size}, Zutaten: {ingredients}")  # Debugging
        
        completion = self.client.models.generate_content(
            model="gemini-2.0-flash",
            contents=Prompts.generating_prompt(ingredients, portion_size),
            config={
                'response_mime_type': 'application/json',
                'response_schema': RecipeFormat,
            },
        )
        return completion 
    