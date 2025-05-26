import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TomatoImage from '../images/Homepage-tomato.png';

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
      <div className='homepage-green-background'> 
        <svg xmlns="http://www.w3.org/2000/svg" width="1280" height="914" viewBox="0 0 1280 914" fill="none">
          <path d="M1287.5 199.5C1287.5 402 1287.5 875 1287.5 875C1287.5 875 1133.5 772.5 890 772.5C646.5 772.5 497.868 943.234 312 909.5C126.132 875.766 -2.49992 786 -2.49992 786C-2.49992 786 -2.50007 96.5 -2.49996 87.0003C-2.49752 -130.129 367.616 124.005 508.5 164.5C649.383 204.995 743.415 242.429 890 243.5C1036.58 244.571 1204 137 1287.5 199.5Z" fill="#3EA65B"/>
        </svg>
      </div>
      <div className="background-texture"></div>
      <div className="home-container">
        <Link to="/saved-recipes" className="folder-icon">🔖</Link>
       <div className="title-container">
          <h1 className="home-title">
            <span>Lass dir </span> 
            <span>gesunde </span>
            <span>Rezepte </span>
            <span>vorschlagen!</span>
          </h1>
          <img 
            src={TomatoImage}
            alt="Tomato" 
            className="tomato-image"
          />
        </div>

        <div className="ingredients-input-container">

          <textarea
            id="ingredients"
            className="ingredients-input"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Schreibe welche Zutaten du benutzen möchtest ( z.B. Kartoffeln, Zwiebeln, Paprika )"
            rows={3}
          />
        </div>

        <div className="home-buttons">
          <button className="btn btn-primary" onClick={handleNewRecipe}>
            Neues Rezept
          </button>
        </div>
      </div>
    </>
  );
};

export default HomePage;