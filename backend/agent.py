
from google import genai
from prompts import Prompts
from schemas import RecipeFormat


class AgentGemini:
    def __init__(self, api_key: str):
        self.client = genai.Client(api_key=api_key)

    def generate_recipe(self):
        completion = self.client.models.generate_content(
            model="gemini-2.5-pro-preview-03-25",
            contents=Prompts.prompt_generating_recipe,
            config={
                'response_mime_type': 'application/json',
                'response_schema': RecipeFormat,
            },
        )

        return completion 
    