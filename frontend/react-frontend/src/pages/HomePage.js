import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState('');

  const handleNewRecipe = () => {
    // If there are ingredients, pass them as state when navigating
    if (ingredients.trim()) {
      navigate('/new-recipe', { 
        state: { ingredients: ingredients.split(',').map(item => item.trim()) } 
      });
    } else {
      navigate('/new-recipe');
    }
  };

  return (
    <>
      <div className="background-texture"></div>
      <div className="home-container">
        <h1 className="home-title">Lass dir gesunde <span>Rezepte vorschlagen!</span></h1>

        <div className="ingredients-input-container">
          <label htmlFor="ingredients" className="ingredients-label">
            Möchtest du bestimmte Zutaten verwenden? (mit Komma getrennt)
          </label>
          <textarea
            id="ingredients"
            className="ingredients-input"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="z.B. Kartoffeln, Zwiebeln, Paprika"
            rows={3}
          />
        </div>

        <div className="home-buttons">
          <button className="btn btn-primary" onClick={handleNewRecipe}>
            Neues Rezept
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('/saved-recipes')}>
            Gespeicherte Rezepte
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;