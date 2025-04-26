import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchNewRecipe, saveRecipe } from '../api';



const NewRecipePage = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();

  const getRecipe = async () => {
    setLoading(true);
    try {
      const data = await fetchNewRecipe();
      console.log("Neues Rezept:", data);
      setRecipe(data);
      setError(null);
      setSaved(false); 
    } catch (err) {
      setError('Fehler beim Laden des Rezepts. Bitte versuchen Sie es später erneut.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipe();
  }, []);

  const handleSaveRecipe = async () => {
    try {
      await saveRecipe(recipe);
      setSaved(true);
    } catch (err) {
      setError('Fehler beim Speichern des Rezepts. Bitte versuchen Sie es später erneut.');
    }
  };

  const handleGenerateNewRecipe = () => {
    // Simply call getRecipe() instead of reloading the page
    getRecipe();
  };

  if (loading) {
    return (
      <div className="recipe-container">
        <Link to="/" className="home-icon">🏠</Link>
        <div className="recipe-title">Rezept wird geladen...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recipe-container">
        <Link to="/" className="home-icon">🏠</Link>
        <div className="recipe-title">Fehler</div>
        <p>{error}</p>
        <div className="recipe-buttons">
          <button 
            className="btn btn-primary" 
            onClick={handleGenerateNewRecipe}
          >
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return null;
  }

  return (
    <div className="recipe-container">
      <Link to="/" className="home-icon">🏠</Link>
      <h1 className="recipe-title">{recipe.name}</h1>
      
      <div className="recipe-meta">
        <p>Bearbeitungszeit: {recipe.zubereitungszeit}</p>
        <p>Portionen: {recipe.portionen}</p>
      </div>
      
      <div className="recipe-content">
        <div className="recipe-content-section">
          <h3>Zutaten:</h3>
          <ul className="ingredients-list">
            {recipe.zutaten && recipe.zutaten.map((zutat, index) => (
              <li key={index}>{zutat}</li>
            ))}
          </ul>
        </div>
        
        <div className="recipe-content-section">
          <h3>Zubereitungsschritte:</h3>
          <ol className="steps-list">
            {recipe.zubereitungsschritte && recipe.zubereitungsschritte.map((schritt, index) => (
              <li key={index}>{schritt}</li>
            ))}
          </ol>
        </div>
      </div>
      
      {recipe.tipps && (
        <div className="recipe-tip">
            <ul>
                {recipe.tipps.map((tipp, index) => (
                <li key={index}>{tipp}</li>
                ))}
          </ul>        
        </div>
      )}
      
      {!saved ? (
        <div className="recipe-buttons">
          <button 
            className="btn btn-primary" 
            onClick={handleGenerateNewRecipe}
          >
            Neues Rezept
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={handleSaveRecipe}
          >
            Speichern
          </button>
        </div>
      ) : (
        <div className="recipe-buttons">
          <button 
            className="btn btn-primary" 
            onClick={handleGenerateNewRecipe}
          >
            Neues Rezept
          </button>
          <p>Rezept wurde erfolgreich gespeichert!</p>
        </div>
      )}
    </div>
  );
};

export default NewRecipePage;