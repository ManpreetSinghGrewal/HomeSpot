import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const fileInputRef = useRef();
  
  // State for profile data
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    profileImage: ''
  });
  
  // State for email editing
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');
  
  // State for booking history
  const [bookingHistory, setBookingHistory] = useState([]);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Load user data and booking history on component mount
  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    // Load profile data from localStorage
    const storedEmail = localStorage.getItem('email');
    const storedUsername = localStorage.getItem('username');
    const role = localStorage.getItem('role') || 'user';
    
    setProfileData(prev => ({
      ...prev,
      username: storedUsername || user.username || 'User',
      email: storedEmail || user.email || 'johndoe@example.com',
      bio: `Passionate about building beautiful and functional web experiences. Loves coding, coffee, and travel. (Role: ${role === 'landlord' ? 'Landlord' : 'User'})`
    }));

    // Load booking history
    const bookings = JSON.parse(localStorage.getItem('bookingHistory')) || [];
    setBookingHistory(bookings);

    // Validate email if exists
    if (storedEmail) {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.co\.in|yahoo\.com|outlook\.com|hotmail\.com|rediffmail\.com)$/i;
      if (!emailPattern.test(storedEmail)) {
        alert('Your account has an invalid email address. Please sign up again with a valid email from allowed domains: @gmail.com, @yahoo.co.in, @yahoo.com, @outlook.com, @hotmail.com, @rediffmail.com');
        logout();
        navigate('/');
      }
    }

    // Redirect landlords to their page
    if (role === 'landlord') {
      navigate('/landlord');
    }
  }, [user, navigate, logout]);

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileData(prev => ({
          ...prev,
          profileImage: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.co\.in|yahoo\.com|outlook\.com|hotmail\.com|rediffmail\.com)$/i;
    return emailRegex.test(email);
  };

  // Handle email editing
  const handleEditEmail = () => {
    setIsEditingEmail(true);
    setEmailInput(profileData.email);
    setEmailError('');
    setEmailSuccess('');
  };

  const handleCancelEmail = () => {
    setIsEditingEmail(false);
    setEmailInput('');
    setEmailError('');
    setEmailSuccess('');
  };

  const handleSaveEmail = () => {
    const newEmail = emailInput.trim();
    
    if (!newEmail) {
      setEmailError('Email is required.');
      return;
    }

    if (!validateEmail(newEmail)) {
      setEmailError('Please enter a valid email address. Allowed domains: @gmail.com, @yahoo.co.in, @yahoo.com, @outlook.com, @hotmail.com, @rediffmail.com');
      return;
    }

    // Save to localStorage and update state
    localStorage.setItem('email', newEmail);
    setProfileData(prev => ({ ...prev, email: newEmail }));
    setIsEditingEmail(false);
    setEmailError('');
    setEmailSuccess('Email updated successfully!');
    
    // Clear success message after 3 seconds
    setTimeout(() => setEmailSuccess(''), 3000);
  };

  // Handle email input change with real-time validation
  const handleEmailInputChange = (e) => {
    const value = e.target.value;
    setEmailInput(value);
    
    if (value && !validateEmail(value)) {
      e.target.style.borderColor = '#dc3545';
    } else {
      e.target.style.borderColor = '#ddd';
    }
  };

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle clear booking history
  const handleClearHistory = () => {
    if (showClearConfirm) {
      localStorage.removeItem('bookingHistory');
      setBookingHistory([]);
      setShowClearConfirm(false);
    } else {
      setShowClearConfirm(true);
    }
  };

  // Handle scroll to booking history
  const scrollToHistory = () => {
    const historyElement = document.getElementById('bookingHistory');
    if (historyElement) {
      historyElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <Header />
      
      <section className="page-hero">
        <div className="container">
          <h1>Your Profile</h1>
        </div>
      </section>

      <main className="profile-section">
        <div className="container">
          <div className="profile-card">
            <div className="profile-avatar">
              <img 
                src={profileData.profileImage || ''} 
                alt="Profile Image" 
                className="profile-img"
                style={{ background: profileData.profileImage ? 'none' : '#eee' }}
              />
              <input 
                type="file" 
                ref={fileInputRef}
                accept="image/*" 
                className="file-input"
                onChange={handleImageUpload}
              />
            </div>
            
            <div className="profile-details">
              <h2>{profileData.username}</h2>
              <p className="subtitle">Web Developer & Designer</p>
              
              <p className="info-row">
                <strong>Email:</strong> 
                <span>{profileData.email}</span>
                {!isEditingEmail && (
                  <button 
                    onClick={handleEditEmail}
                    style={{
                      marginLeft: '10px', 
                      padding: '4px 8px', 
                      fontSize: '0.8rem', 
                      background: 'var(--primary-color)', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px', 
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                )}
              </p>
              
              {isEditingEmail && (
                <div style={{ marginTop: '10px' }}>
                  <input 
                    type="email" 
                    value={emailInput}
                    onChange={handleEmailInputChange}
                    placeholder="Enter your email" 
                    style={{
                      padding: '8px', 
                      border: '1px solid #ddd', 
                      borderRadius: '4px', 
                      width: '200px'
                    }}
                  />
                  <button 
                    onClick={handleSaveEmail}
                    style={{
                      marginLeft: '10px', 
                      padding: '8px 12px', 
                      background: '#28a745', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px', 
                      cursor: 'pointer'
                    }}
                  >
                    Save
                  </button>
                  <button 
                    onClick={handleCancelEmail}
                    style={{
                      marginLeft: '5px', 
                      padding: '8px 12px', 
                      background: '#6c757d', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px', 
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  {emailError && (
                    <div style={{ color: '#dc3545', fontSize: '0.9rem', marginTop: '5px' }}>
                      {emailError}
                    </div>
                  )}
                  {emailSuccess && (
                    <div style={{ color: '#28a745', fontSize: '0.9rem', marginTop: '5px' }}>
                      {emailSuccess}
                    </div>
                  )}
                </div>
              )}
              
              <p className="info-row">
                <strong>Phone:</strong> {profileData.phone}
              </p>
              <p className="info-row">
                <strong>Address:</strong> {profileData.address}
              </p>

              <div className="section">
                <h3>Bio</h3>
                <p>{profileData.bio}</p>
              </div>
            </div>
          </div>

          {/* Booking History Section */}
          <div className="booking-history" id="bookingHistory">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ marginBottom: 0 }}>Booking History</h2>
              {bookingHistory.length > 0 && (
                <button 
                  onClick={handleClearHistory}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: showClearConfirm ? '#b91c1c' : '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background-color 0.2s'
                  }}
                >
                  <i className="fas fa-trash-alt"></i>
                  {showClearConfirm ? 'Confirm Clear' : 'Clear History'}
                </button>
              )}
            </div>
            
            <div className="booking-list">
              {bookingHistory.length === 0 ? (
                <div className="empty-state">
                  <i className="fas fa-history"></i>
                  <p>No booking history yet</p>
                </div>
              ) : (
                bookingHistory.map((booking, index) => (
                  <div key={index} className="booking-item">
                    <div className="booking-details">
                      <h3>{booking.propertyName}</h3>
                      <div className="booking-meta">
                        <p><i className="far fa-calendar"></i> Booked on {formatDate(booking.bookingDate)}</p>
                        <p><i className="fas fa-map-marker-alt"></i> {booking.propertyLocation}</p>
                        <p><i className="fas fa-rupee-sign"></i> {booking.amount}</p>
                      </div>
                    </div>
                    <div className={`booking-status status-${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

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
        
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        
        /* Page hero */
        .page-hero { 
          padding: 60px 20px; 
          text-align: center; 
          background: var(--primary-gradient); 
          color: #fff; 
        }
        .page-hero h1 { font-size: 2.5rem; }

        /* Profile card */
        .profile-section { padding: 60px 20px; background: var(--secondary-bg); }
        .profile-card {
          max-width: 720px; 
          margin: 0 auto; 
          background: #fff; 
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08); 
          padding: 32px; 
          display: grid; 
          grid-template-columns: 160px 1fr; 
          gap: 24px;
        }
        .profile-avatar { display: flex; flex-direction: column; align-items: center; }
        .profile-img { 
          width: 140px; 
          height: 140px; 
          border-radius: 50%; 
          border: 4px solid var(--primary-color); 
          background: #eee; 
          object-fit: cover; 
        }
        .file-input { margin-top: 12px; font-size: 0.9rem; }

        .profile-details h2 { margin-bottom: 6px; color: var(--dark-bg); }
        .subtitle { color: #666; margin-bottom: 12px; }
        .info-row { margin: 6px 0; }
        .info-row strong { color: var(--dark-bg); }
        .section { margin-top: 20px; }
        .section h3 { 
          margin-bottom: 8px; 
          color: var(--dark-bg); 
          border-bottom: 2px solid var(--primary-color); 
          padding-bottom: 6px; 
          font-size: 1.1rem; 
        }

        /* Booking History */
        .booking-history {
          margin-top: 40px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          padding: 24px;
        }
        .booking-history h2 {
          color: var(--dark-bg);
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid var(--primary-color);
        }
        .booking-list {
          display: grid;
          gap: 16px;
        }
        .booking-item {
          background: var(--secondary-bg);
          padding: 16px;
          border-radius: 8px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 16px;
        }
        .booking-details h3 {
          margin: 0 0 8px 0;
          color: var(--dark-bg);
        }
        .booking-meta {
          font-size: 0.9rem;
          color: #666;
        }
        .booking-status {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          text-align: center;
          align-self: center;
        }
        .status-completed { background: #bbf7d0; color: #166534; }
        .status-pending { background: #fef3c7; color: #92400e; }
        .status-cancelled { background: #fee2e2; color: #991b1b; }
        
        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 40px 20px;
          color: #666;
        }
        .empty-state i {
          font-size: 3rem;
          color: var(--primary-color);
          margin-bottom: 16px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .profile-card { grid-template-columns: 1fr; text-align: center; }
        }
      `}</style>
    </>
  );
}
attached screenshot , my code isnt giving me responsive part, make it responsive 
