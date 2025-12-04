import React, { useState, useEffect } from 'react';
import { JourneyPage } from './pages/JourneyPage';
import AdminPanel from './pages/AdminPanel';

function App() {
  const [currentPage, setCurrentPage] = useState<'journey' | 'admin'>('journey');

  // Simple hash-based routing for admin access
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('journey');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentPage === 'admin') {
    return <AdminPanel />;
  }

  return <JourneyPage />;
}

export default App;
