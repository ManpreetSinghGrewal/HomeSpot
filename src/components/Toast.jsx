import React, { createContext, useContext, useState, useEffect } from 'react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    const newToast = { id, message, type, duration };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        style={{
          position: 'fixed',
          top: '80px',
          right: '20px',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const Toast = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const getToastStyles = () => {
    const baseStyles = {
      padding: '16px 20px',
      borderRadius: '8px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      color: '#fff',
      minWidth: '300px',
      maxWidth: '400px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      transform: isVisible ? 'translateX(0)' : 'translateX(400px)',
      opacity: isVisible ? 1 : 0,
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    };

    switch (toast.type) {
      case 'success':
        return { ...baseStyles, background: '#28a745' };
      case 'error':
        return { ...baseStyles, background: '#dc3545' };
      case 'warning':
        return { ...baseStyles, background: '#ffc107', color: '#333' };
      default:
        return { ...baseStyles, background: '#17a2b8' };
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      default:
        return 'ℹ';
    }
  };

  return (
    <div
      style={getToastStyles()}
      onClick={() => {
        setIsVisible(false);
        setTimeout(() => onRemove(toast.id), 300);
      }}
    >
      <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{getIcon()}</span>
      <span style={{ flex: 1 }}>{toast.message}</span>
    </div>
  );
};

