import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface OnboardingCardProps {
  illustration: React.ReactNode;
  title: string;
  description: string;
  onStart?: () => void;
  currentStep?: number;
  totalSteps?: number;
  buttonText?: string;
}

export const OnboardingCard: React.FC<OnboardingCardProps> = ({
  illustration,
  title,
  description,
  onStart,
  currentStep,
  totalSteps = 3,
  buttonText = 'Start',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-onboarding-surface rounded-card shadow-onboarding p-8 md:p-12 flex flex-col items-center text-center max-w-md mx-auto"
    >
      {/* Illustration Area */}
      <div className="w-full h-64 md:h-80 flex items-center justify-center mb-8">
        {illustration}
      </div>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-onboarding-text mb-4">
        {title}
      </h2>

      {/* Description */}
      <p className="text-base md:text-lg text-onboarding-text-secondary mb-8 leading-relaxed">
        {description}
      </p>

      {/* Progress Dots */}
      {currentStep !== undefined && (
        <div className="flex gap-2 mb-8">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? 'w-8 bg-onboarding-bg'
                  : 'w-2 bg-onboarding-bg/30'
              }`}
            />
          ))}
        </div>
      )}

      {/* Start Button */}
      {onStart && (
        <button
          onClick={onStart}
          className="group bg-onboarding-bg hover:bg-onboarding-bg-light text-white font-semibold px-8 py-4 rounded-button flex items-center gap-3 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      )}
    </motion.div>
  );
};
