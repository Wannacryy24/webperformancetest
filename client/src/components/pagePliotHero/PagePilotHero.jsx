import React from 'react';
import './PagePilotHero.css';

const PagePilotHero = () => {
  return (
    <div className="hero">
      <h1>🔥 PagePilot</h1>
      <p>"Get a complete audit of your website"</p>

      <div className="input-group">
        <p>Just Enter Url and Hit Run Audit</p>
        <button>Test 🔎</button>
      </div>

      <p className="note">→ No login. Instant. Powered by Lighthouse</p>
    </div>
  );
};

export default PagePilotHero;
