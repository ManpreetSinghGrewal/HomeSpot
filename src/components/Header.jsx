
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

export default function Header() {
  const { user, logout: logoutUser } = useUser();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const location = useLocation();

  useEffect(() => {
    function onDoc(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const logout = (e) => {
    e.preventDefault();
    logoutUser();
    setOpen(false);
  };

  const initials = user ? (user.username || 'U').split(' ').map(s => s[0]).join('').slice(0,2).toUpperCase() : null;

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src="/logo.png" alt="HomeSpot Logo" />
            <span>HomeSpot</span>
          </Link>
        </div>
        <nav>
          <ul>
            <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
            <li><Link to="/about" className={isActive('/about') ? 'active' : ''}>About Us</Link></li>
            <li><Link to="/services" className={isActive('/services') ? 'active' : ''}>Services</Link></li>
            <li><Link to="/faq" className={isActive('/faq') ? 'active' : ''}>FAQ</Link></li>
            <li><Link to="/listings" className={isActive('/listings') ? 'active' : ''}>Listings</Link></li>
            <li><Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link></li>
            <li style={{position:'relative'}} ref={dropdownRef}>
              {user ? (
                <a href="#" onClick={(e)=>{e.preventDefault(); setOpen(o=>!o)}} aria-haspopup="true" aria-expanded={open} id="loginLink">
                  <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:40,height:40,borderRadius:'50%',background: open ? 'var(--primary-color)' : 'transparent', color: open ? '#fff' : 'var(--dark-bg)'}}>{initials}</span>
                </a>
              ) : (
                <Link to="/login" id="loginLink"><i className="fas fa-user"></i> <span id="loginText">Log in</span></Link>
              )}

              {user && (
                <div className={`profile-dropdown ${open ? 'show' : ''}`} id="profileDropdown">
                  <div style={{padding:'12px 16px',borderBottom:'1px solid #f0f0f0',textAlign:'left'}}>
                    <strong id="profileName">{user.username || 'Account'}</strong>
                    <small id="profileEmail" style={{display:'block',color:'#666'}}>{user.email || ''}</small>
                  </div>
                  <Link to="/profile" className={isActive('/profile') ? 'active' : ''}>Profile</Link>
                  <Link to="/favorites" className={isActive('/favorites') ? 'active' : ''}><i className="fas fa-heart" style={{marginRight:8}}></i> Favorites</Link>
                  <Link to="/profile#bookingHistory" className={isActive('/profile') ? 'active' : ''}><i className="fas fa-history" style={{marginRight:8}}></i> History</Link>
                  <a href="#" className="signout-btn" onClick={logout}><i className="fas fa-sign-out-alt" style={{marginRight:8}}></i> Sign Out</a>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
