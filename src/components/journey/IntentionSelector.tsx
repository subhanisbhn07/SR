import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Compass, Leaf, Coins, Activity, Palette, ArrowRight } from 'lucide-react';
import { Intention } from '../../types/journey';

interface IntentionSelectorProps {
  selectedIntention: Intention | null;
  onSelect: (intention: Intention) => void;
  onContinue: () => void;
}

const intentions: { id: Intention; label: string; icon: React.ReactNode; description: string; gradient: string }[] = [
  {
    id: 'love',
    label: 'Love',
    icon: <Heart className="w-8 h-8" />,
    description: 'Connection, relationships, self-love',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    id: 'purpose',
    label: 'Purpose',
    icon: <Compass className="w-8 h-8" />,
    description: 'Direction, meaning, calling',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    id: 'peace',
    label: 'Peace',
    icon: <Leaf className="w-8 h-8" />,
    description: 'Calm, clarity, inner stillness',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'wealth',
    label: 'Wealth',
    icon: <Coins className="w-8 h-8" />,
    description: 'Abundance, prosperity, flow',
    gradient: 'from-amber-500 to-yellow-500',
  },
  {
    id: 'health',
    label: 'Health',
    icon: <Activity className="w-8 h-8" />,
    description: 'Vitality, energy, wellness',
    gradient: 'from-green-500 to-lime-500',
  },
  {
    id: 'creativity',
    label: 'Creativity',
    icon: <Palette className="w-8 h-8" />,
    description: 'Expression, inspiration, flow',
    gradient: 'from-orange-500 to-red-500',
  },
];

export const IntentionSelector: React.FC<IntentionSelectorProps> = ({
  selectedIntention,
  onSelect,
  onContinue,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-black flex flex-col items-center p-6 overflow-y-auto"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-12 text-center"
      >
        <h1 className="text-3xl font-bold text-white mb-3">What are you seeking?</h1>
        <p className="text-purple-200 text-lg">Choose your intention for this journey</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mt-10 w-full max-w-md">
        {intentions.map((intention, index) => (
          <motion.button
            key={intention.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            onClick={() => onSelect(intention.id)}
            className={`relative p-5 rounded-2xl border-2 transition-all duration-300 ${
              selectedIntention === intention.id
                ? `border-white bg-gradient-to-br ${intention.gradient} shadow-lg`
                : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
            }`}
          >
            <div
              className={`mb-3 ${
                selectedIntention === intention.id ? 'text-white' : 'text-purple-300'
              }`}
            >
              {intention.icon}
            </div>
            <h3
              className={`font-semibold text-lg ${
                selectedIntention === intention.id ? 'text-white' : 'text-white'
              }`}
            >
              {intention.label}
            </h3>
            <p
              className={`text-xs mt-1 ${
                selectedIntention === intention.id ? 'text-white/80' : 'text-purple-300'
              }`}
            >
              {intention.description}
            </p>

            {selectedIntention === intention.id && (
              <motion.div
                layoutId="selected-intention"
                className="absolute inset-0 rounded-2xl border-2 border-white"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: selectedIntention ? 1 : 0.5 }}
        transition={{ delay: 0.8 }}
        onClick={onContinue}
        disabled={!selectedIntention}
        className={`mt-10 px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 ${
          selectedIntention
            ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105'
            : 'bg-white/20 text-white/50 cursor-not-allowed'
        }`}
      >
        Continue
        <ArrowRight className="w-5 h-5" />
      </motion.button>
    </motion.div>
  );
};
