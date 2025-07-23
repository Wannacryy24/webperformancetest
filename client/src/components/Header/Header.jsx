import { Link } from 'react-router-dom';
import "./Header.css";
import pagepilotlogo from '../../assets/pilot.png';
import React from 'react';


export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        {/* Logo */}
        <div className="logo">
          <span className="logo-icon">
            <img src={pagepilotlogo} alt="PagePilot Logo" />
          </span>
          <span className="logo-text">PagePilot</span>
        </div>

        {/* Navigation */}
        <nav className="nav">
          <Link to="/" className="nav-item">Home</Link>
          <a href="#about" className="nav-item">About</a>
          <a
            href="https://myportfoliovscodetheme.netlify.app/Home"
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
        <a href="#contact" className="cta-button">Contact Us</a>
      </div>
    </header>
  );
}
