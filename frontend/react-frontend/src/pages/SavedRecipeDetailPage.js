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
    <div className="recipe-container">
      <Link to="/" className="home-icon">🏠</Link>
      <button 
        className="back-button" 
        onClick={() => navigate('/saved-recipes')}
      >
        ← Zurück zu gespeicherten Rezepten
      </button>
      
      <h1 className="recipe-title">{recipe.title}</h1>
      
      <div className="recipe-meta">
        <p>Bearbeitungszeit: {recipe.preparation_time || '30 Minuten'}</p>
        <p>Portionen: {recipe.servings || '4'}</p>
      </div>
      
      <div className="recipe-content">
        <div className="recipe-content-section">
          <h3>Zutaten:</h3>
          <ul className="ingredients-list">
            {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        
        <div className="recipe-content-section">
          <h3>Zubereitungsschritte:</h3>
          <ol className="steps-list">
            {recipe.instructions && recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
      
      {recipe.tip && (
        <div className="recipe-tip">
          {recipe.tip}
        </div>
      )}
    </div>
  );
};

export default SavedRecipeDetailPage;