import React from 'react';
import './Features.scss';
import {
  Rocket,
  Smartphone,
  FileText,
  User,
  ShieldCheck,
  Target,
  BarChart3,
  Accessibility
} from 'lucide-react';

const features = [
  {
    icon: <Rocket color="#9b59b6" size={84} />,
    title: 'One-click Audits',
    description: 'Run performance audits with a single click using Lighthouse and Puppeteer.',
  },
  {
    icon: <Smartphone color="#9b59b6" size={84} />,
    title: 'Device Emulation',
    description: 'Test your website on mobile, tablet, or desktop screen sizes.',
  },
  {
    icon: <FileText color="#9b59b6" size={84} />,
    title: 'Export PDF Reports',
    description: 'Generate downloadable, sharable PDF audit reports instantly.',
  },
  {
    icon: <User color="#9b59b6" size={84} />,
    title: 'Guest Access',
    description: 'Let users run tests without signing up for quick analysis.',
  },
  {
    icon: <ShieldCheck color="#9b59b6" size={84} />,
    title: 'Lighthouse-powered Audits',
    description: 'Get trusted, Google-backed performance metrics using Lighthouse.',
  },
  {
    icon: <Target color="#9b59b6" size={84} />,
    title: 'Individual Score Breakdown',
    description: 'Detailed insights on performance, accessibility, SEO, and best practices.',
  },
  {
    icon: <BarChart3 color="#9b59b6" size={84} />,
    title: 'JSON & Chart-based Metrics',
    description: 'View results visually with readable JSON and elegant charts.',
  },
  {
    icon: <Accessibility color="#9b59b6" size={84} />,
    title: 'No Sign Up Required',
    description: 'Start testing immediately, no login barrier.',
  },
];


export default function Features() {
  return (
    <section className="features">
      <h2>Powerful Features to Test Any Site</h2>
      <div className="features-grid">
        {features.map((item, idx) => (
          <div className="feature-card" key={idx}>
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
