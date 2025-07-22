import React from 'react';
import './PageLoadFilmstrip.css';

const PageLoadFilmstrip = ({ filmstrip }) => {
  if (!filmstrip?.length) return null;

  return (
    <div className="filmstrip-container">
      <h2>Page Load Visualization</h2>
      <div className="filmstrip-scroll">
        {filmstrip.map((frame, index) => (
          <div className="filmstrip-frame" key={index}>
            <img src={frame.data} alt={`Frame ${index}`} />
            <p>{(frame.timing / 1000).toFixed(1)} s</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageLoadFilmstrip;
