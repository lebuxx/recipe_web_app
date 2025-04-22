from fastapi import FastAPI
from backend.routes import recipes

app = FastAPI()

app.include_router(recipes.router)
