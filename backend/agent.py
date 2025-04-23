
from google import genai
from prompts import Prompts
from schemas import RecipeFormat
import sqlite3


class AgentGemini:
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)

    def generate_recipe(self):
        completion = self.client.models.generate_content(
            model="gemini-2.0-flash",
            contents=Prompts.prompt_generating_recipe + Prompts.prompt_extension_previous_recipes(),
            config={
                'response_mime_type': 'application/json',
                'response_schema': RecipeFormat,
            },
        )
        return completion 
    