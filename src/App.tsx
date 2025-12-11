import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useConfigStore } from './store/configStore';
import { LoginForm } from './components/auth/LoginForm';
import { Homepage } from './pages/Homepage';
import { LandingPage } from './pages/LandingPage';
import { ChooseYourRoad } from './components/onboarding/ChooseYourRoad';

function App() {
  const { isAuthenticated, mode, hasCompletedOnboarding, completeOnboarding, user } = useAuthStore();
  const { loadFromBackend, loadedFromBackend } = useConfigStore();
  const [showLoginForm, setShowLoginForm] = useState(false);

  // Load app settings from backend on startup
  useEffect(() => {
    if (!loadedFromBackend) {
      loadFromBackend();
    }
  }, [loadFromBackend, loadedFromBackend]);
  
  // Show landing page or login form for unauthenticated users
  if (!isAuthenticated) {
    if (showLoginForm) {
      return (
        <div className="min-h-screen bg-[#FBFBFB] dark:bg-neutral-950 relative overflow-hidden transition-colors duration-200">
          {/* Subtle background pattern matching landing page */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute right-0 top-0 w-1/2 h-1/2 opacity-[0.08]">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <path 
                  d="M50 350 Q200 200 350 100" 
                  stroke="#0E7A77" 
                  strokeWidth="2" 
                  fill="none"
                  strokeDasharray="8 4"
                />
                <circle cx="350" cy="100" r="20" fill="#0E7A77" opacity="0.3" />
                <circle cx="200" cy="200" r="10" fill="#EEC76A" opacity="0.5" />
              </svg>
            </div>
            <div className="absolute left-0 bottom-0 w-1/3 h-1/3 opacity-[0.05]">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <circle cx="100" cy="100" r="80" stroke="#0E7A77" strokeWidth="1" fill="none" />
                <circle cx="100" cy="100" r="40" stroke="#EEC76A" strokeWidth="1" fill="none" />
              </svg>
            </div>
          </div>
          
          {/* Header with back button */}
          <header className="relative z-10 px-4 sm:px-6 pt-4 pb-2">
            <button 
              onClick={() => setShowLoginForm(false)}
              className="inline-flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 transition-colors font-medium"
            >
              <span>&larr;</span> Back to home
            </button>
          </header>
          
          {/* Login form container - positioned higher on mobile */}
          <main className="relative z-10 flex justify-center px-4 sm:px-6 pt-2 sm:pt-8 pb-6">
            <div className="w-full max-w-md">
              <LoginForm />
            </div>
          </main>
          
          {/* Bottom decorative element */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-gold-500 to-teal-500 opacity-30" />
        </div>
      );
    }
    
    return <LandingPage onLoginClick={() => setShowLoginForm(true)} />;
  }

  // Show onboarding flow for new users who haven't selected their road
  if (!hasCompletedOnboarding && mode === 'consumer') {
    return (
      <Router>
        <ChooseYourRoad 
          onComplete={completeOnboarding} 
          userName={user?.name}
        />
      </Router>
    );
  }

  // Unified homepage - the only version of the app
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
