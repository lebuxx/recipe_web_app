const API_BASE_URL = `http://${window.location.hostname}:81`;

// Reads the FastAPI "detail" field from an error response, if present
const readErrorDetail = async (response, fallbackMessage) => {
  try {
    const data = await response.json();
    return data.detail || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
};

// Fetches a new recipe from the backend
export const fetchNewRecipe = async (ingredients = []) => {
  try {
    // Recipe request with ingredients
    if (ingredients && ingredients.length > 0) {
      console.log("Sende Rezeptanfrage mit Zutaten:", ingredients);
      const response = await fetch(
        `${API_BASE_URL}/generate_recipe_with_ingredients`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ingredients: ingredients,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(await readErrorDetail(response, "Failed to fetch recipe"));
      }

      const data = await response.json();
      return data.parsed || data;
    } else {
      // Recipe request without ingredients
      console.log("Sende Rezeptanfrage ohne Zutaten");
      const response = await fetch(`${API_BASE_URL}/generate_recipe`);

      if (!response.ok) {
        throw new Error(await readErrorDetail(response, "Failed to fetch recipe"));
      }
      const data = await response.json();
      return data.parsed || data;
    }
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error;
  }
};

// Saves a recipe to the backend
export const saveRecipe = async (recipe) => {
  console.log("recipe:", recipe); // Debugging
  try {
    const response = await fetch(`${API_BASE_URL}/save_recipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    });
    if (!response.ok) {
      throw new Error("Failed to save recipe");
    }
    return await response.json();
  } catch (error) {
    console.error("Error saving recipe:", error);
    throw error;
  }
};

// Fetches all saved recipes from the backend
export const fetchSavedRecipes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/get_saved_recipes`);
    if (!response.ok) {
      throw new Error("Failed to fetch saved recipes");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching saved recipes:", error);
    throw error;
  }
};

//Deletes a recipe from the backend
export const deleteRecipe = async (recipeTitle) => {
  try {
    console.log("Deleting recipe with title:", recipeTitle);

    const response = await fetch(`${API_BASE_URL}/delete_recipe`, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: recipeTitle,
    });
    console.log("Delete response status:", response.status);
    if (!response.ok) {
      const errorData = await response.text();
      console.error("Server error response:", errorData);
      throw new Error("Failed to delete recipe: " + errorData);
    }
    return await response.json();
  } catch (error) {
    console.error("Error deleting recipe:", error);
    throw error;
  }
};
