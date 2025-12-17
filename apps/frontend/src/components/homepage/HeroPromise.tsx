import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Receipt, ArrowRight } from 'lucide-react';
import { useAffinityStore } from '../../store/affinityStore';

interface HeroPromiseProps {
  onGetStarted?: () => void;
}

export const HeroPromise: React.FC<HeroPromiseProps> = ({ onGetStarted }) => {
  const { getWelcomeStrip, getHeroContent } = useAffinityStore();
  
  // Get personalized content based on user's affinity (which landing page they came from)
  const welcomeStrip = getWelcomeStrip();
  const heroContent = getHeroContent();
  
  const steps = [
    {
      icon: Clock,
      title: '10 minutes daily',
      description: 'One audio session. One sign to find. That\'s it.',
    },
    {
      icon: Sparkles,
      title: 'Log your signs',
      description: 'Spot your sign in real life. Log it. Build awareness.',
    },
    {
      icon: Receipt,
      title: 'Get your receipt',
      description: 'When it manifests, get a Universe Receipt to prove it.',
    },
  ];

  return (
    <div className="mb-8">
      {/* Personalized Welcome Strip - Shows if user came from a specific landing page */}
      {welcomeStrip && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4 p-3 rounded-neumo bg-neumo-accent/10 border border-neumo-accent/20 text-center"
        >
          <p className="text-sm font-medium text-neumo-accent">{welcomeStrip.title}</p>
          <p className="text-xs text-neumo-text-secondary">{welcomeStrip.subtitle}</p>
        </motion.div>
      )}
      
      {/* Hero Section - Personalized based on affinity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neumo-text mb-3 leading-tight">
          {heroContent.h1}
        </h1>
        <p className="text-lg md:text-xl text-neumo-text-secondary mb-2">
          {heroContent.sub}
        </p>
        <p className="text-sm text-neumo-text-muted max-w-md mx-auto">
          Join thousands who've manifested their goals and have the Universe Receipts to prove it.
        </p>
      </motion.div>

      {/* 3-Step How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-neumo-lg bg-neumo-bg shadow-neumo p-5 mb-6"
      >
        <h2 className="text-sm font-semibold text-neumo-text-secondary uppercase tracking-wider mb-4 text-center">
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                className="flex flex-col items-center text-center p-4 rounded-neumo bg-neumo-bg shadow-neumo-inset-sm"
              >
                <div className="w-12 h-12 rounded-full bg-neumo-bg shadow-neumo-sm flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-neumo-accent" />
                </div>
                <div className="text-xs font-bold text-neumo-accent mb-1">
                  Step {index + 1}
                </div>
                <h3 className="font-semibold text-neumo-text mb-1">
                  {step.title}
                </h3>
                <p className="text-sm text-neumo-text-secondary">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center"
      >
        <button
          onClick={onGetStarted}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-neumo bg-neumo-accent text-white font-semibold shadow-neumo-sm hover:shadow-neumo-inset transition-all"
        >
          Start Your 7-Step Free Trial
          <ArrowRight className="w-4 h-4" />
        </button>
        <p className="text-xs text-neumo-text-muted mt-2">
          No credit card required. First 7 steps free.
        </p>
      </motion.div>
    </div>
  );
};
