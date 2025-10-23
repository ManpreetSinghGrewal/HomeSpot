import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Landlord() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProperty, setNewProperty] = useState({
    title: '',
    city: '',
    rooms: '',
    beds: '',
    baths: '',
    sqft: '',
    price: '',
    address: '',
    phone: '',
    description: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const role = localStorage.getItem('role');
    if (role !== 'landlord') {
      navigate('/');
      return;
    }

    // Load landlord's properties
    const landlordProperties = JSON.parse(localStorage.getItem('landlordProperties')) || [];
    setProperties(landlordProperties);
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProperty = (e) => {
    e.preventDefault();
    
    const property = {
      id: Date.now(),
      ...newProperty,
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2070&auto=format&fit=crop'
    };

    const updatedProperties = [...properties, property];
    setProperties(updatedProperties);
    localStorage.setItem('landlordProperties', JSON.stringify(updatedProperties));

    // Reset form
    setNewProperty({
      title: '',
      city: '',
      rooms: '',
      beds: '',
      baths: '',
      sqft: '',
      price: '',
      address: '',
      phone: '',
      description: ''
    });
    setShowAddForm(false);
    alert('Property added successfully!');
  };

  const handleDeleteProperty = (id) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      const updatedProperties = properties.filter(prop => prop.id !== id);
      setProperties(updatedProperties);
      localStorage.setItem('landlordProperties', JSON.stringify(updatedProperties));
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      
      <main>
        <section className="page-hero" style={{
          padding: '60px 20px',
          textAlign: 'center',
          color: '#edf2f4',
          background: 'linear-gradient(90deg, #2b2d42, #4a4e69)'
        }}>
          <h1>Landlord Dashboard</h1>
          <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>Manage your properties</p>
        </section>

        <section className="dashboard-section" style={{ padding: '80px 0' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            
            {/* Dashboard Stats */}
            <div className="stats-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px',
              marginBottom: '50px'
            }}>
              <div style={{
                background: '#fff',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <h3 style={{ fontSize: '2.5rem', color: '#d90429', marginBottom: '10px' }}>
                  {properties.length}
                </h3>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>Total Properties</p>
              </div>
              <div style={{
                background: '#fff',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <h3 style={{ fontSize: '2.5rem', color: '#28a745', marginBottom: '10px' }}>
                  {properties.filter(p => p.status === 'rented').length}
                </h3>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>Rented Properties</p>
              </div>
              <div style={{
                background: '#fff',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                textAlign: 'center'
              }}>
                <h3 style={{ fontSize: '2.5rem', color: '#ffc107', marginBottom: '10px' }}>
                  {properties.filter(p => p.status !== 'rented').length}
                </h3>
                <p style={{ color: '#666', fontSize: '1.1rem' }}>Available Properties</p>
              </div>
            </div>

            {/* Add Property Button */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                style={{
                  padding: '15px 30px',
                  background: 'var(--primary-color)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease'
                }}
              >
                {showAddForm ? 'Cancel' : '+ Add New Property'}
              </button>
            </div>

            {/* Add Property Form */}
            {showAddForm && (
              <div style={{
                background: '#fff',
                padding: '40px',
                borderRadius: '12px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                marginBottom: '40px'
              }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '30px', color: '#2b2d42' }}>
                  Add New Property
                </h2>
                <form onSubmit={handleAddProperty}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2b2d42' }}>
                        Property Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={newProperty.title}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px 15px',
                          border: '2px solid #e0e0e0',
                          borderRadius: '6px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2b2d42' }}>
                        City *
                      </label>
                      <select
                        name="city"
                        value={newProperty.city}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '12px 15px',
                          border: '2px solid #e0e0e0',
                          borderRadius: '6px',
                          fontSize: '1rem'
                        }}
                      >
                        <option value="">Select City</option>
                        <option value="mohali">Mohali</option>
                        <option value="ludhiana">Ludhiana</option>
                        <option value="amritsar">Amritsar</option>
                        <option value="jalandhar">Jalandhar</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2b2d42' }}>
                        Rooms *
                      </label>
                      <input
                        type="number"
                        name="rooms"
                        value={newProperty.rooms}
                        onChange={handleInputChange}
                        required
                        min="1"
                        style={{
                          width: '100%',
                          padding: '12px 15px',
                          border: '2px solid #e0e0e0',
                          borderRadius: '6px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2b2d42' }}>
                        Beds *
                      </label>
                      <input
                        type="number"
                        name="beds"
                        value={newProperty.beds}
                        onChange={handleInputChange}
                        required
                        min="1"
                        style={{
                          width: '100%',
                          padding: '12px 15px',
                          border: '2px solid #e0e0e0',
                          borderRadius: '6px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2b2d42' }}>
                        Baths *
                      </label>
                      <input
                        type="number"
                        name="baths"
                        value={newProperty.baths}
                        onChange={handleInputChange}
                        required
                        min="1"
                        step="0.5"
                        style={{
                          width: '100%',
                          padding: '12px 15px',
                          border: '2px solid #e0e0e0',
                          borderRadius: '6px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2b2d42' }}>
                        Square Feet *
                      </label>
                      <input
                        type="text"
                        name="sqft"
                        value={newProperty.sqft}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., 1,200"
                        style={{
                          width: '100%',
                          padding: '12px 15px',
                          border: '2px solid #e0e0e0',
                          borderRadius: '6px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2b2d42' }}>
                        Monthly Rent *
                      </label>
                      <input
                        type="text"
                        name="price"
                        value={newProperty.price}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., ₹25,000/month"
                        style={{
                          width: '100%',
                          padding: '12px 15px',
                          border: '2px solid #e0e0e0',
                          borderRadius: '6px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2b2d42' }}>
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={newProperty.address}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '6px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2b2d42' }}>
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={newProperty.phone}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '6px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#2b2d42' }}>
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={newProperty.description}
                      onChange={handleInputChange}
                      rows="4"
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        resize: 'vertical'
                      }}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    style={{
                      padding: '15px 30px',
                      background: 'var(--primary-color)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background 0.3s ease'
                    }}
                  >
                    Add Property
                  </button>
                </form>
              </div>
            )}

            {/* Properties List */}
            <div className="properties-section">
              <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: '#2b2d42' }}>
                Your Properties
              </h2>
              
              {properties.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  background: '#fff',
                  borderRadius: '12px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                }}>
                  <i className="fas fa-home" style={{ fontSize: '4rem', color: '#d90429', marginBottom: '20px' }}></i>
                  <h3 style={{ color: '#666', marginBottom: '10px' }}>No Properties Yet</h3>
                  <p style={{ color: '#888', marginBottom: '20px' }}>
                    Add your first property to start managing your rental business
                  </p>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                  gap: '30px'
                }}>
                  {properties.map((property) => (
                    <div key={property.id} style={{
                      background: '#fff',
                      borderRadius: '12px',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                      overflow: 'hidden'
                    }}>
                      <img 
                        src={property.image} 
                        alt={property.title}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover'
                        }}
                      />
                      <div style={{ padding: '25px' }}>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', color: '#2b2d42' }}>
                          {property.title}
                        </h3>
                        <div style={{
                          display: 'flex',
                          gap: '15px',
                          marginBottom: '15px',
                          color: '#666',
                          fontSize: '0.9rem'
                        }}>
                          <span>
                            <i className="fas fa-bed" style={{ marginRight: '5px' }}></i>
                            {property.beds} Bed{property.beds > 1 ? 's' : ''}
                          </span>
                          <span>
                            <i className="fas fa-bath" style={{ marginRight: '5px' }}></i>
                            {property.baths} Bath{property.baths > 1 ? 's' : ''}
                          </span>
                          <span>
                            <i className="fas fa-ruler-combined" style={{ marginRight: '5px' }}></i>
                            {property.sqft} sqft
                          </span>
                        </div>
                        <p style={{ color: '#666', marginBottom: '10px', fontSize: '0.9rem' }}>
                          {property.address}
                        </p>
                        <p style={{ 
                          fontSize: '1.2rem', 
                          fontWeight: '600', 
                          color: '#d90429',
                          marginBottom: '20px'
                        }}>
                          {property.price}
                        </p>
                        <button
                          onClick={() => handleDeleteProperty(property.id)}
                          style={{
                            padding: '8px 16px',
                            background: '#dc3545',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'background 0.3s ease'
                          }}
                        >
                          Delete Property
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
          --light-text: #edf2f4;
          --dark-text: #333;
          --secondary-bg: #f8f9fa;
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
          background: linear-gradient(90deg, #2b2d42, #4a4e69);
        }

        .page-hero h1 {
          font-size: 3rem;
          font-weight: 700;
        }

        .dashboard-section {
          padding: 80px 0;
          background: var(--secondary-bg);
        }

        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: var(--primary-color);
        }

        button:hover {
          opacity: 0.9;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
          
          form > div {
            grid-template-columns: 1fr !important;
          }
          
          .page-hero h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
}
