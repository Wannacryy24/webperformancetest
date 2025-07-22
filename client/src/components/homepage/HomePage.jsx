import "./HomePage.css";
import image from '../../assets/hero-image-light.avif'
import { useNavigate } from 'react-router-dom';
import TestSummarySection from "../TestSummarySection/TestSummarySection";


export default function HomePage() {
  const navigate = useNavigate();

  const handleRunTestClick = () => {
    navigate('/tester');
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>🚀 Page Pilot</h1>
          <h2>Frontend Performance Tester</h2>
          <p>
            Instantly audit performance, accessibility, SEO, and best practices
            — powered by Lighthouse.
          </p>
          <div className="cta-buttons">
            <button className="primary" onClick={handleRunTestClick}>
              🧪 Run Test
            </button>
            <button className="secondary">📖 Learn More</button>
          </div>
        </div>
        <div className="hero-image">
          <img src={image} alt="Lighthouse Metrics Preview" />
        </div>
      </section>

      {/* How It Works */}
      <section className="section how-it-works">
        <h2>How It Works</h2>
        <div className="cards">
          <div className="card">1️⃣ Enter Website URL</div>
          <div className="card">2️⃣ Headless Lighthouse Audit</div>
          <div className="card">3️⃣ Get a Sharable Report</div>
        </div>
      </section>

      {/* Features */}
      <section className="section features">
        <h2>Features</h2>
        <ul>
          <li>✅ Lighthouse-powered audits</li>
          <li>🎯 Individual score breakdown</li>
          <li>📊 Beautiful JSON & Chart-based metrics</li>
          <li>🧘‍♂️ No sign up required</li>
        </ul>
      </section>

      {/* Use Cases */}
      <section className="section use-cases">
        <h2>Why Use It?</h2>
        <ul>
          <li>🚀 Test before launches</li>
          <li>🧪 QA staging environments</li>
          <li>📈 Share results with clients</li>
          <li>🧑‍💻 Ideal for developers</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          Built with ❤️ using React, Express, Puppeteer & Lighthouse
        </p>
        <nav>
          <a href="#">About</a> | <a href="#">GitHub</a> | <a href="#">Docs</a>
        </nav>
      </footer>
      <TestSummarySection/>
    </div>
  );
}
