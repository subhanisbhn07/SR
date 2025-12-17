import React, { useState } from 'react';
import { motion } from 'framer-motion';

const intentions = [
  { id: 'peace', label: 'Peace', emoji: '🕊️' },
  { id: 'motivation', label: 'Motivation', emoji: '🔥' },
  { id: 'gratitude', label: 'Gratitude', emoji: '🙏' },
  { id: 'focus', label: 'Focus', emoji: '🎯' }
];

interface IntentBasedNavProps {
  onIntentSelect: (intent: string) => void;
}

export const IntentBasedNav: React.FC<IntentBasedNavProps> = ({ onIntentSelect }) => {
  const [activeIntent, setActiveIntent] = useState('peace');

  const handleIntentClick = (intentId: string) => {
    setActiveIntent(intentId);
    onIntentSelect(intentId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-8"
    >
      <h3 className="text-lg font-medium text-neumo-text mb-4">I want to feel...</h3>
      
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {intentions.map((intention) => (
          <motion.button
            key={intention.id}
            onClick={() => handleIntentClick(intention.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex-shrink-0 px-6 py-3 rounded-neumo-lg font-medium transition-all duration-300 ${
              activeIntent === intention.id
                ? 'bg-neumo-bg shadow-neumo-inset text-neumo-text'
                : 'bg-neumo-bg shadow-neumo-sm text-neumo-text-secondary hover:shadow-neumo-inset'
            }`}
          >
            <span className="mr-2">{intention.emoji}</span>
            {intention.label}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
