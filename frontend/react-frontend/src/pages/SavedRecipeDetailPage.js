import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Idea } from '../icons';

const SavedRecipeDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipe } = location.state || {};
  const [portions, setPortions] = useState(1); 

  // Format ingredient with scaled quantities based on portions
  const formatZutat = (zutat) => {
    const { menge, einheit, zutat: name } = zutat;
    const skalierteMenge = Math.round(menge * portions * 100) / 100;
    
    // Handle special cases for zero amounts or "nach Bedarf"
    if (menge === 0 || einheit === 'nach Bedarf') {
      return `${einheit} ${name}`;
    }
    
    return `${skalierteMenge} ${einheit} ${name}`;
  };

  // Handle case when recipe is not found
  if (!recipe) {
    return (
      <div className="recipe-container">
        <Link to="/" className="home-icon">
          <Home />
        </Link>
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
      {/* Green background SVG */}
      <div className="recipe-green-background">
        <svg xmlns="http://www.w3.org/2000/svg" width="1279" height="403" viewBox="0 0 1279 403" fill="none">
          <path d="M0.499756 172C77.5 223.5 142.778 121.098 232.5 101.236C322.222 81.3749 375.467 128.874 467 120.736C558.533 112.599 611.571 57.4863 710 52.7363C808.428 47.9864 955.63 84.4605 1062.5 154.736C1169.37 225.012 1197.5 427.5 1279 400.5C1279 314 1279 0.236328 1279 0.236328H0.499756C0.499756 0.236328 0.499966 110 0.499756 172Z" fill="#3EA55B"/>
        </svg>
      </div>
      
      <div className="recipe-container">
        {/* Home navigation link */}
        <Link to="/" className="home-icon">
          <Home />
        </Link>
        
        {/* Back to saved recipes button */}
        <button 
          className="back-button" 
          onClick={() => navigate('/saved-recipes')}
        >
          {'\u276E'} 
        </button>
        
        {/* Recipe title */}
        <h1 className="recipe-title">{recipe.titel}</h1>
        
        {/* Recipe information (preparation time and portion size) */}
        <div className="recipe-information">
          <p>Bearbeitungszeit: {recipe.zubereitungszeit}</p>
          <label>
            Portionen:{" "}
            <input 
              className='portion-input'
              type="number"
              min="1"
              value={portions}
              onChange={(e) => setPortions(parseInt(e.target.value) || 1)}
            />
          </label>        
        </div>
        
        {/* Recipe content: ingredients and steps */}
        <div className="recipe-content">
          <div className="recipe-content-section">
            <h3>Zutaten:</h3>
            <ul className="ingredients-list">
              {recipe.zutaten?.map((zutat, index) => (
                <li key={index}>{formatZutat(zutat)}</li>
              ))}
            </ul>
          </div>
          
          <div className="recipe-content-section">
            <h3>Zubereitungsschritte:</h3>
            <ol className="steps-list">
              {recipe.zubereitungsschritte?.map((schritt, index) => (
                <li key={index}>{schritt}</li>
              ))}
            </ol>
          </div>
        </div>
        
        {/* Recipe tips section*/}
        {recipe.tipps && (
          <div className="recipe-tip">
            <Idea className="recipe-tip-icon" />
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