import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchSavedRecipes, deleteRecipe } from '../api';

const SavedRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const backgroundRef = useRef(null);

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
  
  // Effekt für das SVG-Hintergrundmuster
  useEffect(() => {
    // SVG-Höhe
    const SVG_HEIGHT = 911; // Höhe des SVGs in Pixeln
    
    const updateSvgBackground = () => {
      if (!containerRef.current || !backgroundRef.current) return;
      
      // Höhe des Containers ermitteln
      const containerHeight = Math.max(
        document.documentElement.scrollHeight, 
        document.body.scrollHeight
      );
      
      // Bestehende SVG-Elemente entfernen
      while (backgroundRef.current.firstChild) {
        backgroundRef.current.removeChild(backgroundRef.current.firstChild);
      }
      
      // Anzahl der benötigten SVGs berechnen
      const svgCount = Math.ceil(containerHeight / SVG_HEIGHT) ; // +1 für Überlappung
      
      // SVG-Elemente erzeugen und einfügen
      for (let i = 0; i < svgCount; i++) {
        const svgPattern = document.createElement('div');
        svgPattern.className = 'saved-recipe-green-pattern';
        svgPattern.style.top = `${(i * SVG_HEIGHT) - (i > 0 ? 1 : 0)}px`;
        
        // Sicherstellen, dass das SVG absolut am rechten Rand ist
        svgPattern.style.right = '0';
        svgPattern.style.left = 'auto';
        
        backgroundRef.current.appendChild(svgPattern);
      }
    };
    
    // Initial ausführen
    updateSvgBackground();
    
    // Bei Fenstergrößenänderung neu berechnen
    window.addEventListener('resize', updateSvgBackground);
    
    // Nach kurzer Verzögerung erneut ausführen, falls Content Loading die Größe verändert
    const timeoutId = setTimeout(updateSvgBackground, 500);
    
    return () => {
      window.removeEventListener('resize', updateSvgBackground);
      clearTimeout(timeoutId);
    };
  }, [recipes, loading]); // Abhängigkeit von recipes und loading

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
     <>
      <div className='saved-recipe-green-background js-enabled' ref={backgroundRef} style={{right: 0, left: 'auto'}}></div>
      <div className="background-texture"></div>
      <div className="recipe-container" ref={containerRef}>
        <Link to="/" className="home-icon">🏠</Link>
        <h1 className="saved-recipe-title">
          <span>Deine</span> 
          <span>kulinarische</span> 
          <span>Schatztruhe</span>
        </h1>

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
    </>
  );
};

export default SavedRecipesPage;