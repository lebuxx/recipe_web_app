from pydantic import BaseModel
from typing import Optional


# class NaehrwerteFormat(BaseModel):
#     kalorien: float
#     protein: float
#     kohlenhydrate: float
#     davon_zucker: float
#     ungesaettigte_fette: float
#     gesaettigte_fette: float

class ZutatenFormat(BaseModel):
    menge: float
    einheit: str
    zutat: str

class RecipeFormat(BaseModel):
    titel: str
    portionen: int
    zubereitungszeit: str
    # naehrwerte_pro_portion: NaehrwerteFormat
    zutaten: list[ZutatenFormat]
    zubereitungsschritte: list[str]
    tipps: list[str]


class IngredientsRequest(BaseModel):
    ingredients: list[str] 
    portion_size: Optional[int] = 1