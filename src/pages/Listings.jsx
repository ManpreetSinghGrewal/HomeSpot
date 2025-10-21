import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Listings() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State for search and filtering
  const [searchFilters, setSearchFilters] = useState({
    city: '',
    rooms: ''
  });
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 6;
  
  // State for filtered properties
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [displayedProperties, setDisplayedProperties] = useState([]);
  
  // State for results display
  const [resultsTitle, setResultsTitle] = useState('All Properties');
  const [resultsCount, setResultsCount] = useState(0);

  // Sample property data (you can expand this with more properties for pagination)
  const allProperties = [
    {
      id: 1,
      title: 'Modern Punjabi Villa',
      city: 'ludhiana',
      rooms: 4,
      beds: 4,
      baths: 3,
      sqft: '2,200',
      price: '₹45,000/month',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format&fit=crop',
      address: '125 Model Town, Ludhiana, Punjab',
      phone: '+91 98765-43210'
    },
    {
      id: 2,
      title: 'Amritsar City Apartment',
      city: 'amritsar',
      rooms: 2,
      beds: 2,
      baths: 2,
      sqft: '1,100',
      price: '₹35,000/month',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop',
      address: '18 Mall Road, Amritsar, Punjab',
      phone: '+91 98765-43211'
    },
    {
      id: 3,
      title: 'Jalandhar Family Home',
      city: 'jalandhar',
      rooms: 3,
      beds: 3,
      baths: 2,
      sqft: '1,800',
      price: '₹28,000/month',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
      address: '42 Civil Lines, Jalandhar, Punjab',
      phone: '+91 98765-43212'
    },
    {
      id: 4,
      title: 'Mohali Luxury Villa',
      city: 'mohali',
      rooms: 5,
      beds: 5,
      baths: 5,
      sqft: '4,500',
      price: '₹85,000/month',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop',
      address: '9 Green Avenue, Mohali, Punjab',
      phone: '+91 98765-43213'
    },
    {
      id: 5,
      title: 'Mohali Studio Apartment',
      city: 'mohali',
      rooms: 1,
      beds: 1,
      baths: 1,
      sqft: '750',
      price: '₹18,000/month',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop',
      address: '55 Sector 70, Mohali, Punjab',
      phone: '+91 98765-43214'
    },
    {
      id: 6,
      title: 'Mohali Townhouse',
      city: 'mohali',
      rooms: 3,
      beds: 3,
      baths: 2.5,
      sqft: '1,950',
      price: '₹42,000/month',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format&fit=crop',
      address: '210 Phase 8, Mohali, Punjab',
      phone: '+91 98765-43215'
    },
    // Additional properties for pagination
    {
      id: 7,
      title: 'Ludhiana Modern Flat',
      city: 'ludhiana',
      rooms: 2,
      beds: 2,
      baths: 2,
      sqft: '1,200',
      price: '₹25,000/month',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop',
      address: '78 Model Town Extension, Ludhiana, Punjab',
      phone: '+91 98765-43216'
    },
    {
      id: 8,
      title: 'Amritsar Heritage House',
      city: 'amritsar',
      rooms: 4,
      beds: 4,
      baths: 3,
      sqft: '2,500',
      price: '₹55,000/month',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
      address: '12 Heritage Street, Amritsar, Punjab',
      phone: '+91 98765-43217'
    },
    {
      id: 9,
      title: 'Jalandhar Executive Suite',
      city: 'jalandhar',
      rooms: 1,
      beds: 1,
      baths: 1,
      sqft: '800',
      price: '₹20,000/month',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop',
      address: '45 Executive Plaza, Jalandhar, Punjab',
      phone: '+91 98765-43218'
    },
    {
      id: 10,
      title: 'Mohali Garden Villa',
      city: 'mohali',
      rooms: 4,
      beds: 4,
      baths: 3,
      sqft: '2,800',
      price: '₹65,000/month',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop',
      address: '33 Garden Estate, Mohali, Punjab',
      phone: '+91 98765-43219'
    },
    {
      id: 11,
      title: 'Ludhiana Business Center',
      city: 'ludhiana',
      rooms: 3,
      beds: 3,
      baths: 2,
      sqft: '1,600',
      price: '₹38,000/month',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format&fit=crop',
      address: '67 Business Park, Ludhiana, Punjab',
      phone: '+91 98765-43220'
    },
    {
      id: 12,
      title: 'Amritsar Golden Temple View',
      city: 'amritsar',
      rooms: 2,
      beds: 2,
      baths: 2,
      sqft: '1,300',
      price: '₹32,000/month',
      image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2070&auto=format&fit=crop',
      address: '89 Golden View, Amritsar, Punjab',
      phone: '+91 98765-43221'
    },
    {
      id: 13,
      title: 'Jalandhar Sports Complex',
      city: 'jalandhar',
      rooms: 5,
      beds: 5,
      baths: 4,
      sqft: '3,200',
      price: '₹75,000/month',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
      address: '156 Sports Avenue, Jalandhar, Punjab',
      phone: '+91 98765-43222'
    },
    {
      id: 14,
      title: 'Mohali IT Hub Apartment',
      city: 'mohali',
      rooms: 2,
      beds: 2,
      baths: 2,
      sqft: '1,100',
      price: '₹30,000/month',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop',
      address: '234 IT Park, Mohali, Punjab',
      phone: '+91 98765-43223'
    },
    {
      id: 15,
      title: 'Ludhiana Textile District',
      city: 'ludhiana',
      rooms: 3,
      beds: 3,
      baths: 2,
      sqft: '1,800',
      price: '₹40,000/month',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format&fit=crop',
      address: '345 Textile Market, Ludhiana, Punjab',
      phone: '+91 98765-43224'
    },
    {
      id: 16,
      title: 'Amritsar Airport View',
      city: 'amritsar',
      rooms: 4,
      beds: 4,
      baths: 3,
      sqft: '2,200',
      price: '₹48,000/month',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop',
      address: '456 Airport Road, Amritsar, Punjab',
      phone: '+91 98765-43225'
    },
    {
      id: 17,
      title: 'Jalandhar University Area',
      city: 'jalandhar',
      rooms: 1,
      beds: 1,
      baths: 1,
      sqft: '700',
      price: '₹15,000/month',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop',
      address: '567 University Road, Jalandhar, Punjab',
      phone: '+91 98765-43226'
    },
    {
      id: 18,
      title: 'Mohali Golf Course Villa',
      city: 'mohali',
      rooms: 6,
      beds: 6,
      baths: 5,
      sqft: '5,000',
      price: '₹120,000/month',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format&fit=crop',
      address: '678 Golf Course Road, Mohali, Punjab',
      phone: '+91 98765-43227'
    }
  ];

  // Initialize filters from URL parameters
  useEffect(() => {
    const cityParam = searchParams.get('city');
    const roomParam = searchParams.get('room');
    const pageParam = searchParams.get('page');
    
    if (cityParam || roomParam || pageParam) {
      setSearchFilters({
        city: cityParam || '',
        rooms: roomParam || ''
      });
      setCurrentPage(parseInt(pageParam) || 1);
    }
  }, [searchParams]);

  // Filter properties based on search criteria
  useEffect(() => {
    let filtered = allProperties;
    
    if (searchFilters.city) {
      filtered = filtered.filter(property => property.city === searchFilters.city);
    }
    
    if (searchFilters.rooms) {
      filtered = filtered.filter(property => property.rooms >= parseInt(searchFilters.rooms));
    }
    
    setFilteredProperties(filtered);
    
    // Update results display
    let titleText = '';
    if (searchFilters.city && searchFilters.rooms) {
      titleText = `Properties in ${searchFilters.city.charAt(0).toUpperCase() + searchFilters.city.slice(1)} with ${searchFilters.rooms}+ Rooms`;
    } else if (searchFilters.city) {
      titleText = `Properties in ${searchFilters.city.charAt(0).toUpperCase() + searchFilters.city.slice(1)}`;
    } else if (searchFilters.rooms) {
      titleText = `Properties with ${searchFilters.rooms}+ Rooms`;
    } else {
      titleText = 'All Properties';
    }
    
    setResultsTitle(titleText);
    setResultsCount(filtered.length);
  }, [searchFilters]);

  // Calculate pagination
  useEffect(() => {
    const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
    const startIndex = (currentPage - 1) * propertiesPerPage;
    const endIndex = startIndex + propertiesPerPage;
    
    const currentProperties = filteredProperties.slice(startIndex, endIndex);
    setDisplayedProperties(currentProperties);
  }, [filteredProperties, currentPage]);

  // Handle search form submission
  const handleSearch = () => {
    const newParams = new URLSearchParams();
    if (searchFilters.city) newParams.set('city', searchFilters.city);
    if (searchFilters.rooms) newParams.set('rooms', searchFilters.rooms);
    if (currentPage > 1) newParams.set('page', currentPage.toString());
    
    setSearchParams(newParams);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setSearchFilters({ city: '', rooms: '' });
    setCurrentPage(1);
    setSearchParams({});
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', page.toString());
    setSearchParams(newParams);
  };

  // Handle booking
  const handleBooking = (property) => {
    // Store property details for booking
    localStorage.setItem('selectedProperty', JSON.stringify(property));
    navigate('/booking');
  };

  // Handle add to favorites
  const handleAddToFavorites = (property) => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isAlreadyFavorite = favorites.some(fav => fav.id === property.id);
    
    if (!isAlreadyFavorite) {
      const favoriteProperty = {
        id: property.id,
        title: property.title,
        imgSrc: property.image,
        imgAlt: property.title,
        beds: `${property.beds} Bed${property.beds > 1 ? 's' : ''}`,
        baths: `${property.baths} Bath${property.baths > 1 ? 's' : ''}`,
        sqft: `${property.sqft} sqft`,
        price: property.price,
        location: property.address
      };
      
      favorites.push(favoriteProperty);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      
      // Show success message
      alert('Property added to favorites!');
    } else {
      alert('Property is already in your favorites!');
    }
  };

  // Calculate pagination info
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);
  const startIndex = (currentPage - 1) * propertiesPerPage;
  const endIndex = Math.min(startIndex + propertiesPerPage, filteredProperties.length);

  return (
    <>
      <Header />
      
      <main>
        <section className="page-hero" style={{
          padding: '60px 20px',
          textAlign: 'center',
          color: 'var(--light-text)',
          background: 'var(--dark-bg-gradient)'
        }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '700' }}>Explore Our Properties</h1>
        </section>
        
        {/* Search Section */}
        <section className="search-section" style={{
          padding: '40px 0',
          background: '#fff',
          borderBottom: '1px solid #eee'
        }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div className="search-box" style={{
              textAlign: 'center',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <h2 style={{
                fontSize: '1.8rem',
                marginBottom: '25px',
                color: 'var(--dark-bg)'
              }}>
                Search Properties by City & Room Number
              </h2>
              
              <div className="search-form" style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'center',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginBottom: '20px'
              }}>
                <select 
                  value={searchFilters.city}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, city: e.target.value }))}
                  className="city-select"
                  style={{
                    padding: '12px 16px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontFamily: "'Poppins', sans-serif",
                    minWidth: '180px',
                    background: '#fff',
                    transition: 'border-color 0.3s ease'
                  }}
                >
                  <option value="">Select a city</option>
                  <option value="mohali">Mohali</option>
                  <option value="ludhiana">Ludhiana</option>
                  <option value="amritsar">Amritsar</option>
                  <option value="jalandhar">Jalandhar</option>
                </select>
                
                <select 
                  value={searchFilters.rooms}
                  onChange={(e) => setSearchFilters(prev => ({ ...prev, rooms: e.target.value }))}
                  className="room-select"
                  style={{
                    padding: '12px 16px',
                    border: '2px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontFamily: "'Poppins', sans-serif",
                    minWidth: '180px',
                    background: '#fff',
                    transition: 'border-color 0.3s ease'
                  }}
                >
                  <option value="">Select room number</option>
                  <option value="1">1 Room</option>
                  <option value="2">2 Rooms</option>
                  <option value="3">3 Rooms</option>
                  <option value="4">4 Rooms</option>
                  <option value="5">5+ Rooms</option>
                </select>
                
                <button 
                  onClick={handleSearch}
                  className="search-btn"
                  style={{
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'opacity 0.3s ease, transform 0.2s ease',
                    background: 'var(--primary-gradient)',
                    color: '#fff'
                  }}
                >
                  Search Properties
                </button>
                
                <button 
                  onClick={handleClearFilters}
                  className="clear-btn"
                  style={{
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'opacity 0.3s ease, transform 0.2s ease',
                    background: '#6c757d',
                    color: '#fff'
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
            
            <div className="search-results" style={{
              textAlign: 'center',
              marginTop: '20px'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '10px',
                color: 'var(--dark-bg)'
              }}>
                {resultsTitle}
              </h3>
              <p style={{
                color: '#666',
                fontSize: '1rem'
              }}>
                {resultsCount} properties found
              </p>
            </div>
          </div>
        </section>
        
        {/* Listings Section */}
        <section className="listings-section" style={{ padding: '80px 0' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div className="listings-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '30px'
            }}>
              {displayedProperties.map((property) => (
                <div 
                  key={property.id}
                  className="property-card"
                  style={{
                    background: '#fff',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.08)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    position: 'relative'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  <img 
                    src={property.image} 
                    alt={property.title}
                    style={{
                      width: '100%',
                      height: '220px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                  
                  {/* Address overlay on hover */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(0, 0, 0, 0.85)',
                    color: '#fff',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    lineHeight: '1.4',
                    opacity: '0',
                    transform: 'translateY(6px)',
                    transition: 'opacity 0.25s ease, transform 0.25s ease',
                    zIndex: 2,
                    pointerEvents: 'none',
                    maxWidth: 'calc(100% - 24px)',
                    whiteSpace: 'pre-line',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {property.address}
                    {'\n'}{property.phone}
                  </div>
                  
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
                        <i className="fas fa-bed" style={{ marginRight: '5px', color: 'var(--dark-bg)' }}></i>
                        {property.beds} Bed{property.beds > 1 ? 's' : ''}
                      </span>
                      <span>
                        <i className="fas fa-bath" style={{ marginRight: '5px', color: 'var(--dark-bg)' }}></i>
                        {property.baths} Bath{property.baths > 1 ? 's' : ''}
                      </span>
                      <span>
                        <i className="fas fa-ruler-combined" style={{ marginRight: '5px', color: 'var(--dark-bg)' }}></i>
                        {property.sqft} sqft
                      </span>
                    </div>
                    
                    <div className="card-footer">
                      <h3 style={{
                        fontSize: '1.25rem',
                        marginBottom: '5px',
                        color: 'var(--dark-text)'
                      }}>
                        {property.title}
                      </h3>
                      <p className="price" style={{
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        color: 'var(--primary-color)',
                        margin: '0 0 10px 0'
                      }}>
                        {property.price}
                      </p>
                      
                      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <button 
                          onClick={() => handleBooking(property)}
                          className="book-btn"
                          style={{
                            flex: 1,
                            padding: '8px 16px',
                            background: 'var(--primary-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'background 0.3s ease'
                          }}
                        >
                          Book Now
                        </button>
                        
                        <button 
                          onClick={() => handleAddToFavorites(property)}
                          style={{
                            padding: '8px 12px',
                            background: '#fff',
                            color: 'var(--primary-color)',
                            border: '2px solid var(--primary-color)',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title="Add to Favorites"
                        >
                          <i className="fas fa-heart"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '60px',
                gap: '10px'
              }}>
                {/* Previous button */}
                {currentPage > 1 && (
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    style={{
                      padding: '10px 18px',
                      borderRadius: '5px',
                      color: 'var(--dark-bg)',
                      background: '#fff',
                      border: '1px solid #ddd',
                      fontWeight: '500',
                      transition: 'background 0.3s ease, color 0.3s ease',
                      cursor: 'pointer'
                    }}
                  >
                    &laquo;
                  </button>
                )}
                
                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    style={{
                      padding: '10px 18px',
                      borderRadius: '5px',
                      color: currentPage === page ? '#fff' : 'var(--dark-bg)',
                      background: currentPage === page ? 'var(--primary-color)' : '#fff',
                      border: `1px solid ${currentPage === page ? 'var(--primary-color)' : '#ddd'}`,
                      fontWeight: '500',
                      transition: 'background 0.3s ease, color 0.3s ease',
                      cursor: 'pointer'
                    }}
                  >
                    {page}
                  </button>
                ))}
                
                {/* Next button */}
                {currentPage < totalPages && (
                  <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    style={{
                      padding: '10px 18px',
                      borderRadius: '5px',
                      color: 'var(--dark-bg)',
                      background: '#fff',
                      border: '1px solid #ddd',
                      fontWeight: '500',
                      transition: 'background 0.3s ease, color 0.3s ease',
                      cursor: 'pointer'
                    }}
                  >
                    &raquo;
                  </button>
                )}
              </div>
            )}
            
            {/* Pagination info */}
            <div style={{
              textAlign: 'center',
              marginTop: '20px',
              color: '#666',
              fontSize: '0.9rem'
            }}>
              Showing {startIndex + 1}-{endIndex} of {filteredProperties.length} properties
            </div>
          </div>
        </section>
      </main>
      
      <Footer />

      <style jsx>{`
        :root {
          --primary-color: #d90429;
          --primary-gradient: linear-gradient(45deg, #d90429, #ef233c);
          --dark-bg: #2b2d42;
          --dark-bg-gradient: linear-gradient(90deg, #2b2d42, #4a4e69);
          --light-text: #edf2f4;
          --dark-text: #333;
          --secondary-bg: #f8f9fa;
        }

        body {
          font-family: 'Poppins', sans-serif;
          line-height: 1.6;
          color: var(--dark-text);
          background-color: var(--secondary-bg);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .page-hero {
          padding: 60px 20px;
          text-align: center;
          color: var(--light-text);
          background: var(--dark-bg-gradient);
        }

        .page-hero h1 {
          font-size: 3rem;
          font-weight: 700;
        }

        .search-section {
          padding: 40px 0;
          background: #fff;
          border-bottom: 1px solid #eee;
        }

        .search-box {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }

        .search-box h2 {
          font-size: 1.8rem;
          margin-bottom: 25px;
          color: var(--dark-bg);
        }

        .search-form {
          display: flex;
          gap: 15px;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .city-select, .room-select {
          padding: 12px 16px;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          font-family: 'Poppins', sans-serif;
          min-width: 180px;
          background: #fff;
          transition: border-color 0.3s ease;
        }

        .city-select:focus, .room-select:focus {
          outline: none;
          border-color: var(--primary-color);
        }

        .search-btn, .clear-btn {
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.3s ease, transform 0.2s ease;
        }

        .search-btn {
          background: var(--primary-gradient);
          color: #fff;
        }

        .clear-btn {
          background: #6c757d;
          color: #fff;
        }

        .search-btn:hover, .clear-btn:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }

        .search-results {
          text-align: center;
          margin-top: 20px;
        }

        .search-results h3 {
          font-size: 1.5rem;
          margin-bottom: 10px;
          color: var(--dark-bg);
        }

        .search-results p {
          color: #666;
          font-size: 1rem;
        }

        .listings-section {
          padding: 80px 0;
        }

        .listings-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
        }

        .property-card {
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
        }

        .property-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        }

        .property-card img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
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
          color: var(--dark-bg);
        }

        .card-footer h3 {
          font-size: 1.25rem;
          margin-bottom: 5px;
          color: var(--dark-text);
        }

        .card-footer .price {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--primary-color);
        }

        .book-btn {
          display: inline-block;
          margin-top: 8px;
          padding: 8px 16px;
          background: var(--primary-color);
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .book-btn:hover {
          background: #b0020f;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 60px;
          gap: 10px;
        }

        .pagination button {
          padding: 10px 18px;
          border-radius: 5px;
          color: var(--dark-bg);
          background: #fff;
          border: 1px solid #ddd;
          font-weight: 500;
          transition: background 0.3s ease, color 0.3s ease;
          cursor: pointer;
        }

        .pagination button:hover {
          color: #fff;
          background: var(--primary-color);
          border-color: var(--primary-color);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .search-form {
            flex-direction: column;
            align-items: stretch;
          }
          
          .city-select, .room-select {
            min-width: auto;
          }
          
          .listings-grid {
            grid-template-columns: 1fr;
          }
          
          .page-hero h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
}
