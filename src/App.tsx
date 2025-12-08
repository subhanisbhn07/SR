import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { LoginForm } from './components/auth/LoginForm';
import { Homepage } from './pages/Homepage';
import { ChooseYourRoad } from './components/onboarding/ChooseYourRoad';
import { AdminSettings } from './pages/AdminSettings';
import { AuthCallback } from './pages/AuthCallback';

function App() {
  const { isAuthenticated, mode, hasCompletedOnboarding, completeOnboarding, user, initializeAuth } = useAuthStore();

  // Initialize auth on app load (check for existing session)
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Auth callback route should be accessible without authentication
  if (window.location.pathname.startsWith('/auth/callback')) {
    return (
      <Router>
        <Routes>
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </Router>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center p-4 transition-colors duration-200">
        <LoginForm />
      </div>
    );
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
