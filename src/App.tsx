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
import { CosmeticsShop } from './features/cosmetics/components/CosmeticsShop';
import { GlobalFeed } from './features/feed/components/GlobalFeed';
import { HallOfFame } from './features/hallOfFame/components/HallOfFame';
import { ErrorBoundary } from './shared/components/ErrorBoundary';
import { ToastContainer } from './shared/components/ui/ToastContainer';
import { useToast } from './shared/hooks/useToast';

type View = 'road' | 'day-detail' | 'log' | 'shop' | 'feed' | 'hall-of-fame';

function App() {
  const { isAuthenticated, user } = useAuthStore();
  const { userProgress, setCurrentStep, updateLanternHealth } = useJourneyStore();
  const { goal } = useManifestationStore();
  const toast = useToast();
  
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

  const handleShopClick = () => {
    setCurrentView('shop');
  };

  const handleFeedClick = () => {
    setCurrentView('feed');
  };

  const handleHallOfFameClick = () => {
    setCurrentView('hall-of-fame');
  };

  const handleGoalComplete = () => {
    setShowGoalIntake(false);
  };

  const handleSubscribe = () => {
    toast.info('Subscription feature coming soon! For demo purposes, you can continue exploring.');
    setShowPaywall(false);
  };

  if (!isAuthenticated) {
    return (
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center p-4">
          <LoginForm />
        </div>
        <ToastContainer />
      </ErrorBoundary>
    );
  }

  if (showGoalIntake) {
    return (
      <ErrorBoundary>
        <GoalIntake onComplete={handleGoalComplete} />
        <ToastContainer />
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-neutral-900">
        <Header 
          onLogClick={handleLogClick}
          onShopClick={handleShopClick}
          onFeedClick={handleFeedClick}
          onHallOfFameClick={handleHallOfFameClick}
        />
      
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

      {currentView === 'shop' && (
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
          <CosmeticsShop />
        </div>
      )}

      {currentView === 'feed' && (
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
          <GlobalFeed />
        </div>
      )}

      {currentView === 'hall-of-fame' && <HallOfFame />}

      {showPaywall && (
        <PaywallScreen
          onClose={() => setShowPaywall(false)}
          onSubscribe={handleSubscribe}
        />
      )}

        <ToastContainer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
