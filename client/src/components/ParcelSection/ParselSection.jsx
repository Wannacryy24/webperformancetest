import React from "react";
import "./ParcelSection.css";

const ParcelSection = () => {
  return (
    <div className="parcel-section">
      <div className="parcel-card">
        <h4 className="card-title">🚚 Available Parcels</h4>
        <div className="parcel-item light-green">
          3 Parcels Available <span className="highlight-green">Hyderabad → Bengaluru</span>
        </div>
        <div className="parcel-item light-blue">
          2 Local Deliveries <span className="highlight-blue">Same City</span>
        </div>
        <div className="parcel-item light-purple">
          Express Package <span className="highlight-purple">Priority</span>
        </div>
      </div>

      <div className="parcel-info">
        <p className="tagline">Send Parcels Anytime & Anywhere</p>
        <h1 className="main-heading">
          Your <span className="blue-text">Personal</span>{" "}
          <span className="green-badge">Parcel</span> Hub.
        </h1>
        <p className="desc">
          We’ve designed the perfect platform to connect your parcels with travelers going your way, making it easy to send packages quickly and reliably across any distance.
        </p>

        <div className="stats">
          <div className="stat-box light-blue">3000+<br />Users</div>
          <div className="stat-box light-green">6–8 hr<br />Avg. Delivery Time</div>
        </div>

        <button className="cta-button">Send Your Parcel →</button>
        <p className="footer-info">✅ Trusted by 3000+ users • 📍 Track in real-time</p>
      </div>
    </div>
  );
};

export default ParcelSection;
