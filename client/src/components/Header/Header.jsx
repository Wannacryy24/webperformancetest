import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Header.css";
import webPerformanceLogo from '../../assets/web-maintenance.png';

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const closeAllMenus = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <div className="logo" onClick={() => { navigate('/'); closeAllMenus(); }}>
          <span className="logo-icon">
            <img src={webPerformanceLogo} alt="PagePilot Logo" />
          </span>
          <span className="logo-text">Page-Pilot</span>
        </div>

        {/* Hamburger */}
        <div className="hamburger" onClick={toggleMobileMenu}>
          <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
        </div>

        {/* Nav */}
        <nav className={`nav ${menuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-item" onClick={closeAllMenus}>Home</Link>
          <a href="#about" className="nav-item" onClick={closeAllMenus}>About</a>
          <a
            href="https://myportfoliovscode.netlify.app/home"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-item"
            onClick={closeAllMenus}
          >
            Portfolio
          </a>

          {/* Dropdown */}
          <div className={`nav-item dropdown ${isDropdownOpen ? 'open' : ''}`}>
            <span
              className="dropdown-toggle"
              onClick={() => setDropdownOpen(prev => !prev)}
            >
              Projects <span className="arrow">▼</span>
            </span>

            <ul className="dropdown-menu">
              <li><Link to="/tester" onClick={closeAllMenus}>Performance Tester</Link></li>
              <li><Link to="/skeleton" onClick={closeAllMenus}>Skeleton Chart</Link></li>
              <li><a href="#" onClick={closeAllMenus}>Project Three</a></li>
            </ul>
          </div>


          {/* Mobile Get Started */}
          <button className="get-started-button mobile-only" onClick={() => { navigate('/tester'); closeAllMenus(); }}>
            Get Started
          </button>
        </nav>

        {/* Desktop Get Started */}
        <button className="get-started-button desktop-only" onClick={() => navigate('/tester')}>
          Get Started
        </button>
      </div>
    </header>
  );
}
