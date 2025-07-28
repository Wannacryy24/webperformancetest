import TestSummarySection from "../TestSummarySection/TestSummarySection";
import React from 'react';
import Hero from "../Hero/Hero";
import Features from "../FeaturesCard/Features";
import Testimonials from '../Testimonials/Testimonials'
import FAQ from '../FAQ/FAQ'
import faqData from '../FAQ/faqData'
import HowItWorks from "../howItWorks/HowItWorks";

export default function HomePage() {
  
  return (
    <div className="homepage">
      {/* Hero Section */}
      <Hero />
      <Features/>
      <HowItWorks/>
      <Testimonials />
      <FAQ data={faqData}/>
    </div>
  );
}
