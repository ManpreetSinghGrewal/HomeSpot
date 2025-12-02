import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    // Try to load from currentUser first, if not available, reconstruct from individual items
    try {
      const savedUser = JSON.parse(localStorage.getItem('currentUser'));
      
      // If currentUser exists, use it
      if (savedUser) {
        setUser(savedUser);
        // Sync individual items to ensure consistency
        if (savedUser.username) localStorage.setItem('username', savedUser.username);
        if (savedUser.email) localStorage.setItem('email', savedUser.email);
        if (savedUser.role) localStorage.setItem('role', savedUser.role);
      } else {
        // Try to reconstruct from individual items
        const username = localStorage.getItem('username');
        const email = localStorage.getItem('email');
        const role = localStorage.getItem('role') || 'user';
        
        if (username && email) {
          const reconstructedUser = { username, email, role };
          setUser(reconstructedUser);
          localStorage.setItem('currentUser', JSON.stringify(reconstructedUser));
        } else {
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    // Store in both formats for compatibility
    localStorage.setItem('currentUser', JSON.stringify(userData));
    if (userData.username) localStorage.setItem('username', userData.username);
    if (userData.email) localStorage.setItem('email', userData.email);
    if (userData.role) localStorage.setItem('role', userData.role);
  };

  const logout = () => {
    setUser(null);
    // Clear all user-related localStorage items
    localStorage.removeItem('currentUser');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('favorites');
    localStorage.removeItem('bookingHistory');
    localStorage.removeItem('landlordProperties');
    localStorage.removeItem('contactMessages');
    localStorage.removeItem('selectedProperty');
    localStorage.removeItem('savedSearch');
    localStorage.removeItem('recentlyViewed');
    localStorage.removeItem('signupFormDraft');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
