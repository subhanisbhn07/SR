import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboardingStore } from '../store/onboardingStore';
import { 
  LifePathStep,
  PrimaryStruggleStep,
  TimeAvailableStep,
  PreferredModeStep,
  GenderIdentityStep,
  ContentToneStep,
  ExperienceLevelStep,
  GoalTimeframeStep,
} from './steps';

export const OnboardingFlow: React.FC = () => {
  const { 
    currentStep, 
    totalSteps, 
    answers,
    nextStep, 
    prevStep, 
    completeOnboarding 
  } = useOnboardingStore();

  const progress = (currentStep / totalSteps) * 100;

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1: return !!answers.lifePath;
      case 2: return !!answers.primaryStruggle;
      case 3: return !!answers.timeAvailable;
      case 4: return !!answers.preferredMode;
      case 5: return true;
      case 6: return !!answers.contentTone;
      case 7: return !!answers.experienceLevel;
      case 8: return !!answers.goalTimeframe;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep === totalSteps) {
      completeOnboarding();
    } else {
      nextStep();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <LifePathStep />;
      case 2: return <PrimaryStruggleStep />;
      case 3: return <TimeAvailableStep />;
      case 4: return <PreferredModeStep />;
      case 5: return <GenderIdentityStep />;
      case 6: return <ContentToneStep />;
      case 7: return <ExperienceLevelStep />;
      case 8: return <GoalTimeframeStep />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 flex flex-col">
      <div className="w-full bg-neutral-800/50 h-2">
        <motion.div 
          className="h-full bg-gradient-to-r from-amber-500 to-orange-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-lg">SR</span>
            </div>
            <p className="text-neutral-400 text-sm">
              Step {currentStep} of {totalSteps}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-4 mt-8">
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="flex-1 py-3 px-6 rounded-xl border border-neutral-600 text-neutral-300 hover:bg-neutral-800 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all ${
                canProceed()
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600'
                  : 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
              }`}
            >
              {currentStep === totalSteps ? 'Start My Journey' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
