import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import About from './pages/About';
import Services from './pages/Services';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Listings from './pages/Listings';
import Booking from './pages/Booking';
import Landlord from './pages/Landlord';
import ErrorBoundary from './components/ErrorBoundary';

export default function Router() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/login" element={<Login />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/landlord" element={<Landlord />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
