import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { LoginForm } from './components/auth/LoginForm';
import { Homepage } from './pages/Homepage';
import { LandingPage } from './pages/LandingPage';
import {
  UniverseReceiptsLanding,
  DailyMessageLanding,
  DailyAudioLanding,
  SleepOrbLanding,
  PlatformLanding
} from './pages/landing';
import { ChooseYourRoad } from './components/onboarding/ChooseYourRoad';
import { AdminSettings } from './pages/AdminSettings';
import { PageLoader } from './components/ui/PageLoader';
import { ErrorBoundary } from './components/error/ErrorBoundary';

// Inner component that has access to router hooks
const AppContent: React.FC = () => {
  const { isAuthenticated, mode, hasCompletedOnboarding, completeOnboarding, user } = useAuthStore();
  const [isBooting, setIsBooting] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Handle "Get Started" click - navigate to login
  const handleGetStarted = () => {
    setShowLogin(true);
  };

  // Handle back from login
  const handleBackFromLogin = () => {
    setShowLogin(false);
  };

  if (isBooting) {
    return <PageLoader message="Loading SignRoad..." />;
  }

  // If user is authenticated
  if (isAuthenticated) {
    // Show onboarding flow for new users who haven't selected their road
    if (!hasCompletedOnboarding && mode === 'consumer') {
      return (
        <ChooseYourRoad 
          onComplete={completeOnboarding} 
          userName={user?.name}
        />
      );
    }

    // Authenticated user routes
    return (
      <Routes>
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
    );
  }

  // Not authenticated - show login form if requested
  if (showLogin) {
    return (
      <div className="min-h-screen bg-neumo-bg flex items-center justify-center p-4">
        <LoginForm onBack={handleBackFromLogin} />
      </div>
    );
  }

  // Not authenticated - show landing pages based on route
  return (
    <Routes>
      {/* Feature-focused landing pages for funnel campaigns */}
      <Route path="/universe-receipts" element={<UniverseReceiptsLanding onGetStarted={handleGetStarted} />} />
      <Route path="/daily-message" element={<DailyMessageLanding onGetStarted={handleGetStarted} />} />
      <Route path="/daily-audio" element={<DailyAudioLanding onGetStarted={handleGetStarted} />} />
      <Route path="/sleep-orb" element={<SleepOrbLanding onGetStarted={handleGetStarted} />} />
      <Route path="/platform" element={<PlatformLanding onGetStarted={handleGetStarted} />} />
      
      {/* Default landing page (full platform overview) */}
      <Route path="/" element={<LandingPage onGetStarted={handleGetStarted} />} />
      
      {/* Catch-all for unknown routes */}
      <Route path="*" element={<LandingPage onGetStarted={handleGetStarted} />} />
    </Routes>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
