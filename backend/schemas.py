from pydantic import BaseModel

# Schemas for the model responses
class IngredientsFormat(BaseModel):
    menge: float
    einheit: str
    zutat: str

class RecipeFormat(BaseModel):
    titel: str
    portionen: int
    zubereitungszeit: str
    zutaten: list[IngredientsFormat]
    zubereitungsschritte: list[str]
    tipps: list[str]

class IngredientsRequest(BaseModel):
    ingredients: list[str] 
