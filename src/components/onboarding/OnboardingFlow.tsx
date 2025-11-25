import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useOnboardingStore } from '../../store/onboardingStore';
import { Button } from '../ui/Button';
import { OnboardingStep } from './OnboardingStep';
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
    nextStep, 
    prevStep, 
    completeOnboarding,
    answers,
  } = useOnboardingStore();

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

  const getStepTitle = (): string => {
    switch (currentStep) {
      case 1: return "What season of life are you in?";
      case 2: return "What's weighing on you most?";
      case 3: return "How much time do you have?";
      case 4: return "How do you prefer to reflect?";
      case 5: return "How should we personalize for you?";
      case 6: return "How do you like things explained?";
      case 7: return "What's your experience level?";
      case 8: return "What's your goal timeframe?";
      default: return "";
    }
  };

  const getStepSubtitle = (): string => {
    switch (currentStep) {
      case 1: return "This helps us understand your daily rhythm";
      case 2: return "We'll prioritize content that addresses this";
      case 3: return "We'll suggest sessions that fit your schedule";
      case 4: return "Choose what feels most natural to you";
      case 5: return "Optional - helps us show relevant imagery";
      case 6: return "We'll adjust the tone of our content";
      case 7: return "We'll match the depth to your familiarity";
      case 8: return "This shapes your journey structure";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col">
      <div className="flex-1 flex flex-col max-w-lg mx-auto w-full px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-neutral-400">
              Step {currentStep} of {totalSteps}
            </span>
            {currentStep === 5 && (
              <span className="text-xs text-neutral-500 bg-neutral-800 px-2 py-1 rounded">
                Optional
              </span>
            )}
          </div>
          
          <div className="w-full bg-neutral-800 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-accent-500 to-accent-400 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <OnboardingStep
              title={getStepTitle()}
              subtitle={getStepSubtitle()}
            >
              {renderStep()}
            </OnboardingStep>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-neutral-800">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="text-neutral-400 hover:text-neutral-200"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed() && currentStep !== 5}
            className="bg-accent-500 hover:bg-accent-600 text-white px-8"
          >
            {currentStep === totalSteps ? 'Start My Journey' : 'Continue'}
            {currentStep !== totalSteps && <ChevronRight className="w-5 h-5 ml-1" />}
          </Button>
        </div>
      </div>
    </div>
  );
};
