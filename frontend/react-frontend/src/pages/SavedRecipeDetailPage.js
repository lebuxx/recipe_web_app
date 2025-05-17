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
    <body className="background-texture">
      <div className="recipe-container">
      <Link to="/" className="home-icon">🏠</Link>
      <button 
        className="back-button" 
        onClick={() => navigate('/saved-recipes')}
      >
        ← 
      </button>
      
      <h1 className="recipe-title">{recipe.titel}</h1>
      
      <div className="recipe-meta">
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
          <h3>Tipps:</h3>
          <ul>
            {recipe.tipps.map((tipp, index) => (
              <li key={index}>{tipp}</li>
            ))}
          </ul>        
        </div>
      )}
      </div>
    </body>
    
  );
};

export default SavedRecipeDetailPage;