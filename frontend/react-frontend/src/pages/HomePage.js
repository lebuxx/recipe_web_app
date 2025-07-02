import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TomatoImage from '../images/Homepage-tomato.png';
import { Cookbook, Macronutrients, Nutritious, NoAdditives, NaturalTaste, Alert } from '../icons';

const HomePage = () => {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState('');

  const handleNewRecipe = () => {
    // If there are ingredients, pass them as state when navigating
    if (ingredients.trim()) {
      navigate('/new-recipe', { 
        state: { 
          ingredients: ingredients.split(',').map(item => item.trim()),
        } 
      });
    } else {
      navigate('/new-recipe',{
      });
    }
  };

 return (
    <>
      <div className="home-container">
        <Link to="/saved-recipes" className="cookbook-icon">
          <Cookbook />
        </Link>
       <div className="title-container">
          <h1 className="home-title">
            {/* <span>Lass dir </span> 
            <span>gesunde </span>
            <span>Rezepte </span>
            <span>vorschlagen!</span> */}
          </h1>
          <img 
            src={TomatoImage}
            alt="Tomato" 
            className="tomato-image"
          />
        </div>

        {/* Input section with background - similar to ai-section-with-background */}
        <div className="input-section-with-background">
          {/* Title Background SVG */}
          <div className='title-background-container'> 
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1280 826" fill="none" preserveAspectRatio="none">
             <path d="M1280 143.91C1280 290.196 1280 738 1280 738C1280 738 1146.18 648 904 648C661.821 648 378.359 847.869 193.5 823.5C8.64058 799.131 -2.99995 696.5 -2.99995 696.5C-2.99995 696.5 -3.00006 69.5032 -2.99995 62.6406C-2.99752 -94.2128 365.108 89.3726 505.227 118.626C645.346 147.88 738.868 174.922 884.657 175.696C1030.45 176.469 1196.95 98.7602 1280 143.91Z" fill="#3EA65B"/>
            </svg>
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
      </div>
    
      {/* Info section */}
      <div className="info-section">
        <h2 className="info-section-title">
          Alles über deine gesunden Rezepte
        </h2>
        <p className="info-section-subtitle">
          Willkommen in der Küche der Zukunft! Hier entstehen im Handumdrehen gesunde 
          Rezepte, genau nach deinem Geschmack. Aber was steckt dahinter?
        </p>

        <div className="info-items">
          <div className="info-item">
            <div className="info-icon">
              <Macronutrients />
            </div>
            <div className="info-content">
              <h3>Makronährstoff-Balance:</h3>
              <p>Der Fokus liegt auf einem ausgewogenen Verhältnis von komplexen Kohlenhydraten, gesunden Fetten und hochwertigen Proteinen.</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <Nutritious />
            </div>
            <div className="info-content">
              <h3>Nährstoffreiche Zutaten:</h3>
              <p>Ausschließlich frisches Gemüse, Vollkornprodukte, Hülsenfrüchte, hochwertige pflanzliche oder magere tierische Eiweißquellen bilden die Grundlage.</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <NoAdditives />
            </div>
            <div className="info-content">
              <h3>Keine unnötigen Zusätze:</h3>
              <p>Verarbeitete Lebensmittel, raffinierter Zucker, Weißmehl, gesättigte Fette und künstliche Zusatzstoffe werden vermieden.</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon">
              <NaturalTaste />
            </div>
            <div className="info-content">
              <h3>Natürlicher Geschmack: </h3>
              <p>Salz wird reduziert; stattdessen kommen Gewürze und Kräuter zur Geschmacksverstärkung zum Einsatz.</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Capabilities - with background */}
      <div className="ai-section-with-background">
        {/* AI Background SVG */}
        <div className="ai-background-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1280 1233" fill="none" preserveAspectRatio="none">
            <path d="M0 83.193C0 83.193 137.633 10.7088 261 1.68543C376.583 -6.76859 439 18.007 537.5 44.1964C601.953 61.3334 747.037 101.105 872 83.1932C990.762 66.1701 1044 61.65 1113.5 61.65C1183 61.65 1280 105.138 1280 105.138V1054.6C1280 1054.6 1130.1 1145.38 1014.5 1170.99C817.62 1214.62 699.42 1101.93 495.5 1114.95C295.538 1127.73 0 1233 0 1233V83.193Z" fill="#3EA55B"/>
          </svg>
        </div>

        <div className="info-section">
          <div className="ai-capabilities-section">
            <h2 className="ai-capabilities-title">
              Was die KI kann – und was nicht
            </h2>
            <p className="ai-capabilities-intro">
              Was darfst du von den generierten Rezepten erwarten? Hier ein klarer Blick auf die Möglichkeiten und wo die Unterstützung des KI-Systems endet.
            </p>

            <div className="ai-capabilities-content"> 
              <div className="alert-icon">
                <Alert />
              </div>
              <div className="ai-can-do">
                <h3>Keine individuelle Ernährungsberatung:</h3>
                <p>Die generierten Rezepte sind allgemeine Vorschläge und ersetzen keine persönliche, medizinisch fundierte Beratung durch Fachleute. </p>
                <p>Spezifische Bedürfnisse (z.B. bei Schwangerschaft, Krankheiten oder besonderen Ernährungszielen) können nicht berücksichtigt werden. </p>
              </div>
            </div>
            <div className="ai-capabilities-content"> 
              <div className="alert-icon">
                <Alert />
              </div>
              <div className="ai-can-do">
                <h3>KI-Präzision:</h3>
                <p>Die Künstliche Intelligenz arbeitet mit Wahrscheinlichkeiten.</p>
                <p>Das bedeutet, es können unrealistische Mengenangaben, unpassende Zubereitungsschritte oder fehlerhafte Zutatenkombinationen vorkommen. </p>
                <p> Eine kurze Prüfung des Rezepts ist immer ratsam.</p>
              </div>
            </div>
            <div className="ai-capabilities-content"> 
              <div className="alert-icon">
                <Alert />
              </div>
              <div className="ai-can-do">
              <h3>Umgang mit eingegebenen Zutaten:</h3>
                <p>Gibst du stark verarbeitete oder "ungesunde" Zutaten ein,  versucht die KI, diese intelligent zu handhaben. </p>
                <p>Es kann vorkommen, dass solche Zutaten ignoriert werden oder die KI eine gesündere Alternative vorschlägt. </p>
                <p>Diese Anpassungen werden jedoch nicht immer explizit kommuniziert.</p>  
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="ai-final-note">
          <p>Die Anwendung ist eine fantastische Inspirationsquelle für deine gesunde Küche.</p>
          <p>Nutze sie als kreativen Impuls und beachte die genannten Punkte.</p>
          <p>Bei gesundheitlichen Fragen ist der Rat eines Spezialisten unerlässlich.</p>
        </div>
    </>
  );
};

export default HomePage;