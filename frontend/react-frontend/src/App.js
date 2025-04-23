import React, { useState } from 'react';

function App() {
  const [recipe, setRecipe] = useState(null);
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

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>LASS DIR GESUNDE <br /> REZEPTE VORSCHLAGEN!!</h1>
      
      <button onClick={fetchRecipe}>
        neues Rezept
      </button>

      <button>
        gespeicherte Rezepte
      </button>

      {loading && <p>Rezept wird geladen...</p>}

      {recipe && (
        <div style={{ marginTop: '2rem', textAlign: 'left', maxWidth: '600px', margin: 'auto' }}>
          <h2>Vorgeschlagenes Rezept:</h2>
          <pre>{JSON.stringify(recipe, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
