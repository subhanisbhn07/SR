import { useState, useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import { useJourneyStore } from './features/journey/store/journeyStore';
import { useManifestationStore } from './features/manifestation/store/manifestationStore';
import { LoginForm } from './features/auth/components/LoginForm';
import { Header } from './shared/components/layout/Header';
import { InfiniteRoad } from './features/journey/components/InfiniteRoad';
import { DayDetail } from './pages/DayDetail';
import { TravelersLog } from './pages/TravelersLog';
import { GoalIntake } from './features/manifestation/components/GoalIntake';
import { PaywallScreen } from './features/paywall/components/PaywallScreen';

type View = 'road' | 'day-detail' | 'log';

function App() {
  const { isAuthenticated, user } = useAuthStore();
  const { userProgress, setCurrentStep, updateLanternHealth } = useJourneyStore();
  const { goal } = useManifestationStore();
  
  const [currentView, setCurrentView] = useState<View>('road');
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showGoalIntake, setShowGoalIntake] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      updateLanternHealth();
    }
  }, [isAuthenticated, updateLanternHealth]);

  useEffect(() => {
    if (isAuthenticated && !goal) {
      setShowGoalIntake(true);
    }
  }, [isAuthenticated, goal]);

  useEffect(() => {
    if (isAuthenticated && userProgress.completedSteps.includes(14)) {
      const isSubscribed = user?.mode === 'enterprise';
      if (!isSubscribed && userProgress.currentStep === 15) {
        setShowPaywall(true);
      }
    }
  }, [isAuthenticated, userProgress.completedSteps, userProgress.currentStep, user?.mode]);

  const handleNodeClick = (stepNumber: number) => {
    setSelectedStep(stepNumber);
    setCurrentStep(stepNumber);
    setCurrentView('day-detail');
  };

  const handleBackToRoad = () => {
    setCurrentView('road');
    setSelectedStep(null);
  };

  const handleLogClick = () => {
    setCurrentView('log');
  };

  const handleGoalComplete = () => {
    setShowGoalIntake(false);
  };

  const handleSubscribe = () => {
    alert('Subscription feature coming soon! For demo purposes, you can continue exploring.');
    setShowPaywall(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center p-4">
        <LoginForm />
      </div>
    );
  }

  if (showGoalIntake) {
    return <GoalIntake onComplete={handleGoalComplete} />;
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      <Header onLogClick={handleLogClick} />
      
      {currentView === 'road' && (
        <InfiniteRoad onNodeClick={handleNodeClick} />
      )}
      
      {currentView === 'day-detail' && selectedStep !== null && (
        <DayDetail stepNumber={selectedStep} onBack={handleBackToRoad} />
      )}
      
      {currentView === 'log' && (
        <div>
          <div className="sticky top-16 z-10 bg-neutral-900/80 backdrop-blur-sm border-b border-neutral-800">
            <div className="max-w-4xl mx-auto px-4 py-4">
              <button
                onClick={() => setCurrentView('road')}
                className="text-neutral-400 hover:text-white transition-colors"
              >
                ← Back to Road
              </button>
            </div>
          </div>
          <TravelersLog />
        </div>
      )}

      {showPaywall && (
        <PaywallScreen
          onClose={() => setShowPaywall(false)}
          onSubscribe={handleSubscribe}
        />
      )}
    </div>
  );
}

export default App;
