import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Login() {
  const { user, login } = useUser();
  const navigate = useNavigate();
  
  // State for form toggle
  const [isSignIn, setIsSignIn] = useState(true);
  
  // State for signup form
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    role: 'user',
    password: '',
    confirmPassword: ''
  });
  
  // State for login form
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    role: 'user'
  });
  
  // State for form errors
  const [errors, setErrors] = useState({});
  
  // State for loading
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const role = localStorage.getItem('role') || 'user';
      navigate(role === 'landlord' ? '/landlord' : '/');
    }
  }, [user, navigate]);

  // Initialize form state
  useEffect(() => {
    setIsSignIn(true);
  }, []);

  // Toggle between sign-in and sign-up
  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setErrors({});
  };

  // Helper function to show errors
  const showError = (field, message) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  };

  // Clear specific error
  const clearError = (field) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  // Read users from localStorage
  const readUsers = () => {
    try {
      return JSON.parse(localStorage.getItem('users') || '[]');
    } catch (e) {
      return [];
    }
  };

  // Save users to localStorage
  const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  // Handle signup form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    let valid = true;
    const newErrors = {};

    // Clear previous errors
    setErrors({});

    // Username validation
    if (!signupData.username.trim()) {
      newErrors.username = 'Username is required.';
      valid = false;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.co\.in|yahoo\.com|outlook\.com|hotmail\.com|rediffmail\.com)$/i;
    if (!signupData.email.trim()) {
      newErrors.email = 'Email is required.';
      valid = false;
    } else if (!emailPattern.test(signupData.email.trim())) {
      newErrors.email = 'Allowed domains: @gmail.com, @yahoo.co.in, @yahoo.com, @outlook.com, @hotmail.com, @rediffmail.com';
      valid = false;
    }

    // Password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordPattern.test(signupData.password)) {
      newErrors.password = 'Password must be 8+ chars, include uppercase, lowercase, digit, and special character.';
      valid = false;
    }

    // Confirm password validation
    if (signupData.confirmPassword !== signupData.password) {
      newErrors.confirmPassword = 'Passwords do not match.';
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Check for duplicate username or email
    const users = readUsers();
    const usernameExists = users.some(u => u.username.toLowerCase() === signupData.username.trim().toLowerCase());
    const emailExists = users.some(u => u.email.toLowerCase() === signupData.email.trim().toLowerCase());
    
    if (usernameExists) {
      newErrors.username = 'Username already taken.';
      setErrors(newErrors);
      setLoading(false);
      return;
    }
    
    if (emailExists) {
      newErrors.email = 'An account with this email already exists.';
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Create user object
    const userObj = {
      username: signupData.username.trim(),
      email: signupData.email.trim(),
      role: signupData.role,
      password: btoa(signupData.password) // Light obfuscation
    };

    // Save user
    users.push(userObj);
    saveUsers(users);

    // Set current user and login
    const currentUser = { 
      username: userObj.username, 
      email: userObj.email, 
      role: userObj.role 
    };
    
    login(currentUser);
    
    // Set additional localStorage items
    localStorage.setItem('username', currentUser.username);
    localStorage.setItem('email', currentUser.email);
    localStorage.setItem('role', currentUser.role);

    setLoading(false);
    
    // Redirect based on role
    navigate(userObj.role === 'landlord' ? '/landlord' : '/profile');
  };

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    let valid = true;
    const newErrors = {};

    // Clear previous errors
    setErrors({});

    // Username validation
    if (!loginData.username.trim()) {
      newErrors.username = 'Username is required.';
      valid = false;
    }

    // Password validation
    if (!loginData.password) {
      newErrors.password = 'Password is required.';
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Check users
    const users = readUsers();
    if (!users.length) {
      alert('No accounts found. Please sign up first.');
      setLoading(false);
      return;
    }

    const found = users.find(u => u.username.toLowerCase() === loginData.username.trim().toLowerCase());
    if (!found) {
      newErrors.username = 'No account found with this username.';
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Compare password
    if (found.password !== btoa(loginData.password)) {
      newErrors.password = 'Invalid password.';
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Check role match
    if (found.role !== loginData.role) {
      newErrors.role = 'Selected role does not match registered role.';
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Successful login
    const currentUser = { 
      username: found.username, 
      email: found.email, 
      role: found.role 
    };
    
    login(currentUser);
    
    // Set additional localStorage items
    localStorage.setItem('username', currentUser.username);
    localStorage.setItem('email', currentUser.email);
    localStorage.setItem('role', currentUser.role);

    setLoading(false);
    
    // Redirect based on role
    navigate(found.role === 'landlord' ? '/landlord' : '/');
  };

  // Handle input changes
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
    clearError(name);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    clearError(name);
  };

  return (
    <>
      <Header />
      
      <main style={{
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 200px)',
        padding: '40px 20px',
        background: '#f8f9fa'
      }}>
        <div 
          className="login-container"
          style={{
            width: '100%',
            maxWidth: '800px',
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}
        >
          {/* FORM SECTION */}
          <div style={{
            display: 'flex',
            minHeight: '500px'
          }}>
            {/* SIGN UP */}
            {!isSignIn && (
              <div style={{
                width: '100%',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <div style={{
                  maxWidth: '400px',
                  margin: '0 auto',
                  width: '100%'
                }}>
                  <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Sign Up</h2>
                  <form onSubmit={handleSignup}>
                    <div className="input-group" style={{
                      position: 'relative',
                      width: '100%',
                      margin: '1rem 0'
                    }}>
                      <i className='bx bxs-user' style={{
                        position: 'absolute',
                        top: '50%',
                        left: '1rem',
                        transform: 'translateY(-50%)',
                        fontSize: '1.4rem',
                        color: 'var(--gray-2)'
                      }}></i>
                      <input 
                        type="text" 
                        name="username"
                        placeholder="Username" 
                        value={signupData.username}
                        onChange={handleSignupChange}
                        style={{
                          width: '100%',
                          padding: '1rem 3rem',
                          fontSize: '1rem',
                          backgroundColor: 'var(--gray)',
                          borderRadius: '.5rem',
                          border: errors.username ? '0.125rem solid #dc3545' : '0.125rem solid var(--white)',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                      {errors.username && (
                        <span style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>
                          {errors.username}
                        </span>
                      )}
                    </div>
                    
                    <div className="input-group" style={{
                      position: 'relative',
                      width: '100%',
                      margin: '1rem 0'
                    }}>
                      <i className='bx bx-mail-send' style={{
                        position: 'absolute',
                        top: '50%',
                        left: '1rem',
                        transform: 'translateY(-50%)',
                        fontSize: '1.4rem',
                        color: 'var(--gray-2)'
                      }}></i>
                      <input 
                        type="email" 
                        name="email"
                        placeholder="Email" 
                        value={signupData.email}
                        onChange={handleSignupChange}
                        style={{
                          width: '100%',
                          padding: '1rem 3rem',
                          fontSize: '1rem',
                          backgroundColor: 'var(--gray)',
                          borderRadius: '.5rem',
                          border: errors.email ? '0.125rem solid #dc3545' : '0.125rem solid var(--white)',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                      {errors.email && (
                        <span style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>
                          {errors.email}
                        </span>
                      )}
                    </div>
                    
                    <div className="input-group" style={{
                      position: 'relative',
                      width: '100%',
                      margin: '1rem 0'
                    }}>
                      <i className='bx bxs-user-detail' style={{
                        position: 'absolute',
                        top: '50%',
                        left: '1rem',
                        transform: 'translateY(-50%)',
                        fontSize: '1.4rem',
                        color: 'var(--gray-2)',
                        zIndex: 1
                      }}></i>
                      <select 
                        name="role"
                        value={signupData.role}
                        onChange={handleSignupChange}
                        style={{
                          width: '100%',
                          padding: '1rem 3rem',
                          backgroundColor: 'var(--gray)',
                          borderRadius: '.5rem',
                          border: '0.125rem solid var(--white)',
                          outline: 'none',
                          color: '#333',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="user">User</option>
                        <option value="landlord">Landlord</option>
                      </select>
                    </div>
                    
                    <div className="input-group" style={{
                      position: 'relative',
                      width: '100%',
                      margin: '1rem 0'
                    }}>
                      <i className='bx bxs-lock-alt' style={{
                        position: 'absolute',
                        top: '50%',
                        left: '1rem',
                        transform: 'translateY(-50%)',
                        fontSize: '1.4rem',
                        color: 'var(--gray-2)'
                      }}></i>
                      <input 
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        value={signupData.password}
                        onChange={handleSignupChange}
                        style={{
                          width: '100%',
                          padding: '1rem 3rem',
                          fontSize: '1rem',
                          backgroundColor: 'var(--gray)',
                          borderRadius: '.5rem',
                          border: errors.password ? '0.125rem solid #dc3545' : '0.125rem solid var(--white)',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                      {errors.password && (
                        <span style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>
                          {errors.password}
                        </span>
                      )}
                    </div>
                    
                    <div className="input-group" style={{
                      position: 'relative',
                      width: '100%',
                      margin: '1rem 0'
                    }}>
                      <i className='bx bxs-lock-alt' style={{
                        position: 'absolute',
                        top: '50%',
                        left: '1rem',
                        transform: 'translateY(-50%)',
                        fontSize: '1.4rem',
                        color: 'var(--gray-2)'
                      }}></i>
                      <input 
                        type="password" 
                        name="confirmPassword"
                        placeholder="Confirm password" 
                        value={signupData.confirmPassword}
                        onChange={handleSignupChange}
                        style={{
                          width: '100%',
                          padding: '1rem 3rem',
                          fontSize: '1rem',
                          backgroundColor: 'var(--gray)',
                          borderRadius: '.5rem',
                          border: errors.confirmPassword ? '0.125rem solid #dc3545' : '0.125rem solid var(--white)',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                      {errors.confirmPassword && (
                        <span style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>
                          {errors.confirmPassword}
                        </span>
                      )}
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={loading}
                      style={{
                        cursor: loading ? 'not-allowed' : 'pointer',
                        width: '100%',
                        padding: '.6rem 0',
                        borderRadius: '.5rem',
                        border: 'none',
                        backgroundColor: loading ? '#ccc' : 'var(--primary-color)',
                        color: 'var(--white)',
                        fontSize: '1.2rem',
                        outline: 'none'
                      }}
                    >
                      {loading ? 'Signing up...' : 'Sign up'}
                    </button>
                    
                    <p style={{ margin: '1rem 0', fontSize: '.9rem', textAlign: 'center' }}>
                      <span>Already have an account?</span>
                      <b 
                        onClick={toggleForm} 
                        style={{ cursor: 'pointer', marginLeft: '5px', color: 'var(--primary-color)' }}
                      >
                        Sign in here
                      </b>
                    </p>
                  </form>
                </div>
              </div>
            )}
            
            {/* SIGN IN */}
            {isSignIn && (
              <div style={{
                width: '100%',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}>
                <div style={{
                  maxWidth: '400px',
                  margin: '0 auto',
                  width: '100%'
                }}>
                  <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>Sign In</h2>
                  <form onSubmit={handleLogin}>
                    <div className="input-group" style={{
                      position: 'relative',
                      width: '100%',
                      margin: '1rem 0'
                    }}>
                      <i className='bx bxs-user' style={{
                        position: 'absolute',
                        top: '50%',
                        left: '1rem',
                        transform: 'translateY(-50%)',
                        fontSize: '1.4rem',
                        color: 'var(--gray-2)'
                      }}></i>
                      <input 
                        type="text" 
                        name="username"
                        placeholder="Username" 
                        value={loginData.username}
                        onChange={handleLoginChange}
                        style={{
                          width: '100%',
                          padding: '1rem 3rem',
                          fontSize: '1rem',
                          backgroundColor: 'var(--gray)',
                          borderRadius: '.5rem',
                          border: errors.username ? '0.125rem solid #dc3545' : '0.125rem solid var(--white)',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                      {errors.username && (
                        <span style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>
                          {errors.username}
                        </span>
                      )}
                    </div>
                    
                    <div className="input-group" style={{
                      position: 'relative',
                      width: '100%',
                      margin: '1rem 0'
                    }}>
                      <i className='bx bxs-lock-alt' style={{
                        position: 'absolute',
                        top: '50%',
                        left: '1rem',
                        transform: 'translateY(-50%)',
                        fontSize: '1.4rem',
                        color: 'var(--gray-2)'
                      }}></i>
                      <input 
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        value={loginData.password}
                        onChange={handleLoginChange}
                        style={{
                          width: '100%',
                          padding: '1rem 3rem',
                          fontSize: '1rem',
                          backgroundColor: 'var(--gray)',
                          borderRadius: '.5rem',
                          border: errors.password ? '0.125rem solid #dc3545' : '0.125rem solid var(--white)',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                      {errors.password && (
                        <span style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>
                          {errors.password}
                        </span>
                      )}
                    </div>
                    
                    <div className="input-group" style={{
                      position: 'relative',
                      width: '100%',
                      margin: '1rem 0'
                    }}>
                      <i className='bx bxs-user-detail' style={{
                        position: 'absolute',
                        top: '50%',
                        left: '1rem',
                        transform: 'translateY(-50%)',
                        fontSize: '1.4rem',
                        color: 'var(--gray-2)',
                        zIndex: 1
                      }}></i>
                      <select 
                        name="role"
                        value={loginData.role}
                        onChange={handleLoginChange}
                        style={{
                          width: '100%',
                          padding: '1rem 3rem',
                          backgroundColor: 'var(--gray)',
                          borderRadius: '.5rem',
                          border: errors.role ? '0.125rem solid #dc3545' : '0.125rem solid var(--white)',
                          outline: 'none',
                          color: '#333',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="user">User</option>
                        <option value="landlord">Landlord</option>
                      </select>
                      {errors.role && (
                        <span style={{ color: '#dc3545', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>
                          {errors.role}
                        </span>
                      )}
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={loading}
                      style={{
                        cursor: loading ? 'not-allowed' : 'pointer',
                        width: '100%',
                        padding: '.6rem 0',
                        borderRadius: '.5rem',
                        border: 'none',
                        backgroundColor: loading ? '#ccc' : 'var(--primary-color)',
                        color: 'var(--white)',
                        fontSize: '1.2rem',
                        outline: 'none'
                      }}
                    >
                      {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                    
                    <p style={{ margin: '1rem 0', fontSize: '.9rem', textAlign: 'center' }}>
                      <b style={{ color: 'var(--primary-color)' }}>Forgot password?</b>
                    </p>
                    
                    <p style={{ margin: '1rem 0', fontSize: '.9rem', textAlign: 'center' }}>
                      <span>Don't have an account?</span>
                      <b 
                        onClick={toggleForm} 
                        style={{ cursor: 'pointer', marginLeft: '5px', color: 'var(--primary-color)' }}
                      >
                        Sign up here
                      </b>
                    </p>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />

      <style jsx>{`
        :root {
          --primary-color: #c32b2b;
          --secondary-color: #b88857;
          --black: #000000;
          --white: #ffffff;
          --gray: #efefef;
          --gray-2: #757575;
          --dark-blue: #2c3e50;
        }

        body {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: var(--gray);
          font-family: 'Poppins', sans-serif;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .login-container {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          overflow: hidden;
        }

        .input-group {
          position: relative;
          width: 100%;
          margin: 1rem 0;
        }

        .input-group i {
          position: absolute;
          top: 50%;
          left: 1rem;
          transform: translateY(-50%);
          font-size: 1.4rem;
          color: var(--gray-2);
        }

        .input-group input {
          width: 100%;
          padding: 1rem 3rem;
          font-size: 1rem;
          background-color: var(--gray);
          border-radius: .5rem;
          border: 0.125rem solid var(--white);
          outline: none;
          box-sizing: border-box;
        }

        .input-group input:focus {
          border: 0.125rem solid var(--primary-color);
        }

        .input-group select {
          width: 100%;
          padding: 1rem 3rem;
          font-size: 1rem;
          background-color: var(--gray);
          border-radius: .5rem;
          border: 0.125rem solid var(--white);
          outline: none;
          box-sizing: border-box;
        }

        .input-group select:focus {
          border: 0.125rem solid var(--primary-color);
        }

        button[type="submit"] {
          cursor: pointer;
          width: 100%;
          padding: .6rem 0;
          border-radius: .5rem;
          border: none;
          background-color: var(--primary-color);
          color: var(--white);
          font-size: 1.2rem;
          outline: none;
          transition: background-color 0.3s ease;
        }

        button[type="submit"]:hover {
          background-color: #a02a2a;
        }

        button[type="submit"]:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }

        /* Responsive Styles */
        @media only screen and (max-width: 768px) {
          .login-container {
            margin: 20px;
            max-width: none;
          }
        }

        @media only screen and (max-width: 425px) {
          .input-group input,
          .input-group select {
            padding: 0.8rem 2.5rem;
            font-size: 0.9rem;
          }
          
          .input-group i {
            font-size: 1.2rem;
            left: 0.8rem;
          }
        }
      `}</style>
    </>
  );
}