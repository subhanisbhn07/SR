import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { LoginForm } from './components/auth/LoginForm';
import { Homepage } from './pages/Homepage';
import { LandingPage } from './pages/LandingPage';
import { ChooseYourRoad } from './components/onboarding/ChooseYourRoad';
import { AdminSettings } from './pages/AdminSettings';
import { NotFoundPage } from './pages/NotFoundPage';
import { PageLoader } from './components/ui/PageLoader';

function App() {
  const { isAuthenticated, mode, hasCompletedOnboarding, completeOnboarding, user } = useAuthStore();
  const [isBooting, setIsBooting] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isBooting) {
    return <PageLoader message="Loading SignRoad..." />;
  }
  
  if (!isAuthenticated) {
    // Show login form if user clicked "Get Started"
    if (showLogin) {
      return (
        <div className="min-h-screen bg-neumo-bg flex items-center justify-center p-4">
          <LoginForm onBack={() => setShowLogin(false)} />
        </div>
      );
    }
    // Show marketing landing page by default
    return <LandingPage onGetStarted={() => setShowLogin(true)} />;
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
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
