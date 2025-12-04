import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { useWellnessStore } from './store/wellnessStore';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { LoginForm } from './components/auth/LoginForm';
import { ConsumerDashboard } from './components/dashboard/ConsumerDashboard';
import { EnterpriseDashboard } from './components/dashboard/EnterpriseDashboard';
import { SessionCard } from './components/sessions/SessionCard';
import { SessionPlayer } from './components/sessions/SessionPlayer';
import { Homepage } from './pages/Homepage';
import { ChooseYourRoad } from './components/onboarding/ChooseYourRoad';

function App() {
  const { isAuthenticated, mode, hasCompletedOnboarding, completeOnboarding, user } = useAuthStore();
  const { sessions, startSession, currentSession } = useWellnessStore();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showHomepage, setShowHomepage] = useState(true);
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
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

  // Show the new homepage design
  if (showHomepage) {
    return (
      <Router>
        <Homepage />
      </Router>
    );
  }
  
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return mode === 'consumer' ? <ConsumerDashboard /> : <EnterpriseDashboard />;
      
      case 'sessions':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-neutral-900">Wellness Sessions</h1>
              <div className="flex space-x-2">
                <select className="px-4 py-2 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>All Categories</option>
                  <option>Mindfulness</option>
                  <option>Productivity</option>
                  <option>Confidence</option>
                </select>
                <select className="px-4 py-2 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>All Levels</option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((session) => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onStart={startSession}
                />
              ))}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
            <p className="text-neutral-600">This section is coming soon!</p>
          </div>
        );
    }
  };
  
  return (
    <Router>
      <div className="min-h-screen bg-neutral-50">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="flex">
          <Sidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          
          <main className="flex-1 lg:ml-64 p-6">
            <div className="max-w-7xl mx-auto">
              {renderContent()}
            </div>
          </main>
        </div>
        
        {currentSession && (
          <SessionPlayer
            session={currentSession}
            onClose={() => useWellnessStore.getState().startSession(null as any)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
