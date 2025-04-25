import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchSavedRecipes } from '../api';

const SavedRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getSavedRecipes = async () => {
      setLoading(true);
      try {
        const data = await fetchSavedRecipes();
        setRecipes(data.recipes || []);
        setError(null);
      } catch (err) {
        setError('Fehler beim Laden der gespeicherten Rezepte. Bitte versuchen Sie es später erneut.');
      } finally {
        setLoading(false);
      }
    };

    getSavedRecipes();
  }, []);

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title && recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="recipe-container">
      <Link to="/" className="home-icon">🏠</Link>
      <h1 className="recipe-title">Deine kulinarische Schatztruhe</h1>

      <div className="search-container">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Rezepte durchsuchen..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Rezepte werden geladen...</p>
      ) : error ? (
        <p>{error}</p>
      ) : filteredRecipes.length > 0 ? (
        <ul className="saved-recipes-list">
          {filteredRecipes.map((recipe, index) => (
            <li 
              key={index} 
              className="saved-recipe-item"
              onClick={() => navigate(`/saved-recipe/${index}`, { state: { recipe } })}
            >
              {recipe.title}
            </li>
          ))}
        </ul>
      ) : (
        <p>Keine gespeicherten Rezepte gefunden.</p>
      )}

      <div className="recipe-buttons">
        <button 
          className="btn btn-primary" 
          onClick={() => navigate('/')}
        >
          Zurück zur Startseite
        </button>
      </div>
    </div>
  );
};

export default SavedRecipesPage;