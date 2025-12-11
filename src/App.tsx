import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { Homepage } from './pages/Homepage';
import { LandingPage } from './pages/LandingPage';
import { ChooseYourRoad } from './components/onboarding/ChooseYourRoad';
import { AdminSettings } from './pages/AdminSettings';

function App() {
  const { isAuthenticated, mode, hasCompletedOnboarding, completeOnboarding, user } = useAuthStore();
  
  // Show landing page for unauthenticated users
  if (!isAuthenticated) {
    return <LandingPage />;
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
