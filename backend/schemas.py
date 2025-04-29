from pydantic import BaseModel


class NaehrwerteFormat(BaseModel):
    kalorien: float
    protein: float
    kohlenhydrate: float
    davon_zucker: float
    ungesaettigte_fette: float
    gesaettigte_fette: float

class RecipeFormat(BaseModel):
    titel: str
    portionen: int
    zubereitungszeit: str
    naehrwerte_pro_portion: NaehrwerteFormat
    zutaten: list[str]
    zubereitungsschritte: list[str]
    tipps: list[str]