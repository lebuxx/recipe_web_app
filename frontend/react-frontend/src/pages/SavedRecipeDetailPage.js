import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SavedRecipeDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipe } = location.state || {};

  if (!recipe) {
    return (
      <div className="recipe-container">
        <Link to="/" className="home-icon">🏠</Link>
        <h1 className="recipe-title">Rezept nicht gefunden</h1>
        <div className="recipe-buttons">
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/saved-recipes')}
          >
            Zurück zu gespeicherten Rezepten
          </button>
        </div>
      </div>
    );
  }

  return (
     <>
      <div className="recipe-green-background">
        <svg xmlns="http://www.w3.org/2000/svg" width="1279" height="403" viewBox="0 0 1279 403" fill="none">
          <path d="M0.499756 172C77.5 223.5 142.778 121.098 232.5 101.236C322.222 81.3749 375.467 128.874 467 120.736C558.533 112.599 611.571 57.4863 710 52.7363C808.428 47.9864 955.63 84.4605 1062.5 154.736C1169.37 225.012 1197.5 427.5 1279 400.5C1279 314 1279 0.236328 1279 0.236328H0.499756C0.499756 0.236328 0.499966 110 0.499756 172Z" fill="#3EA55B"/>
        </svg>
      </div>
      <div className="recipe-container">
      <Link to="/" className="home-icon">🏠</Link>
      <button 
        className="back-button" 
        onClick={() => navigate('/saved-recipes')}
      >
        ← 
      </button>
      
      <h1 className="recipe-title">{recipe.titel}</h1>
      
      <div className="recipe-information">
        <p>Bearbeitungszeit: {recipe.bearbeitungszeit || '30 Minuten'}</p>
        <p>Portionen: {recipe.portionen || '4'}</p>
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
          {/* <h3>Tipps:</h3> */}
          <ul>
            {recipe.tipps.map((tipp, index) => (
              <li key={index}>{tipp}</li>
            ))}
          </ul>        
        </div>
      )}
      </div>
    </>
    
  );
};

export default SavedRecipeDetailPage;