import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Sparkles } from 'lucide-react';
import { useMeditationStore, SESSION_LENGTH_OPTIONS } from '../../store/meditationStore';
import { useThemeStore } from '../../store/themeStore';

interface SessionLengthSelectorProps {
  compact?: boolean;
}

export const SessionLengthSelector: React.FC<SessionLengthSelectorProps> = ({
  compact = false,
}) => {
  const { theme } = useThemeStore();
  const { selectedSessionLength, setSessionLength } = useMeditationStore();

  if (compact) {
    return (
      <div className="flex gap-2">
        {SESSION_LENGTH_OPTIONS.map((option) => (
          <button
            key={option.type}
            onClick={() => setSessionLength(option.type)}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedSessionLength === option.type
                ? 'bg-primary-500 text-white'
                : theme === 'dark'
                  ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            {option.durationMinutes}m
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Clock className={`w-5 h-5 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`} />
        <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
          Session Length
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {SESSION_LENGTH_OPTIONS.map((option) => {
          const isSelected = selectedSessionLength === option.type;
          
          return (
            <motion.button
              key={option.type}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSessionLength(option.type)}
              className={`p-4 rounded-xl text-left transition-all ${
                isSelected
                  ? 'bg-primary-500 text-white ring-2 ring-primary-500/50'
                  : theme === 'dark'
                    ? 'bg-neutral-800 hover:bg-neutral-700'
                    : 'bg-neutral-50 hover:bg-neutral-100 border border-neutral-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-2xl font-bold ${isSelected ? 'text-white' : theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  {option.durationMinutes}
                </span>
                <span className={`text-sm ${isSelected ? 'text-white/80' : theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  min
                </span>
              </div>
              <p className={`font-medium text-sm mb-1 ${isSelected ? 'text-white' : theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                {option.label}
              </p>
              <p className={`text-xs mb-2 ${isSelected ? 'text-white/70' : theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>
                {option.description}
              </p>
              <div className={`flex items-center gap-1 text-xs ${isSelected ? 'text-gold-300' : 'text-gold-500'}`}>
                <Sparkles className="w-3 h-3" />
                <span>+{option.sparksReward} sparks</span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
