import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import InfoBar from './components/InfoBar';
import FeaturedListings from './components/FeaturedListings';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <Header />
      <main>
        <Hero />
        <InfoBar />
        <FeaturedListings />
      </main>
      <Footer />
    </ErrorBoundary>
  );
}
