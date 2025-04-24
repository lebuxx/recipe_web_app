import React, { useState } from 'react';

function App() {
  const [recipe, setRecipe] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]); 
  const [loading, setLoading] = useState(false);

  const fetchRecipe = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:81/recipe');
      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      console.error('Fehler beim Abrufen des Rezepts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:81/saved_recipes');
      const data = await response.json();
      setSavedRecipes(data.recipes); // Speichere die Rezepte in dem State
    } catch (error) {
      console.error('Fehler beim Abrufen der gespeicherten Rezepte:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>LASS DIR GESUNDE <br /> REZEPTE VORSCHLAGEN!!</h1>
      
      <button onClick={fetchRecipe}>
        neues Rezept
      </button>

      <button onClick={fetchSavedRecipes}>
        gespeicherte Rezepte
      </button>

      {loading && <p>Rezept wird geladen...</p>}

      {recipe && (
        <div style={{ marginTop: '2rem', textAlign: 'left', maxWidth: '600px', margin: 'auto' }}>
          <h2>Vorgeschlagenes Rezept:</h2>
          <pre>{JSON.stringify(recipe, null, 2)}</pre>
        </div>
      )}
      {savedRecipes.length > 0 && (
        <div style={{ marginTop: '2rem', textAlign: 'left', maxWidth: '600px', margin: 'auto' }}>
          <h2>Gespeicherte Rezepte:</h2>
          <ul>
            {savedRecipes.map((savedRecipe, index) => (
              <li key={index}>
                <pre>{JSON.stringify(savedRecipe, null, 2)}</pre>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
