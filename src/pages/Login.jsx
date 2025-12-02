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

  // State for error/success messages
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const role = user.role || 'user';
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
    setMessage('');
  };

  // Handle signup
  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Validate inputs
    if (!signupData.username || !signupData.email || !signupData.password || !signupData.confirmPassword) {
      setMessage('All fields are required');
      setLoading(false);
      return;
    }

    if (!signupData.email.includes('@')) {
      setMessage('Invalid email format');
      setLoading(false);
      return;
    }

    if (signupData.password.length < 6) {
      setMessage('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      setMessage('Passwords do not match');
      setLoading(false);
      return;
    }

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    if (existingUsers.some(user => user.username === signupData.username)) {
      setMessage('Username already exists');
      setLoading(false);
      return;
    }

    if (existingUsers.some(user => user.email === signupData.email)) {
      setMessage('Email already registered');
      setLoading(false);
      return;
    }

    // Create new user
    const newUser = {
      username: signupData.username,
      email: signupData.email,
      role: signupData.role,
      password: signupData.password, // In production, hash this!
      createdAt: new Date().toISOString()
    };

    existingUsers.push(newUser);
    localStorage.setItem('allUsers', JSON.stringify(existingUsers));
    localStorage.setItem('currentUser', signupData.username);
    localStorage.setItem('userData', JSON.stringify(newUser));
    localStorage.setItem('isLoggedIn', 'true');

    setMessage('Account created successfully!');
    setLoading(false);
    
    setTimeout(() => {
      navigate('/profile');
    }, 1500);
  };

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Validate inputs
    if (!loginData.username || !loginData.password) {
      setMessage('Username and password are required');
      setLoading(false);
      return;
    }

    // Check if user exists
    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const user = allUsers.find(u => u.username === loginData.username && u.password === loginData.password);

    if (!user) {
      setMessage('Invalid username or password');
      setLoading(false);
      return;
    }

    // Login successful
    localStorage.setItem('currentUser', loginData.username);
    localStorage.setItem('userData', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');

    setMessage('Login successful!');
    setLoading(false);

    setTimeout(() => {
      navigate('/profile');
    }, 1500);
  };

  // Handle signup input change
  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  // Handle login input change
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
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
                  {message && (
                    <div style={{
                      padding: '12px',
                      marginBottom: '20px',
                      backgroundColor: message.includes('success') ? '#d4edda' : '#f8d7da',
                      border: '1px solid',
                      borderColor: message.includes('success') ? '#c3e6cb' : '#f5c6cb',
                      borderRadius: '8px',
                      color: message.includes('success') ? '#155724' : '#721c24',
                      textAlign: 'center',
                      fontSize: '0.9rem'
                    }}>
                      {message}
                    </div>
                  )}
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
                          border: '0.125rem solid var(--white)',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
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
                          border: '0.125rem solid var(--white)',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
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
                          border: '0.125rem solid var(--white)',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
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
                          border: '0.125rem solid var(--white)',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
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
                  {message && (
                    <div style={{
                      padding: '12px',
                      marginBottom: '20px',
                      backgroundColor: message.includes('success') ? '#d4edda' : '#f8d7da',
                      border: '1px solid',
                      borderColor: message.includes('success') ? '#c3e6cb' : '#f5c6cb',
                      borderRadius: '8px',
                      color: message.includes('success') ? '#155724' : '#721c24',
                      textAlign: 'center',
                      fontSize: '0.9rem'
                    }}>
                      {message}
                    </div>
                  )}
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
                          border: '0.125rem solid var(--white)',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
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
                          border: '0.125rem solid var(--white)',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
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
                      <b 
                        style={{ color: 'var(--primary-color)', cursor: 'pointer' }}
                        onClick={() => alert('Password reset feature coming soon! For now, please create a new account.')}
                      >
                        Forgot password?
                      </b>
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