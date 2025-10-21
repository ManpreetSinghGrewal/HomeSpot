import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function PropertyCard({ property, isFavorited = false, onToggle }) {
  const [favorited, setFavorited] = useState(isFavorited);
  const navigate = useNavigate();

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

  const handleBookNow = (e) => {
    e.preventDefault();
    // Store property details for booking
    localStorage.setItem('selectedProperty', JSON.stringify(property));
    navigate('/booking');
  };

  return (
    <div className="property-card" data-address={property.dataAddress} data-phone={property.dataPhone}>
      <Link to="/listings">
        <img src={property.imgSrc} alt={property.imgAlt} />
      </Link>
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
        <button className="book-now-btn" onClick={handleBookNow}>Book Now</button>
      </div>
    </div>
  );
}
