import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchSavedRecipes, deleteRecipe } from '../api';
import { Home, Trashcan } from '../icons';

const SavedRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const navigate = useNavigate();

  // Load saved recipes from API
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

  // Load saved recipes 
  useEffect(() => {
    loadSavedRecipes();
  }, []);

  // Add body class for styling the green background SVG
  useEffect(() => {
    document.body.classList.add('saved-recipes-page');
    return () => {
      document.body.classList.remove('saved-recipes-page');
    };
  }, []);

  // Navigate to recipe detail page
  const handleRecipeClick = (recipe, index) => {
    navigate(`/saved-recipe/${index}`, { state: { recipe } });
  };

  // Handle delete button click - show confirmation modal
  const handleDeleteClick = (e, recipe) => {
    e.stopPropagation();
    setRecipeToDelete(recipe);
    setShowDeleteConfirm(true);
  };

  // Confirm and execute recipe deletion
  const handleConfirmDelete = async () => {
    try {
      console.log('Attempting to delete recipe:', recipeToDelete);
      
      if (!recipeToDelete?.titel) {
        throw new Error('Recipe title is missing');
      }
      
      await deleteRecipe(recipeToDelete.titel);
      console.log('Recipe deleted successfully');
      
      loadSavedRecipes();
      setError(null); 
      
    } catch (err) {
      console.error('Error in handleConfirmDelete:', err);
      setError(`Fehler beim Löschen des Rezepts: ${err.message}`);
      loadSavedRecipes();
    } finally {
      setShowDeleteConfirm(false);
      setRecipeToDelete(null);
    }
  };

  // Cancel deletion process
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setRecipeToDelete(null);
  };

  return (
    <>
      {/* Green background styling */}
      <div className='saved-recipe-green-background'></div>
      
      <div className="recipe-container">
        {/* Home navigation link */}
        <Link to="/" className="home-icon">
          <Home />
        </Link>
        
        {/* Page title */}
        <h1 className="saved-recipe-title">
          <span>Deine</span> 
          <span>kulinarische</span> 
          <span>Schatztruhe</span>
        </h1>

        {/* Content based on loading/error/data state */}
        {loading ? (
          <p>Rezepte werden geladen...</p>
        ) : error ? (
          <p>{error}</p>
        ) : recipes.length > 0 ? (
          // Recipe list display
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
                  <Trashcan className="trashcan-icon" />
                </span>
              </li>
            ))}
          </ul>
        ) : (
          // Empty state message
          <>
            <p>Du hast noch keine Rezepte gespeichert.</p>
            <p>Probiere es aus!</p>
            <p>Generiere ein neues Rezept und klicke auf speichern.</p>
            <p>Deine gespeicherten Rezepte werden hier angezeigt.</p>
          </>
        )}

        {/* Delete confirmation modal */}
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
    </>
  );
};

export default SavedRecipesPage;