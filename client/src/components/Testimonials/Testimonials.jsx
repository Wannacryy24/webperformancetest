import React, { useState } from 'react';
import './Testimonial.scss';


  const testimonials = [
  {
    name: 'Jenny Wilson',
    role: 'Co-founder, Appson',
    text: 'You made it so simple. My new site is so much faster and easier to work with than my old site...',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Tommy Carter',
    role: 'Growth Engineer, Webly',
    text: 'The audits gave us insights we never had before...',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
  },
  {
    name: 'Lina Gomez',
    role: 'Founder, SmartSpark',
    text: 'No login, no nonsense. We ran tests on our landing pages...',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];



export default function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { name, role, text, avatar } = testimonials[activeIndex];

  return (
    <section className="testimonial">
      <h2>What our customers say</h2>
      <blockquote>"{text}"</blockquote>
      <div className="author">
        <strong>{name}</strong> <span>{role}</span>
      </div>
      <div className="avatars">
        {testimonials.map((user, idx) => (
          <img
            key={idx}
            src={user.avatar}
            alt={user.name}
            className={idx === activeIndex ? 'active' : ''}
            onClick={() => setActiveIndex(idx)}
          />
        ))}
      </div>
    </section>
  );
}
