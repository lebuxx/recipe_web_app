const API_BASE_URL = 'http://localhost:81'; 

export const fetchNewRecipe = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate_recipe`);
    if (!response.ok) {
      throw new Error('Failed to fetch recipe');
    }
    const data = await response.json();
    return data.parsed || data;
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