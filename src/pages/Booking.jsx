import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Booking() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    moveInDate: '',
    duration: '12',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Load selected property from localStorage
    const selectedProperty = localStorage.getItem('selectedProperty');
    if (selectedProperty) {
      setProperty(JSON.parse(selectedProperty));
    } else {
      navigate('/listings');
    }

    // Pre-fill user data
    if (user) {
      setBookingData(prev => ({
        ...prev,
        name: user.username || '',
        email: user.email || ''
      }));
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate booking process
    setTimeout(() => {
      // Save booking to history
      const bookingHistory = JSON.parse(localStorage.getItem('bookingHistory')) || [];
      const newBooking = {
        id: Date.now(),
        propertyName: property.title,
        propertyLocation: property.address,
        amount: property.price,
        bookingDate: new Date().toISOString(),
        status: 'Pending',
        moveInDate: bookingData.moveInDate,
        duration: bookingData.duration
      };
      
      bookingHistory.push(newBooking);
      localStorage.setItem('bookingHistory', JSON.stringify(bookingHistory));

      setLoading(false);
      alert('Booking request submitted successfully! We will contact you soon.');
      navigate('/profile');
    }, 2000);
  };

  if (!property) {
    return (
      <>
        <Header />
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p>Loading property details...</p>
        </div>
        <Footer />
      </>
    );
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
          <h1>Book Your Property</h1>
          <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>Complete your booking request</p>
        </section>

        <section className="booking-section" style={{ padding: '80px 0' }}>
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
              
              {/* Property Details */}
              <div className="property-details">
                <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: '#2b2d42' }}>Property Details</h2>
                <div style={{
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
                      height: '250px',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{ padding: '30px' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#2b2d42' }}>
                      {property.title}
                    </h3>
                    <div style={{
                      display: 'flex',
                      gap: '20px',
                      marginBottom: '15px',
                      color: '#666',
                      fontSize: '0.9rem'
                    }}>
                      <span>
                        <i className="fas fa-bed" style={{ marginRight: '5px', color: '#2b2d42' }}></i>
                        {property.beds} Bed{property.beds > 1 ? 's' : ''}
                      </span>
                      <span>
                        <i className="fas fa-bath" style={{ marginRight: '5px', color: '#2b2d42' }}></i>
                        {property.baths} Bath{property.baths > 1 ? 's' : ''}
                      </span>
                      <span>
                        <i className="fas fa-ruler-combined" style={{ marginRight: '5px', color: '#2b2d42' }}></i>
                        {property.sqft} sqft
                      </span>
                    </div>
                    <p style={{ color: '#666', marginBottom: '15px' }}>{property.address}</p>
                    <p style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: '600', 
                      color: '#d90429',
                      margin: '0'
                    }}>
                      {property.price}
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <div className="booking-form">
                <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: '#2b2d42' }}>Booking Information</h2>
                <form onSubmit={handleSubmit} style={{
                  background: '#fff',
                  padding: '40px',
                  borderRadius: '12px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                }}>
                  <div style={{ marginBottom: '25px' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '600',
                      color: '#2b2d42'
                    }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={bookingData.name}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        transition: 'border-color 0.3s ease'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '25px' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '600',
                      color: '#2b2d42'
                    }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        transition: 'border-color 0.3s ease'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '25px' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '600',
                      color: '#2b2d42'
                    }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        transition: 'border-color 0.3s ease'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '25px' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '600',
                      color: '#2b2d42'
                    }}>
                      Preferred Move-in Date *
                    </label>
                    <input
                      type="date"
                      name="moveInDate"
                      value={bookingData.moveInDate}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        transition: 'border-color 0.3s ease'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '25px' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '600',
                      color: '#2b2d42'
                    }}>
                      Rental Duration (months) *
                    </label>
                    <select
                      name="duration"
                      value={bookingData.duration}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        transition: 'border-color 0.3s ease'
                      }}
                    >
                      <option value="6">6 months</option>
                      <option value="12">12 months</option>
                      <option value="18">18 months</option>
                      <option value="24">24 months</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '30px' }}>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '600',
                      color: '#2b2d42'
                    }}>
                      Additional Message
                    </label>
                    <textarea
                      name="message"
                      value={bookingData.message}
                      onChange={handleInputChange}
                      rows="4"
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #e0e0e0',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        resize: 'vertical',
                        transition: 'border-color 0.3s ease'
                      }}
                      placeholder="Any special requirements or questions..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '15px 30px',
                      background: loading ? '#ccc' : 'var(--primary-color)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'background 0.3s ease, transform 0.2s ease'
                    }}
                  >
                    {loading ? 'Submitting...' : 'Submit Booking Request'}
                  </button>
                </form>
              </div>
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

        .booking-section {
          padding: 80px 0;
          background: var(--secondary-bg);
        }

        input:focus, select:focus, textarea:focus {
          outline: none;
          border-color: var(--primary-color);
        }

        button:hover:not(:disabled) {
          background: #a1031d;
          transform: translateY(-2px);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .container > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          
          .page-hero h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
}
