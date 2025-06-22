# Recipe Web App

## Project Architecture

The application follows a typical client-server architecture with:

1. *Frontend*: React-based web application
2. *Backend*: FastAPI Python server
3. *Database*: SQLite database (saved_recipes.db)

## Backend Structure

Located in the /backend directory:

- main.py: Entry point for the FastAPI application with API endpoints:
  - /generate_recipe: Generates a recipe
  - /save_recipe: Saves a recipe to the database
  - /get_saved_recipes: Retrieves all saved recipes
  - /ingredients_at_home: Generates a recipe based on available ingredients
  - /delete_recipe: Deletes a recipe from the database

- db.py: Database interaction layer with SQLite:
  - Manages recipe storage and retrieval
  - Handles temporary and permanent recipe storage
  - Database schema includes tables for recipes and temporary recipes

- agent.py: Contains the AgentGemini class that generates recipes using Gemini API
- prompts.py: Contains prompt templates for AI recipe generation
- schemas.py: Defines data models/schemas for API requests/responses

## Frontend Structure

Located in the /frontend/react-frontend directory:

- Standard React application structure with:
  - src/App.js: Main application component with routing
  - src/pages/: Contains page components:
    - HomePage: Landing page
    - NewRecipePage: Page for generating new recipes
    - SavedRecipesPage: Page showing saved recipes
    - SavedRecipeDetailPage: Detailed view of a saved recipe
  - src/api.js: API client for communicating with the backend

## Deployment

The project includes:
- deploy.ps1: PowerShell deployment script
- deploy.yml: Deployment configuration
- Dockerfiles in both frontend and backend directories for containerization

## Data Flow

1. User interacts with the React frontend
2. Frontend makes API calls to the backend
3. Backend processes requests, interacts with the Gemini AI agent for recipe generation
4. Recipes are stored in and retrieved from the SQLite database
5. Results are returned to the frontend for display