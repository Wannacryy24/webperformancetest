import { Link, useNavigate } from 'react-router-dom';
import "./Header.css";
import webPerformanceLogo from '../../assets/web-maintenance.png'
import React from 'react';

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <div className="logo"
          onClick={()=>navigate('/')}
        >
          <span className="logo-icon">
            <img src={webPerformanceLogo} alt="PagePilot Logo" />
          </span>
          <span className="logo-text">Page-Pilot</span>
        </div>

        {/* Navigation */}
        <nav className="nav">
          <Link to="/" className="nav-item">Home</Link>
          <a href="#about" className="nav-item">About</a>
          <a
            href="https://myportfoliovscode.netlify.app/home"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-item"
          >
            Portfolio
          </a>

          <div className="nav-item dropdown">
            <span className="dropdown-toggle">
              Projects <span className="arrow">▼</span>
            </span>
            <ul className="dropdown-menu">
              <li><Link to="/tester">Performance Tester</Link></li>
              <li><Link to="/skeleton">Skeleton Chart</Link></li>
              <li><a href="#">Project Three</a></li>
            </ul>
          </div>
        </nav>

        {/* CTA */}
        <button className="get-started-button"
          onClick={()=>navigate('/tester')}
        >Get Started</button>
      </div>
    </header>
  );
}
