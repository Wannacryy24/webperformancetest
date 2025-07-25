import React from 'react'
import { useNavigate } from 'react-router-dom';
import image from '../../assets/hero-image-light.avif'
import './Hero.scss'
import { navigateTo } from '../../utils/navigation';

export default function Hero() {
  const navigate = useNavigate();

  const handleRunTestClick = () => {
    navigateTo(navigate,'/tester');
  };

  return (
    <div className='hero-div'>
        <div className="hero-inner-div-first">
          {/* <h1>Page Pilot</h1> */}
          <p className="hero-text-p">
            <span className="span-1">Instantly Audit Performance,</span>
            <span className="span-2">Accessibility, SEO</span>
            <span className="span-3"> and Best Practices</span>
            <span className="span-3">— powered by Lighthouse.</span>
          </p>
          <div className="hero-button-inner-div">
            <button className="get-started-button" onClick={handleRunTestClick}>
              🧪 Run Test
            </button>
            <button className="get-started-button">📖 Learn More</button>
          </div>
        </div>
        <div className="hero-image">
          <img src={image} alt="Lighthouse Metrics Preview" />
        </div>
    </div>
  )
}
