import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Favorites() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    try {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(storedFavorites);
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, [user, navigate]);

  // Handle removing a favorite
  const handleRemoveFavorite = (index) => {
    const updatedFavorites = favorites.filter((_, i) => i !== index);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Handle navigation to profile history
  const handleGoToHistory = () => {
    navigate('/profile#bookingHistory');
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  if (loading) {
    return (
      <>
        <Header />
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--primary-color)' }}></i>
          <p style={{ marginTop: '20px', fontSize: '1.1rem' }}>Loading your favorites...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <div style={{ padding: '20px', background: '#f8f9fa', minHeight: 'calc(100vh - 200px)' }}>
        <h1 style={{ 
          marginTop: '30px', 
          textAlign: 'center', 
          color: '#333',
          fontSize: '2.5rem',
          fontWeight: '600'
        }}>
          Your Favorite Properties
        </h1>
        
        <div className="favorites-container" style={{
          maxWidth: '1200px',
          margin: '30px auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '30px',
          justifyContent: 'center'
        }}>
          {favorites.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <i className="fas fa-heart" style={{
                fontSize: '4rem',
                color: '#d90429',
                marginBottom: '20px',
                opacity: '0.6'
              }}></i>
              <h2 style={{ color: '#666', marginBottom: '10px' }}>No Favorites Yet</h2>
              <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: '20px' }}>
                Start exploring properties and add them to your favorites!
              </p>
              <button 
                onClick={() => navigate('/')}
                style={{
                  padding: '12px 24px',
                  background: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#a1031d'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'var(--primary-color)'}
              >
                Browse Properties
              </button>
            </div>
          ) : (
            favorites.map((property, index) => (
              <div key={index} className="property-card" style={{
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                width: '340px',
                overflow: 'hidden',
                position: 'relative',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
              }}>
                <img 
                  src={property.imgSrc} 
                  alt={property.imgAlt}
                  style={{
                    width: '100%',
                    height: '220px',
                    objectFit: 'cover'
                  }}
                />
                <button 
                  className="remove-fav"
                  onClick={() => handleRemoveFavorite(index)}
                  title="Remove from favorites"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: '#d90429',
                    border: 'none',
                    color: 'white',
                    fontSize: '1.2rem',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                    transition: 'background-color 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#a1031d'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#d90429'}
                >
                  ×
                </button>
                
                <div className="card-content" style={{ padding: '20px' }}>
                  <div className="card-specs" style={{
                    display: 'flex',
                    gap: '20px',
                    paddingBottom: '15px',
                    marginBottom: '15px',
                    borderBottom: '1px solid #eee',
                    color: '#666',
                    fontSize: '0.9rem'
                  }}>
                    <span>
                      <i className="fas fa-bed" style={{ marginRight: '5px', color: '#2b2d42' }}></i>
                      {property.beds}
                    </span>
                    <span>
                      <i className="fas fa-bath" style={{ marginRight: '5px', color: '#2b2d42' }}></i>
                      {property.baths}
                    </span>
                    <span>
                      <i className="fas fa-ruler-combined" style={{ marginRight: '5px', color: '#2b2d42' }}></i>
                      {property.sqft}
                    </span>
                  </div>
                  
                  <div className="card-footer">
                    <h3 style={{
                      fontSize: '1.25rem',
                      marginBottom: '5px',
                      color: '#333',
                      fontWeight: '600'
                    }}>
                      {property.title}
                    </h3>
                    <p className="price" style={{
                      fontSize: '1.2rem',
                      fontWeight: '600',
                      color: '#d90429',
                      margin: '0'
                    }}>
                      {property.price}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />

      <style jsx>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        :root {
          --primary-color: #d90429;
          --primary-gradient: linear-gradient(45deg, #d90429, #ef233c);
          --dark-bg: #2b2d42;
          --light-text: #edf2f4;
          --dark-text: #333;
          --secondary-bg: #f8f9fa;
        }
        
        body {
          font-family: 'Poppins', sans-serif;
          margin: 0;
          padding: 0;
          background: #f8f9fa;
          color: #333;
        }

        .favorites-container {
          max-width: 1200px;
          margin: 30px auto;
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          justify-content: center;
        }

        .property-card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          width: 340px;
          overflow: hidden;
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .property-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .property-card img {
          width: 100%;
          height: 220px;
          object-fit: cover;
        }

        .card-content {
          padding: 20px;
        }

        .card-specs {
          display: flex;
          gap: 20px;
          padding-bottom: 15px;
          margin-bottom: 15px;
          border-bottom: 1px solid #eee;
          color: #666;
          font-size: 0.9rem;
        }

        .card-specs i {
          margin-right: 5px;
          color: #2b2d42;
        }

        .card-footer h3 {
          font-size: 1.25rem;
          margin-bottom: 5px;
          color: #333;
          font-weight: 600;
        }

        .card-footer .price {
          font-size: 1.2rem;
          font-weight: 600;
          color: #d90429;
          margin: 0;
        }

        .remove-fav {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #d90429;
          border: none;
          color: white;
          font-size: 1.2rem;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          cursor: pointer;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          transition: background-color 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .remove-fav:hover {
          background-color: #a1031d;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .favorites-container {
            gap: 20px;
            padding: 0 10px;
          }
          
          .property-card {
            width: 100%;
            max-width: 400px;
          }
          
          h1 {
            font-size: 2rem !important;
            margin-top: 20px !important;
          }
        }

        @media (max-width: 480px) {
          .favorites-container {
            gap: 15px;
            padding: 0 5px;
          }
          
          h1 {
            font-size: 1.8rem !important;
          }
          
          .card-specs {
            gap: 15px;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </>
  );
}
