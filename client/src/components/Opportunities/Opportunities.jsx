import React, { useState, useRef, useEffect } from 'react';
import './Opportunities.css';

export default function Opportunities({ data }) {
  const [visibleCount, setVisibleCount] = useState(5);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const listRef = useRef(null);

  if (!data || data.length === 0) {
    return <p>No performance opportunities available.</p>;
  }

  const visibleItems = data.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, data.length));
    setTimeout(() => {
      listRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
    }, 100); // Wait to render new items
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="opportunities">
      <h2>🚀 Performance Opportunities</h2>
      <ul ref={listRef}>
        {visibleItems.map((item) => (
          <li key={item.id} className="opportunity-item fade-in">
            <h3>🛠️ {item.title}</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: formatDescription(item.description),
              }}
            />
            <p>
              <strong>Potential Savings:</strong>{' '}
              <span className="badge">{item.savingsMs.toFixed(0)} ms</span>
            </p>
          </li>
        ))}
      </ul>

      {visibleCount < data.length && (
        <button className="toggle-button" onClick={handleLoadMore}>
          Show 5 More
        </button>
      )}

      {showTopBtn && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          ⬆️ Top
        </button>
      )}
    </div>
  );
}

// Convert [text](link) into clickable <a>
function formatDescription(desc) {
  return desc.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );
}
