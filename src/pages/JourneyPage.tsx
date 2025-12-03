import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useJourneyStore } from '../store/journeyStore';
import { ROAD_STEPS } from '../types/journey';

// Onboarding components
import { OnboardingSplash } from '../components/journey/OnboardingSplash';
import { IntentionSelector } from '../components/journey/IntentionSelector';
import { AuthScreen } from '../components/journey/AuthScreen';
import { PromiseScreen } from '../components/journey/PromiseScreen';

// Main journey components
import { RoadVisualization } from '../components/journey/RoadVisualization';
import { MeditationPlayer } from '../components/journey/MeditationPlayer';
import { SignReveal } from '../components/journey/SignReveal';
import { Campfire } from '../components/journey/Campfire';
import { JournalView } from '../components/journey/JournalView';
import { ProfileView } from '../components/journey/ProfileView';
import { JourneyBottomNav, JourneyTab } from '../components/journey/JourneyBottomNav';

// Overlays
import { Paywall } from '../components/journey/Paywall';
import { UniverseReceipt } from '../components/journey/UniverseReceipt';

export const JourneyPage: React.FC = () => {
  const {
    user,
    isAuthenticated,
    onboarding,
    setOnboardingStep,
    setIntention,
    completeOnboarding,
    completeMeditation,
    showPaywall,
    dismissPaywall,
    showUniverseReceipt,
    currentReceipt,
    hideReceipt,
    meditationComplete,
    revealSign,
  } = useJourneyStore();

  const [activeTab, setActiveTab] = useState<JourneyTab>('road');
  const [showMeditationPlayer, setShowMeditationPlayer] = useState(false);
  const [showSignReveal, setShowSignReveal] = useState(false);
  const [showCampfire, setShowCampfire] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Check for tribe notifications
  const tribeNotification = user?.tribe?.members.some(
    (m) => m.id !== user.id && !m.meditatedToday
  );

  // Handle day selection from road
  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
    setShowMeditationPlayer(true);
  };

  // Handle meditation completion
  const handleMeditationComplete = () => {
    completeMeditation();
    setShowMeditationPlayer(false);
    setShowSignReveal(true);
  };

  // Handle sign reveal close
  const handleSignRevealClose = () => {
    setShowSignReveal(false);
    setSelectedDay(null);
  };

  // Handle tab change
  const handleTabChange = (tab: JourneyTab) => {
    if (tab === 'campfire') {
      setShowCampfire(true);
    } else {
      setActiveTab(tab);
    }
  };

  // Render onboarding flow
  if (!isAuthenticated) {
    return (
      <AnimatePresence mode="wait">
        {onboarding.step === 'splash' && (
          <OnboardingSplash
            key="splash"
            onContinue={() => setOnboardingStep('intention')}
          />
        )}
        {onboarding.step === 'intention' && (
          <IntentionSelector
            key="intention"
            selectedIntention={onboarding.selectedIntention}
            onSelect={setIntention}
            onContinue={() => setOnboardingStep('auth')}
          />
        )}
        {onboarding.step === 'auth' && (
          <AuthScreen
            key="auth"
            onComplete={(email, name) => {
              completeOnboarding(email, name);
              setOnboardingStep('promise');
            }}
          />
        )}
        {onboarding.step === 'promise' && (
          <PromiseScreen
            key="promise"
            onContinue={() => setOnboardingStep('complete')}
          />
        )}
      </AnimatePresence>
    );
  }

  // Get current step for meditation player
  const currentStep = selectedDay ? ROAD_STEPS[selectedDay - 1] : null;

  // Render main journey
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black">
      {/* Main content based on active tab */}
      <AnimatePresence mode="wait">
        {activeTab === 'road' && (
          <RoadVisualization key="road" onDaySelect={handleDaySelect} />
        )}
        {activeTab === 'journal' && <JournalView key="journal" />}
        {activeTab === 'profile' && <ProfileView key="profile" />}
      </AnimatePresence>

      {/* Bottom navigation */}
      <JourneyBottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        tribeNotification={tribeNotification}
      />

      {/* Meditation Player Modal */}
      <AnimatePresence>
        {showMeditationPlayer && currentStep && (
          <MeditationPlayer
            key="meditation-player"
            step={currentStep}
            onClose={() => setShowMeditationPlayer(false)}
            onComplete={handleMeditationComplete}
          />
        )}
      </AnimatePresence>

      {/* Sign Reveal Modal */}
      <AnimatePresence>
        {showSignReveal && currentStep && (
          <SignReveal
            key="sign-reveal"
            step={currentStep}
            onClose={handleSignRevealClose}
          />
        )}
      </AnimatePresence>

      {/* Campfire Modal */}
      <AnimatePresence>
        {showCampfire && (
          <Campfire key="campfire" onClose={() => setShowCampfire(false)} />
        )}
      </AnimatePresence>

      {/* Paywall Modal */}
      <AnimatePresence>
        {showPaywall && <Paywall key="paywall" onClose={dismissPaywall} />}
      </AnimatePresence>

      {/* Universe Receipt Modal */}
      <AnimatePresence>
        {showUniverseReceipt && currentReceipt && (
          <UniverseReceipt
            key="universe-receipt"
            receipt={currentReceipt}
            onClose={hideReceipt}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
