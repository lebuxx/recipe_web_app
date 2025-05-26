import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { fetchNewRecipe, saveRecipe } from '../api';



const NewRecipePage = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Zutaten aus location state holen, wenn vorhanden
  const ingredients = location.state?.ingredients || [];

  const getRecipe = async () => {
    setLoading(true);
    try {
      // Übergebe ingredients an fetchNewRecipe - auch wenn es ein leeres Array ist
      const data = await fetchNewRecipe(ingredients);
      console.log("Neues Rezept:", data);
      setRecipe(data);
      setError(null);
      setSaved(false); 
    } catch (err) {
      console.error("Fehler beim Laden des Rezepts:", err);
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
    // Original-Verhalten: Neues Rezept auf derselben Seite generieren
    getRecipe();
  };

  if (loading) {
    return (
      <>
          <div className="background-texture"></div>
        <div className="recipe-container">
          <Link to="/" className="home-icon">🏠</Link>
          <div className="recipe-loading">Rezept wird generiert...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
       <>
          <div className="background-texture"></div>
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
        </>
    );
  }

  if (!recipe) {
    return null;
  }

  return (
    <>
      <div className="recipe-green-background">
        <svg xmlns="http://www.w3.org/2000/svg" width="1279" height="403" viewBox="0 0 1279 403" fill="none">
          <path d="M0.499756 172C77.5 223.5 142.778 121.098 232.5 101.236C322.222 81.3749 375.467 128.874 467 120.736C558.533 112.599 611.571 57.4863 710 52.7363C808.428 47.9864 955.63 84.4605 1062.5 154.736C1169.37 225.012 1197.5 427.5 1279 400.5C1279 314 1279 0.236328 1279 0.236328H0.499756C0.499756 0.236328 0.499966 110 0.499756 172Z" fill="#3EA55B"/>
        </svg>
      </div>
      <div className="background-texture"></div>
      <div className="recipe-container">
        <Link to="/" className="home-icon">🏠</Link>
        <h1 className="recipe-title">{recipe.titel}</h1>
        
        {/* Zeige verwendete Zutaten an, wenn vorhanden */}
        {ingredients && ingredients.length > 0 && (
          <div className="ingredients-used">
            <h3>Verwendete Zutaten von zuhause:</h3>
            <div className="ingredients-badges">
              {ingredients.map((ingredient, index) => (
                <span key={index} className="ingredient-badge">{ingredient}</span>
              ))}
            </div>
          </div>
        )}
        
        <div className="recipe-information">
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
    </>
  );
};

export default NewRecipePage;