import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  
  // State for profile data - load from localStorage
  const [profileData, setProfileData] = useState(() => {
    const stored = localStorage.getItem('profileData');
    return stored ? JSON.parse(stored) : {
      username: localStorage.getItem('currentUser') || 'User',
      email: 'user@example.com',
      phone: '+1 234 567 8901',
      address: '123 Main St, City, Country',
      bio: 'Passionate about building beautiful and functional web experiences. Loves coding, coffee, and travel.',
      profileImage: ''
    };
  });
  
  // State for email editing
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailInput, setEmailInput] = useState(profileData.email);
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');

  // Save profile data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('profileData', JSON.stringify(profileData));
  }, [profileData]);

  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (!user) {
      navigate('/');
    }
  }, [navigate]);

  const handleEmailChange = () => {
    if (!emailInput.includes('@')) {
      setEmailError('Invalid email format');
      return;
    }
    setProfileData({ ...profileData, email: emailInput });
    setEmailError('');
    setEmailSuccess('Email updated successfully');
    setIsEditingEmail(false);
    setTimeout(() => setEmailSuccess(''), 3000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result;
        setProfileData({ ...profileData, profileImage: imageData });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('profileData');
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      <div className="profile-container">
        <div className="profile-image-section">
          <img src={profileData.profileImage || '/default-avatar.png'} alt="Profile" />
          <button onClick={() => fileInputRef.current?.click()}>Change Photo</button>
          <input ref={fileInputRef} type="file" hidden onChange={handleImageUpload} />
        </div>
        <div className="profile-info-section">
          <p><strong>Username:</strong> {profileData.username}</p>
          <p>
            <strong>Email:</strong> {profileData.email}
            <button onClick={() => { setIsEditingEmail(true); setEmailInput(profileData.email); }}>Edit</button>
          </p>
          {isEditingEmail && (
            <div className="email-edit">
              <input 
                type="email"
                value={emailInput} 
                onChange={(e) => { setEmailInput(e.target.value); setEmailError(''); }}
                placeholder="Enter new email"
              />
              <button onClick={handleEmailChange}>Save</button>
              <button onClick={() => setIsEditingEmail(false)}>Cancel</button>
              {emailError && <p className="error">{emailError}</p>}
              {emailSuccess && <p className="success">{emailSuccess}</p>}
            </div>
          )}
          <p><strong>Phone:</strong> {profileData.phone}</p>
          <p><strong>Address:</strong> {profileData.address}</p>
          <p><strong>Bio:</strong> {profileData.bio}</p>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </div>
  );
}
