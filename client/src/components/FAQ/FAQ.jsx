import React, { useState } from 'react';
import './FAQ.scss';

const FAQ = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="faq-section">
      <h2>Frequently asked questions</h2>
      <p className="faq-subtitle">Ask everything you need to know about PagePilot</p>

      <div className="faq-accordion">
        {data.map((item, index) => (
          <div
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            key={index}
          >
            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              {item.question}
            </button>
            <div className="faq-answer">
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
