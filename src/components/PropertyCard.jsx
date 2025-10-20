import React, { useState, useEffect } from 'react';

export default function PropertyCard({ property, isFavorited = false, onToggle }) {
  const [favorited, setFavorited] = useState(isFavorited);

  useEffect(() => {
    setFavorited(isFavorited);
  }, [isFavorited]);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    const newFavoriteState = !favorited;
    setFavorited(newFavoriteState);
    if (onToggle) {
      onToggle(property, newFavoriteState);
    }
  };

  return (
    <div className="property-card" data-address={property.dataAddress} data-phone={property.dataPhone}>
      <a href={property.link || '#'}>
        <img src={property.imgSrc} alt={property.imgAlt} />
      </a>
      <button 
        className={`fav-button ${favorited ? 'favorited' : ''}`} 
        onClick={handleFavoriteToggle} 
        aria-pressed={favorited} 
        title={favorited ? 'Remove from favorites' : 'Add to favorites'}
        aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorited ? '⭐' : '☆'}
      </button>
      <div className="card-content">
        <div className="card-specs">
          <span><i className="fas fa-bed"></i> {property.beds}</span>
          <span><i className="fas fa-bath"></i> {property.baths}</span>
          <span><i className="fas fa-ruler-combined"></i> {property.sqft}</span>
        </div>
        <div className="card-footer">
          <h3>{property.title}</h3>
          <p className="price">{property.price}</p>
        </div>
        <a className="book-now-btn" href={property.bookLink || '#'}>Book Now</a>
      </div>
    </div>
  );
}
