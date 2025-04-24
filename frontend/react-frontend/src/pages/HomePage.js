import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Lass dir gesunde Rezepte vorschlagen!</h1>
      <div className="home-buttons">
        <button 
          className="btn btn-primary" 
          onClick={() => navigate('/new-recipe')}
        >
          Neues Rezept
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={() => navigate('/saved-recipes')}
        >
          Gespeicherte Rezepte
        </button>
      </div>
    </div>
  );
};

export default HomePage;