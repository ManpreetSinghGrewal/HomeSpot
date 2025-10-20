import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import properties from '../data/properties';

export default function FeaturedListings() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(savedFavorites);
  }, []);

  const handleFavoriteToggle = (property, isFavorited) => {
    let updatedFavorites;
    
    if (isFavorited) {
      // Add to favorites
      updatedFavorites = [...favorites, property];
    } else {
      // Remove from favorites
      updatedFavorites = favorites.filter(fav => fav.dataAddress !== property.dataAddress);
    }
    
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const isPropertyFavorited = (property) => {
    return favorites.some(fav => fav.dataAddress === property.dataAddress);
  };

  return (
    <section className="featured-listings">
      <div className="container">
        <h2>Featured Properties in Punjab</h2>
        <div className="slider-container">
          <div className="listings-slider">
            {properties.map(property => (
              <PropertyCard 
                key={property.dataAddress} 
                property={property}
                isFavorited={isPropertyFavorited(property)}
                onToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
