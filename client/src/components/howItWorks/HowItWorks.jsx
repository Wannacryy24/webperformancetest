import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <h2>How It Works</h2>
      <div className="workflow">
        <div className="step">
          <span className="step-number">1</span>
          <span className="step-text">Enter URL</span>
        </div>
        <span className="arrow">→</span>
        <div className="step">
          <span className="step-number">2</span>
          <span className="step-text">Run Test</span>
        </div>
        <span className="arrow">→</span>
        <div className="step">
          <span className="step-number">3</span>
          <span className="step-text">View PDF</span>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;












