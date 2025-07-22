import React from "react";
import "./TestSummarySection.css";

const TestSummarySection = () => {
  return (
    <div className="test-summary-section">
      <div className="test-card">
        <h4 className="card-title">📊 Recent Test Results</h4>
        <div className="test-item light-green">
          98 Performance Score <span className="highlight-green">https://vercel.com</span>
        </div>
        <div className="test-item light-blue">
          91 Accessibility <span className="highlight-blue">Last tested: 1 hr ago</span>
        </div>
        <div className="test-item light-purple">
          3.2s FCP <span className="highlight-purple">Real-world metric</span>
        </div>
      </div>

      <div className="test-info">
        <p className="tagline">Measure. Optimize. Win.</p>
        <h1 className="main-heading">
          Your <span className="blue-text">Performance</span>{" "}
          <span className="green-badge">Inspector</span>.
        </h1>
        <p className="desc">
          Track your website's performance in real time, identify bottlenecks,
          and monitor progress with beautiful, developer-friendly reports.
        </p>

        <div className="stats">
          <div className="stat-box light-blue">1200+<br />Websites Audited</div>
          <div className="stat-box light-green">5 sec<br />Avg. Audit Duration</div>
        </div>

        <button className="cta-button">Run a Test →</button>
        <p className="footer-info">✅ Powered by Lighthouse • ⚡ Instant Insights</p>
      </div>
    </div>
  );
};

export default TestSummarySection;
