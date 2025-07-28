import React, { useState, useEffect, useRef } from "react";
import "./WebFactSlider.scss";

const facts = [
    {
        text: "1 in 2 users leave if a site takes over 3s to load",
        source: "Google",
    },
    {
        text: "70% of consumers admit that page speed impacts their purchasing decisions",
        source: "Unbounce",
    },
    {
        text: "Mobile users are 5x more likely to abandon a task if the site isn’t mobile-optimized",
        source: "Google Research",
    },
    {
        text: "A 1s delay in page response can result in a 7% reduction in conversions",
        source: "Akamai",
    },
    {
        text: "Users form an opinion about your site in just 0.05 seconds",
        source: "Behavior & Info Tech",
    },
    {
        text: "Improving site speed by 1s can increase conversions by 27%",
        source: "Deloitte",
    },
    {
        text: "Amazon found every 100ms of latency cost them 1% in sales",
        source: "Amazon",
    },
];

export default function PerformanceFacts() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const sliderRef = useRef();

    const nextFact = () => {
        setCurrentIndex((prev) => (prev + 1) % facts.length);
    };

    const prevFact = () => {
        setCurrentIndex((prev) => (prev - 1 + facts.length) % facts.length);
    };

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(() => {
            nextFact();
        }, 4000);
        return () => clearInterval(timer);
    }, [currentIndex, isPaused]);

    return (
        <div>
            <h2>Fun Facts</h2>
            <div    
                className="fact-slider"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                ref={sliderRef}
            >
                <div className="quote-icon">❝</div>
                <p className="fact-text">"{facts[currentIndex].text}"</p>
                <div className="author-line">— {facts[currentIndex].source}</div>

                <div className="navigation">
                    <button className="nav-btn" onClick={prevFact}>
                        ‹
                    </button>
                    <div className="dots">
                        {facts.map((_, i) => (
                            <span
                                key={i}
                                className={`dot ${i === currentIndex ? "active" : ""}`}
                                onClick={() => setCurrentIndex(i)}
                            ></span>
                        ))}
                    </div>
                    <button className="nav-btn" onClick={nextFact}>
                        ›
                    </button>
                </div>
            </div>
        </div>
    );
}
