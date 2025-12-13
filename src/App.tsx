import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { LoginForm } from './components/auth/LoginForm';
import { Homepage } from './pages/Homepage';
import { LandingPage } from './pages/LandingPage';
import { ChooseYourRoad } from './components/onboarding/ChooseYourRoad';
import { AdminSettings } from './pages/AdminSettings';

function App() {
  const { isAuthenticated, mode, hasCompletedOnboarding, completeOnboarding, user } = useAuthStore();
  const [showLoginForm, setShowLoginForm] = useState(false);
  
  if (!isAuthenticated) {
    // Show login form if user clicked login/signup from landing page
    if (showLoginForm) {
      return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center p-4 transition-colors duration-200">
          <div className="relative">
            <button 
              onClick={() => setShowLoginForm(false)}
              className="absolute -top-12 left-0 text-sm text-teal-500 hover:text-teal-600 transition-colors"
            >
              &larr; Back to homepage
            </button>
            <LoginForm />
          </div>
        </div>
      );
    }
    
    // Show landing page for unauthenticated visitors
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
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
