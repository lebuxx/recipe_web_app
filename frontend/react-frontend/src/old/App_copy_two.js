import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from 'react-router-dom';

// Home component with the button
function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:81/recipe');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Store recipe data in sessionStorage to pass it to the recipe page
      sessionStorage.setItem('currentRecipe', JSON.stringify(data));
      // Navigate to the recipe page
      navigate('/recipe');
    } catch (e) {
      console.error("Failed to fetch recipe:", e);
      setError("Failed to load recipe. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <h1>Lass dir neue Rezepte generieren!</h1>
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Generiere...' : 'Neues Rezept'}
      </button>

      {/* Display loading message */}
      {loading && <p>Loading recipe...</p>}

      {/* Display error message if fetch failed */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

// Recipe page component
function RecipePage() {
  const [recipe, setRecipe] = useState(() => {
    const savedRecipe = sessionStorage.getItem('currentRecipe');
    return savedRecipe ? JSON.parse(savedRecipe) : null;
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null);


  if (!recipe) {
    return (
      <div className="container">
        <p>Kein Rezept gefunden. Bitte generiere zuerst ein Rezept.</p>
        <Link to="/">Zurück zur Startseite</Link>
      </div>
    );
  }

  // Function to handle saving the recipe
  const handleSaveRecipe = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    
    try {
      const response = await fetch('http://localhost:81/save_recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Fehler beim Speichern des Rezepts');
      }
      
      const data = await response.json();
      setSaveStatus({ type: 'success', message: 'Rezept erfolgreich gespeichert!' });
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      setSaveStatus({ type: 'error', message: error.message });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container">
      <div className="recipe-header">
        <Link to="/" className="back-button">← Zurück</Link>
        <h2>{recipe.name || 'Unbenanntes Rezept'}</h2>
        {/* Save Button */}
        <div className="save-container" style={{ marginTop: '15px' }}>
          <button 
            onClick={handleSaveRecipe}
            disabled={isSaving}
            style={{
              padding: '8px 16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isSaving ? 'not-allowed' : 'pointer'
            }}
          >
            {isSaving ? 'Wird gespeichert...' : 'Rezept speichern'}
          </button>
          
          {/* Save status message */}
          {saveStatus && (
            <p style={{ 
              color: saveStatus.type === 'success' ? 'green' : 'red',
              marginTop: '10px'
            }}>
              {saveStatus.message}
            </p>
          )}
        </div>
      </div>

      <div className="recipe-meta">
        {recipe.portionen && <p><strong>Portionen:</strong> {recipe.portionen}</p>}
        {recipe.zubereitungszeit && <p><strong>Zubereitungszeit:</strong> {recipe.zubereitungszeit}</p>}
      </div>
      
      <h3>Zutaten:</h3>
      {Array.isArray(recipe.zutaten) ? (
        <ul>
          {recipe.zutaten.map((zutat, index) => (
            <li key={index}>{zutat}</li>
          ))}
        </ul>
      ) : (
        <p>Keine Zutaten verfügbar</p>
      )}
      
      <h3>Anleitung:</h3>
      {Array.isArray(recipe.zubereitungsschritte) ? (
        <ol>
          {recipe.zubereitungsschritte.map((schritt, index) => (
            <li key={index}>{schritt}</li>
          ))}
        </ol>
      ) : (
        <p>Keine Zubereitungsschritte verfügbar</p>
      )}
      
      {Array.isArray(recipe.tipps) && recipe.tipps.length > 0 && (
        <>
          <h3>Tipps:</h3>
          <ul>
            {recipe.tipps.map((tipp, index) => (
              <li key={index}>{tipp}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

// Main App component with Router
export default function MyApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe" element={<RecipePage />} />
      </Routes>
    </Router>
  );
}