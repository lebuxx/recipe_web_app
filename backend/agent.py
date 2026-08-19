
from google import genai
from prompts import Prompts
from schemas import RecipeFormat
import sqlite3

# Class for interacting with the Gemini API to generate recipes
class AgentGemini:
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)

    def generate_recipe(self, ingredients: list = None, ) -> RecipeFormat:
        completion = self.client.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=Prompts.generating_prompt(ingredients),
            config={
                'response_mime_type': 'application/json',
                'response_schema': RecipeFormat,
            },
        )
        return completion 
    