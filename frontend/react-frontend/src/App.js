import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NewRecipePage from './pages/NewRecipePage';
import SavedRecipesPage from './pages/SavedRecipesPage';
import SavedRecipeDetailPage from './pages/SavedRecipeDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new-recipe" element={<NewRecipePage />} />
          <Route path="/saved-recipes" element={<SavedRecipesPage />} />
          <Route path="/saved-recipe/:id" element={<SavedRecipeDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;