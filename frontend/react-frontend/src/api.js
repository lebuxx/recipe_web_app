const API_BASE_URL = 'http://localhost:81'; 

export const fetchNewRecipe = async (ingredients = [], portion_size = 1) => {
  try {

     // Mit Zutaten --> Post-Request mit beiden Parametern
    if (ingredients && ingredients.length > 0) {
      console.log("Sende Rezeptanfrage mit Zutaten:", ingredients, "und Portionsgröße:", portion_size);
      const response = await fetch(`${API_BASE_URL}/ingredients_at_home`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          ingredients: ingredients,
          portion_size: portion_size 
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch recipe');
      }
      
      const data = await response.json();
      return data.parsed || data;
    } else {
      // Ohne Zutaten --> ursprünglichen GET-Request
      // console.log("Sende Rezeptanfrage ohne Zutaten");
      // const response = await fetch(`${API_BASE_URL}/generate_recipe`);

 // Ohne Zutaten aber mit Portionsgröße --> post-Request
      console.log("Sende Rezeptanfrage ohne Zutaten, aber mit Portionsgröße:", portion_size);
      const response = await fetch(`${API_BASE_URL}/portion_size`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ portion_size: portion_size }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recipe');
      }
      const data = await response.json();
      return data.parsed || data;
    }
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error;
  }
};

export const saveRecipe = async (recipe) => {
  console.log('recipe:', recipe); // Debugging line
  try {
    const response = await fetch(`${API_BASE_URL}/save_recipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    });
    if (!response.ok) {
      throw new Error('Failed to save recipe');
    }
    return await response.json();
  } catch (error) {
    console.error('Error saving recipe:', error);
    throw error;
  }
};

export const fetchSavedRecipes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/get_saved_recipes`);
    if (!response.ok) {
      throw new Error('Failed to fetch saved recipes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching saved recipes:', error);
    throw error;
  }
};

export const deleteRecipe = async (recipeTitle) => {
  try {
    console.log('Deleting recipe with title:', recipeTitle);
    
    // Send just the string as the body, not wrapped in JSON
    const response = await fetch(`${API_BASE_URL}/delete_recipe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',  // Important: set content type to text/plain
      },
      body: recipeTitle, // Send just the string, not JSON
    });
    
    console.log('Delete response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Server error response:', errorData);
      throw new Error('Failed to delete recipe: ' + errorData);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw error;
  }
};