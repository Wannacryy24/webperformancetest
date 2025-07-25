import React from 'react'
import './Footer.css'
export default function Footer() {
  return (
      <footer className="footer">
        <p>
          Built with ❤️ using React, Express, Puppeteer & Lighthouse
        </p>
        <nav>
          <a href="#">About</a> | <a href="#">GitHub</a> | <a href="#">Docs</a>
        </nav>
      </footer>
  )
}
