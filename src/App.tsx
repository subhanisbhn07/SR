import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { LoginForm } from './components/auth/LoginForm';
import { ChooseYourRoad } from './components/onboarding/ChooseYourRoad';

const Homepage = lazy(() => import('./pages/Homepage').then(m => ({ default: m.Homepage })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

const LoadingFallback = () => (
  <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-accent-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

function App() {
  const { isAuthenticated, mode, hasCompletedOnboarding, completeOnboarding, user } = useAuthStore();
  
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
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="*" element={<Homepage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
