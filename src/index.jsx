import React from 'react';
import { createRoot } from 'react-dom/client';
import Router from './router';
import { UserProvider } from './contexts/UserContext';
import { ToastProvider } from './components/Toast';
import './index.css';

// Create root element
const rootElement = document.createElement('div');
rootElement.id = 'root';
document.body.appendChild(rootElement);

// Add FontAwesome icons
const fontAwesomeLink = document.createElement('link');
fontAwesomeLink.rel = 'stylesheet';
fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
document.head.appendChild(fontAwesomeLink);

// Set page title and meta
document.title = 'HomeSpot';
document.documentElement.lang = 'en';

// Add meta viewport
const viewportMeta = document.createElement('meta');
viewportMeta.name = 'viewport';
viewportMeta.content = 'width=device-width, initial-scale=1.0';
document.head.appendChild(viewportMeta);

// Add favicon
const faviconLink = document.createElement('link');
faviconLink.rel = 'icon';
faviconLink.type = 'image/png';
faviconLink.href = '/logo.png';
document.head.appendChild(faviconLink);

// Render the app
createRoot(rootElement).render(
  <React.StrictMode>
    <UserProvider>
      <ToastProvider>
        <Router />
      </ToastProvider>
    </UserProvider>
  </React.StrictMode>
);
