import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Find Your Perfect <span className="highlight-text">Rental Home</span> in Punjab</h1>
        <p>Discover beautiful properties across Ludhiana, Amritsar, Jalandhar, and Mohali.</p>
        <Link to="/listings" className="cta-button">Search Properties</Link>
      </div>
    </section>
  );
}
