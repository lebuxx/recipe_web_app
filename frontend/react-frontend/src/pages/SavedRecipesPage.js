import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchSavedRecipes } from '../api';

const SavedRecipesPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  return (
    <div className="recipe-container">
      <Link to="/" className="home-icon">🏠</Link>
      <h1 className="recipe-title">Deine kulinarische Schatztruhe</h1>

      {loading ? (
        <p>Rezepte werden geladen...</p>
      ) : error ? (
        <p>{error}</p>
      ) : recipes.length > 0 ? (
        <ul className="saved-recipes-list">
          {recipes.map((recipe, index) => (
            <li 
              key={index} 
              className="saved-recipe-item"
              onClick={() => navigate(`/saved-recipe/${index}`, { state: { recipe } })}
            >
              {recipe.title || 'Unbenanntes Rezept'}
            </li>
          ))}
        </ul>
      ) : (
        <p>Keine gespeicherten Rezepte gefunden.</p>
      )}

    </div>
  );
};

export default SavedRecipesPage;