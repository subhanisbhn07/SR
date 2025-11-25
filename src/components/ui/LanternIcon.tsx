import React from 'react';
import { motion } from 'framer-motion';

interface LanternIconProps {
  health: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const LanternIcon: React.FC<LanternIconProps> = ({ 
  health, 
  size = 'md',
  showLabel = false 
}) => {
  const getState = () => {
    if (health >= 70) return 'bright';
    if (health >= 50) return 'glowing';
    if (health >= 30) return 'dimming';
    return 'needs-rekindling';
  };

  const state = getState();

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const glowIntensity = {
    bright: 'shadow-[0_0_20px_rgba(250,165,70,0.8)]',
    glowing: 'shadow-[0_0_12px_rgba(250,165,70,0.5)]',
    dimming: 'shadow-[0_0_6px_rgba(250,165,70,0.3)]',
    'needs-rekindling': 'shadow-none',
  };

  const flameColors = {
    bright: 'from-yellow-300 via-orange-400 to-orange-500',
    glowing: 'from-yellow-400 via-orange-500 to-orange-600',
    dimming: 'from-orange-400 via-orange-600 to-red-600',
    'needs-rekindling': 'from-red-500 via-red-700 to-red-900',
  };

  const stateLabels = {
    bright: 'Bright',
    glowing: 'Glowing',
    dimming: 'Dimming',
    'needs-rekindling': 'Rekindle',
  };

  return (
    <div className="flex items-center gap-2">
      <motion.div
        className={`relative ${sizeClasses[size]} flex items-center justify-center`}
        animate={state === 'bright' ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`w-full h-full ${glowIntensity[state]} rounded-full`}
        >
          <path
            d="M12 2C12 2 8 6 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 6 12 2 12 2Z"
            className={`fill-current bg-gradient-to-b ${flameColors[state]}`}
            style={{
              fill: state === 'bright' ? '#fbbf24' : 
                    state === 'glowing' ? '#f97316' : 
                    state === 'dimming' ? '#ea580c' : '#dc2626'
            }}
          />
          <motion.path
            d="M12 2C12 2 8 6 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 6 12 2 12 2Z"
            fill="url(#flameGradient)"
            animate={state !== 'needs-rekindling' ? { 
              opacity: [0.8, 1, 0.8],
              scale: [1, 1.02, 1]
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <path
            d="M10 14V20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20V14"
            stroke="#78716c"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="#a8a29e"
          />
          <rect x="9" y="13" width="6" height="2" rx="0.5" fill="#78716c" />
          <defs>
            <linearGradient id="flameGradient" x1="12" y1="2" x2="12" y2="14" gradientUnits="userSpaceOnUse">
              <stop stopColor={state === 'bright' ? '#fef08a' : state === 'glowing' ? '#fcd34d' : state === 'dimming' ? '#fdba74' : '#fca5a5'} />
              <stop offset="0.5" stopColor={state === 'bright' ? '#fbbf24' : state === 'glowing' ? '#f97316' : state === 'dimming' ? '#ea580c' : '#dc2626'} />
              <stop offset="1" stopColor={state === 'bright' ? '#f97316' : state === 'glowing' ? '#ea580c' : state === 'dimming' ? '#b91c1c' : '#7f1d1d'} />
            </linearGradient>
          </defs>
        </svg>
        {state === 'bright' && (
          <motion.div
            className="absolute inset-0 rounded-full bg-yellow-400/20"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.div>
      {showLabel && (
        <div className="flex flex-col">
          <span className={`text-xs font-medium ${
            state === 'bright' ? 'text-yellow-400' :
            state === 'glowing' ? 'text-orange-400' :
            state === 'dimming' ? 'text-orange-600' :
            'text-red-500'
          }`}>
            {stateLabels[state]}
          </span>
          <span className="text-xs text-neutral-500">{health}</span>
        </div>
      )}
    </div>
  );
};
