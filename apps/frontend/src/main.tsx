import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/uiverse.css';

// Initialize theme from localStorage before render to prevent flash
const savedTheme = localStorage.getItem('signroad-theme');
if (savedTheme) {
  const parsed = JSON.parse(savedTheme);
  if (parsed.state?.theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
}

// Register service worker for PWA
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error) => {
      console.log('Service worker registration failed:', error);
    });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
