import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight } from 'lucide-react';
import { useAffirmationsStore } from '../../store/affirmationsStore';
import { UserAffirmation } from '../../types';

interface MeditationIntroProps {
  isVisible: boolean;
  onContinue: () => void;
  sessionTitle?: string;
}

export const MeditationIntro: React.FC<MeditationIntroProps> = ({
  isVisible,
  onContinue,
  sessionTitle = "Today's Session",
}) => {
  const [affirmation, setAffirmation] = useState<UserAffirmation | null>(null);
  const { getRandomActiveAffirmation, incrementShownCount } = useAffirmationsStore();
  
  useEffect(() => {
    if (isVisible) {
      const randomAffirmation = getRandomActiveAffirmation();
      if (randomAffirmation) {
        setAffirmation(randomAffirmation);
        incrementShownCount(randomAffirmation.id);
      }
    }
  }, [isVisible, getRandomActiveAffirmation, incrementShownCount]);
  
  const displayText = affirmation?.groundedText || affirmation?.originalText;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-neumo-bg"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto px-6 text-center"
          >
            {/* Session title */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-neumo-text-muted uppercase tracking-wide mb-4"
            >
              {sessionTitle}
            </motion.p>
            
            {/* Affirmation display */}
            {affirmation ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-brand-teal" />
                  <span className="text-xs font-medium text-brand-teal uppercase tracking-wide">
                    Today's Intention
                  </span>
                  <Sparkles className="w-5 h-5 text-brand-teal" />
                </div>
                
                <blockquote className="text-2xl font-medium text-neumo-text leading-relaxed">
                  "{displayText}"
                </blockquote>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <p className="text-lg text-neumo-text-secondary">
                  Take a deep breath. You're exactly where you need to be.
                </p>
              </motion.div>
            )}
            
            {/* Continue button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={onContinue}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal text-white font-medium rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset transition-all"
            >
              Begin Session
              <ChevronRight className="w-4 h-4" />
            </motion.button>
            
            {/* Breathing prompt */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xs text-neumo-text-muted mt-6"
            >
              Take 3 deep breaths before you begin
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Compact version for inline use (not full screen)
interface AffirmationBannerProps {
  className?: string;
}

export const AffirmationBanner: React.FC<AffirmationBannerProps> = ({ className = '' }) => {
  const { getRandomActiveAffirmation } = useAffirmationsStore();
  const affirmation = getRandomActiveAffirmation();
  
  if (!affirmation) return null;
  
  const displayText = affirmation.groundedText || affirmation.originalText;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-3 bg-brand-teal/5 border border-brand-teal/20 rounded-neumo ${className}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="w-3 h-3 text-brand-teal" />
        <span className="text-xs font-medium text-brand-teal">Today's Intention</span>
      </div>
      <p className="text-sm text-neumo-text italic">"{displayText}"</p>
    </motion.div>
  );
};
