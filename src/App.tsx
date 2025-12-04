import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './features/auth/store/authStore';
import { useWellnessStore } from './features/wellness/store/wellnessStore';
import { useOnboardingStore } from './features/onboarding/store/onboardingStore';
import { LoginForm } from './features/auth/components/LoginForm';
import { OnboardingFlow } from './features/onboarding/components/OnboardingFlow';
import { Header } from './features/layout/components/Header';
import { Sidebar } from './features/layout/components/Sidebar';
import { ConsumerDashboard } from './features/dashboard/components/ConsumerDashboard';
import { EnterpriseDashboard } from './features/dashboard/components/EnterpriseDashboard';
import { SessionCard } from './features/wellness/components/SessionCard';
import { VoiceModePlayer } from './features/wellness/components/VoiceModePlayer';
import { Homepage } from './pages/Homepage';

const AuthGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
        <LoginForm />
      </div>
    );
  }
  
  return <>{children}</>;
};

const OnboardingGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOnboardingComplete } = useOnboardingStore();
  
  if (!isOnboardingComplete) {
    return <OnboardingFlow />;
  }
  
  return <>{children}</>;
};

interface AppShellProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AppShell: React.FC<AppShellProps> = ({ children, activeTab, onTabChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentSession } = useWellnessStore();
  const clearCurrentSession = useWellnessStore((state) => state.clearCurrentSession);
  
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      
      <div className="flex">
        <Sidebar
          activeTab={activeTab}
          onTabChange={onTabChange}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 lg:ml-64 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      {currentSession && (
        <VoiceModePlayer
          session={currentSession}
          onClose={clearCurrentSession}
        />
      )}
    </div>
  );
};

const DashboardContent: React.FC = () => {
  const { mode } = useAuthStore();
  const { sessions, startSession } = useWellnessStore();
  const [activeTab, setActiveTab] = useState('dashboard');
  
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
    <AppShell activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </AppShell>
  );
};

function App() {
  return (
    <Router>
      <AuthGate>
        <OnboardingGate>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/app" element={<DashboardContent />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </OnboardingGate>
      </AuthGate>
    </Router>
  );
}

export default App;
