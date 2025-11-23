import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OnboardingCard } from '../../../shared/components/ui/OnboardingCard';
import { Sparkles, Target, TrendingUp } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const onboardingSteps = [
    {
      illustration: (
        <div className="relative w-48 h-48 mx-auto">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full opacity-20"
          />
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-white rounded-full p-8 shadow-xl">
              <Sparkles className="w-24 h-24 text-primary-500" strokeWidth={1.5} />
            </div>
          </motion.div>
        </div>
      ),
      title: 'Find Calm in Every Breath',
      description:
        'Practice for 3 minutes daily and discover a profound connection to inner peace and your goals.',
    },
    {
      illustration: (
        <div className="relative w-48 h-48 mx-auto">
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full opacity-20"
          />
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-white rounded-full p-8 shadow-xl">
              <Target className="w-24 h-24 text-accent-500" strokeWidth={1.5} />
            </div>
          </motion.div>
        </div>
      ),
      title: 'Let Experts Guide Your Mind',
      description:
        'Follow our expert-designed 90-day journey to manifest your intentions and transform your life.',
    },
    {
      illustration: (
        <div className="relative w-48 h-48 mx-auto">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full"
          />
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-white rounded-full p-8 shadow-xl">
              <TrendingUp className="w-24 h-24 text-primary-600" strokeWidth={1.5} />
            </div>
          </motion.div>
        </div>
      ),
      title: 'Watch Your Calmness Grow',
      description:
        'See your transformation unfold as you progress through each day, building momentum toward your goals.',
    },
  ];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-onboarding-bg to-onboarding-bg-light flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-6xl">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-white" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">SignRoad</h1>
          </div>
          <p className="text-white/80 text-lg">Your Journey to Manifestation</p>
        </motion.div>

        {/* Onboarding Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <OnboardingCard
              illustration={onboardingSteps[currentStep].illustration}
              title={onboardingSteps[currentStep].title}
              description={onboardingSteps[currentStep].description}
              onStart={handleNext}
              currentStep={currentStep}
              totalSteps={onboardingSteps.length}
              buttonText={currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Continue'}
            />
          </motion.div>
        </AnimatePresence>

        {/* Skip Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <button
            onClick={onComplete}
            className="text-white/70 hover:text-white transition-colors duration-300 text-sm font-medium"
          >
            Skip Introduction
          </button>
        </motion.div>
      </div>
    </div>
  );
};
