import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchSavedRecipes, deleteRecipe } from '../api';

const SavedRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const navigate = useNavigate();

  const loadSavedRecipes = async () => {
    setLoading(true);
    try {
      const data = await fetchSavedRecipes();
      const reversedRecipes = [...(data.recipes || [])].reverse();
      setRecipes(reversedRecipes);
      setError(null);
    } catch (err) {
      setError('Fehler beim Laden der gespeicherten Rezepte. Bitte versuchen Sie es später erneut.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedRecipes();
  }, []);

  const handleRecipeClick = (recipe, index) => {
    navigate(`/saved-recipe/${index}`, { state: { recipe } });
  };

  const handleDeleteClick = (e, recipe) => {
    e.stopPropagation();
    setRecipeToDelete(recipe);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      console.log('Attempting to delete recipe:', recipeToDelete);
      
      if (!recipeToDelete || !recipeToDelete.titel) {
        throw new Error('Recipe title is missing');
      }
      
      await deleteRecipe(recipeToDelete.titel);
      console.log('Recipe deleted successfully');
      
      // Reload the recipes after deletion
      loadSavedRecipes();
      setError(null); // Clear any previous errors
      
    } catch (err) {
      console.error('Error in handleConfirmDelete:', err);
      setError(`Fehler beim Löschen des Rezepts: ${err.message}`);
      
      // Even if there's an error, we should still reload the recipes
      // to make sure our UI is in sync with the backend
      loadSavedRecipes();
    } finally {
      setShowDeleteConfirm(false);
      setRecipeToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setRecipeToDelete(null);
  };

  return (
    <div className="recipe-container">
      <Link to="/" className="home-icon">🏠</Link>
      <h1 className="recipe-title">Deine kulinarische Schatztruhe</h1>

      {loading ? (
        <p>Rezepte werden geladen...</p>
      ) : error ? (
        <p>{error}</p>
      ) : recipes.length > 0 ? (
        <ul className="saved-recipes-list">
          {recipes.map((recipe, index) => (
            <li 
              key={index} 
              className="saved-recipe-item"
              onClick={() => handleRecipeClick(recipe, index)}
            >
              <span className="recipe-title-text">{recipe.titel || 'Unbenanntes Rezept'}</span>
              <span 
                className="delete-recipe-btn"
                onClick={(e) => handleDeleteClick(e, recipe)}
              >
                x
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Keine gespeicherten Rezepte gefunden.</p>
      )}

      {showDeleteConfirm && (
        <div className="delete-confirmation-overlay">
          <div className="delete-confirmation-modal">
            <p>Möchtest du dieses Rezept wirklich löschen?</p>
            <p><strong>{recipeToDelete?.titel}</strong></p>
            <div className="delete-confirmation-buttons">
              <button 
                className="cancel-button"
                onClick={handleCancelDelete}
              >
                Abbruch
              </button>
              <button 
                className="delete-button"
                onClick={handleConfirmDelete}
              >
                Löschen
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SavedRecipesPage;