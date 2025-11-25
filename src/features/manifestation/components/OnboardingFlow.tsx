import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const onboardingSteps = [
    {
      title: 'Unlock Your Path to Manifestation',
      description: 'Signroad combines guided meditations with gamified exercises to help you focus your energy and manifest your goals. Start your journey today.',
      illustration: (
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {/* Watercolor background blob */}
          <defs>
            <filter id="watercolor1">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" seed="1" />
              <feColorMatrix type="hueRotate" values="0" />
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <radialGradient id="sunGradient">
              <stop offset="0%" stopColor="#ffd89b" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f4c77e" stopOpacity="0.6" />
            </radialGradient>
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7dd3c0" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#a8e6d7" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Sky/background */}
          <ellipse cx="200" cy="150" rx="180" ry="120" fill="#a8d8ea" opacity="0.3" filter="url(#watercolor1)" />
          
          {/* Sunrise */}
          <circle cx="200" cy="180" r="40" fill="url(#sunGradient)" />
          <path d="M 160 180 L 150 160 M 180 160 L 175 140 M 200 155 L 200 130 M 220 160 L 225 140 M 240 180 L 250 160" 
                stroke="#ffd89b" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          
          {/* Winding path */}
          <path d="M 200 350 Q 150 300, 200 250 Q 250 200, 200 150" 
                fill="none" stroke="url(#pathGradient)" strokeWidth="30" strokeLinecap="round" />
          <path d="M 200 350 Q 150 300, 200 250 Q 250 200, 200 150" 
                fill="none" stroke="#fff" strokeWidth="15" strokeLinecap="round" opacity="0.5" />
          
          {/* Person meditating */}
          <ellipse cx="200" cy="320" rx="25" ry="35" fill="#9b8fb5" opacity="0.7" />
          <circle cx="200" cy="295" r="15" fill="#9b8fb5" opacity="0.7" />
          
          {/* Floating orbs */}
          <circle cx="120" cy="240" r="12" fill="#a8d8ea" opacity="0.6" />
          <circle cx="280" cy="200" r="10" fill="#ffd89b" opacity="0.6" />
          <circle cx="160" cy="180" r="8" fill="#7dd3c0" opacity="0.6" />
          
          {/* Stars */}
          <path d="M 180 120 L 182 128 L 190 128 L 184 133 L 186 141 L 180 136 L 174 141 L 176 133 L 170 128 L 178 128 Z" 
                fill="#ffd89b" opacity="0.8" />
          <path d="M 220 110 L 222 118 L 230 118 L 224 123 L 226 131 L 220 126 L 214 131 L 216 123 L 210 118 L 218 118 Z" 
                fill="#ffd89b" opacity="0.8" />
          
          {/* Journal */}
          <rect x="260" y="140" width="30" height="40" rx="3" fill="#e8b4f0" opacity="0.7" />
          <line x1="265" y1="150" x2="285" y2="150" stroke="#9b8fb5" strokeWidth="1" />
          <line x1="265" y1="160" x2="285" y2="160" stroke="#9b8fb5" strokeWidth="1" />
          
          {/* Compass */}
          <circle cx="140" cy="160" r="15" fill="#fff" opacity="0.8" />
          <circle cx="140" cy="160" r="12" fill="none" stroke="#5fb8a6" strokeWidth="2" />
          <path d="M 140 148 L 140 172 M 128 160 L 152 160" stroke="#5fb8a6" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      title: 'Gamify Your Progress',
      description: 'Track your manifestation journey, earn stars, and unlock new levels with fun, gamified exercises. Make progress rewarding!',
      illustration: (
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <filter id="watercolor2">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" seed="2" />
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <linearGradient id="pathGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7dd3c0" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#a8e6d7" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Background */}
          <ellipse cx="200" cy="200" rx="180" ry="150" fill="#a8e6d7" opacity="0.2" filter="url(#watercolor2)" />
          
          {/* Winding path with pins */}
          <path d="M 100 350 Q 150 300, 120 250 Q 90 200, 140 150 Q 190 100, 240 120 Q 290 140, 280 190 Q 270 240, 320 260" 
                fill="none" stroke="url(#pathGradient2)" strokeWidth="25" strokeLinecap="round" />
          <path d="M 100 350 Q 150 300, 120 250 Q 90 200, 140 150 Q 190 100, 240 120 Q 290 140, 280 190 Q 270 240, 320 260" 
                fill="none" stroke="#fff" strokeWidth="12" strokeLinecap="round" opacity="0.5" />
          
          {/* Map pins */}
          <g>
            <circle cx="100" cy="350" r="15" fill="#ffd89b" opacity="0.8" />
            <circle cx="100" cy="350" r="10" fill="#f4c77e" />
          </g>
          <g>
            <circle cx="120" cy="250" r="15" fill="#a8d8ea" opacity="0.8" />
            <circle cx="120" cy="250" r="10" fill="#7db8d8" />
          </g>
          <g>
            <circle cx="140" cy="150" r="15" fill="#7dd3c0" opacity="0.8" />
            <circle cx="140" cy="150" r="10" fill="#5fb8a6" />
          </g>
          
          {/* Stars */}
          <path d="M 180 280 L 182 288 L 190 288 L 184 293 L 186 301 L 180 296 L 174 301 L 176 293 L 170 288 L 178 288 Z" 
                fill="#ffd89b" />
          <path d="M 220 200 L 222 208 L 230 208 L 224 213 L 226 221 L 220 216 L 214 221 L 216 213 L 210 208 L 218 208 Z" 
                fill="#ffd89b" />
          
          {/* Treasure chest */}
          <rect x="300" y="240" width="40" height="30" rx="3" fill="#d4a574" />
          <rect x="300" y="240" width="40" height="10" rx="5" fill="#f4c77e" />
          <circle cx="320" cy="255" r="3" fill="#ffd89b" />
          <path d="M 305 235 L 310 225 L 330 225 L 335 235" fill="none" stroke="#d4a574" strokeWidth="3" />
          
          {/* Level up badge */}
          <circle cx="350" cy="180" r="25" fill="#a8d8ea" opacity="0.8" />
          <path d="M 350 165 L 355 175 L 350 185 L 345 175 Z" fill="#fff" />
          <text x="350" y="200" fontSize="10" fill="#2d3748" textAnchor="middle">LEVEL UP</text>
          
          {/* Progress bar */}
          <rect x="80" y="80" width="120" height="20" rx="10" fill="#fff" opacity="0.8" />
          <rect x="80" y="80" width="70" height="20" rx="10" fill="#7dd3c0" />
          <circle cx="80" cy="90" r="15" fill="#fff" />
          <circle cx="80" cy="90" r="12" fill="#a8d8ea" />
        </svg>
      ),
    },
    {
      title: 'Connect with Your Tribe',
      description: 'Join a community of like-minded travelers on their manifestation journey. Share experiences and grow together.',
      illustration: (
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <filter id="watercolor3">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" seed="3" />
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <radialGradient id="fireGradient">
              <stop offset="0%" stopColor="#ffd89b" />
              <stop offset="100%" stopColor="#f4a6a6" />
            </radialGradient>
          </defs>

          {/* Background */}
          <ellipse cx="200" cy="200" rx="180" ry="150" fill="#7dd3c0" opacity="0.2" filter="url(#watercolor3)" />
          
          {/* Campfire */}
          <ellipse cx="200" cy="280" rx="60" ry="20" fill="#d4a574" opacity="0.5" />
          <path d="M 180 280 L 190 240 L 200 280 L 210 240 L 220 280" fill="url(#fireGradient)" opacity="0.7" />
          <path d="M 185 260 Q 200 230, 215 260" fill="#ffd89b" opacity="0.8" />
          
          {/* People sitting around campfire */}
          <g>
            <ellipse cx="150" cy="300" rx="20" ry="25" fill="#9b8fb5" opacity="0.7" />
            <circle cx="150" cy="280" r="12" fill="#9b8fb5" opacity="0.7" />
          </g>
          <g>
            <ellipse cx="250" cy="300" rx="20" ry="25" fill="#a8d8ea" opacity="0.7" />
            <circle cx="250" cy="280" r="12" fill="#a8d8ea" opacity="0.7" />
          </g>
          <g>
            <ellipse cx="200" cy="320" rx="20" ry="25" fill="#f4a6a6" opacity="0.7" />
            <circle cx="200" cy="300" r="12" fill="#f4a6a6" opacity="0.7" />
          </g>
          
          {/* Stars in sky */}
          <path d="M 100 100 L 102 108 L 110 108 L 104 113 L 106 121 L 100 116 L 94 121 L 96 113 L 90 108 L 98 108 Z" 
                fill="#ffd89b" opacity="0.8" />
          <path d="M 300 120 L 302 128 L 310 128 L 304 133 L 306 141 L 300 136 L 294 141 L 296 133 L 290 128 L 298 128 Z" 
                fill="#ffd89b" opacity="0.8" />
          <path d="M 200 80 L 202 88 L 210 88 L 204 93 L 206 101 L 200 96 L 194 101 L 196 93 L 190 88 L 198 88 Z" 
                fill="#ffd89b" opacity="0.8" />
          
          {/* Moon */}
          <circle cx="320" cy="100" r="30" fill="#ffd89b" opacity="0.6" />
          
          {/* Floating hearts/connections */}
          <path d="M 170 200 Q 185 185, 200 200 Q 215 185, 230 200" 
                fill="none" stroke="#f4a6a6" strokeWidth="2" strokeDasharray="5,5" opacity="0.6" />
        </svg>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            {/* Compass logo */}
            <svg width="48" height="48" viewBox="0 0 48 48" className="opacity-90">
              <defs>
                <filter id="compassWatercolor">
                  <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" />
                  <feGaussianBlur stdDeviation="2" />
                </filter>
              </defs>
              <circle cx="24" cy="24" r="22" fill="#7dd3c0" opacity="0.3" filter="url(#compassWatercolor)" />
              <circle cx="24" cy="24" r="18" fill="none" stroke="#5fb8a6" strokeWidth="2" />
              <path d="M 24 6 L 24 42 M 6 24 L 42 24" stroke="#5fb8a6" strokeWidth="2" />
              <path d="M 24 12 L 28 24 L 24 36 L 20 24 Z" fill="#7dd3c0" opacity="0.6" />
            </svg>
            <h1 className="text-5xl text-watercolor" style={{ color: '#2d3748' }}>Signroad</h1>
          </div>
        </motion.div>

        {/* Onboarding Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="card-watercolor"
          >
            {/* Illustration */}
            <div className="w-full h-64 mb-6">
              {onboardingSteps[currentStep].illustration}
            </div>

            {/* Title */}
            <h2 className="text-4xl text-center mb-4 text-watercolor" style={{ color: '#2d3748' }}>
              {onboardingSteps[currentStep].title}
            </h2>

            {/* Description */}
            <p className="text-center text-lg mb-8 px-4" style={{ color: '#4a5568' }}>
              {onboardingSteps[currentStep].description}
            </p>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4">
              {/* Back button */}
              <button
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={`nav-circle ${currentStep === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <ChevronLeft className="w-6 h-6" style={{ color: '#5fb8a6' }} />
              </button>

              {/* Start/Continue button */}
              <button
                onClick={handleNext}
                className="btn-watercolor"
              >
                {currentStep === onboardingSteps.length - 1 ? 'Start' : 'Continue'}
              </button>

              {/* Forward button */}
              <button
                onClick={handleNext}
                className="nav-circle cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" style={{ color: '#5fb8a6' }} />
              </button>
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-6">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? 'w-8 bg-primary-dark'
                      : 'bg-primary-light opacity-40'
                  }`}
                  style={{
                    backgroundColor: index === currentStep ? '#5fb8a6' : '#a8e6d7',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Skip Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <button
            onClick={onComplete}
            className="transition-colors duration-300 text-sm font-medium"
            style={{ color: '#718096' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#4a5568')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#718096')}
          >
            Skip Introduction
          </button>
        </motion.div>
      </div>
    </div>
  );
};
