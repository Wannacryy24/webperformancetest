import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.scss';
import { navigateTo } from '../../utils/navigation';
import { FaRocket, FaInfoCircle } from 'react-icons/fa';

export default function Hero() {
  const navigate = useNavigate();

  const handleRunTestClick = () => {
    navigateTo(navigate, '/tester');
  };

  return (
    <div className='hero-div'>
      <div className="hero-inner-div-first">
        <p className="hero-text-p">
          <span>Instantly Audit Performance,</span><br />
          <span>Accessibility, SEO and Best Practices</span><br />
          <span>— powered by Lighthouse.</span>
        </p>
        <div className="hero-button-inner-div">
          <button className="started-button" onClick={handleRunTestClick}>
            <FaRocket style={{ marginRight: '8px' }} />
            Run Test
          </button>
          <button className="started-button">
            <FaInfoCircle style={{ marginRight: '8px' }} />
            Learn More
          </button>
        </div>
      </div>
      <div className="hero-image">
        <img src="/undraw_metrics_5v8d.svg" alt="Hero illustration" />
      </div>
    </div>
  );
}