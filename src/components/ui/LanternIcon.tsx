import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

interface LanternIconProps {
  health: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  showTooltip?: boolean;
  streakDays?: number;
}

export const LanternIcon: React.FC<LanternIconProps> = ({ 
  health, 
  size = 'md',
  showLabel = false,
  showTooltip = false,
  streakDays = 0
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const getState = () => {
    if (health >= 70) return 'bright';
    if (health >= 50) return 'glowing';
    if (health >= 30) return 'dimming';
    return 'needs-rekindling';
  };

  const getStreakChapter = () => {
    if (streakDays >= 22) return { name: 'Beacon', emoji: '🌟', description: 'You are a guiding light' };
    if (streakDays >= 8) return { name: 'Steady Flame', emoji: '🔥', description: 'Your practice is strong' };
    return { name: 'Kindling', emoji: '✨', description: 'Building your flame' };
  };

  const state = getState();
  const streakChapter = getStreakChapter();

  const sizeClasses = {
    xs: 'w-4 h-4',
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

  const stateMessages = {
    bright: 'Your Lantern is shining bright! Keep up the amazing work.',
    glowing: 'Your Lantern is glowing steadily. Stay consistent!',
    dimming: 'Your Lantern is dimming. A quick session will brighten it.',
    'needs-rekindling': 'Your Lantern needs rekindling. Start a session to bring it back.',
  };

  return (
    <div className="relative flex items-center gap-2">
      <motion.div
        className={`relative ${sizeClasses[size]} flex items-center justify-center cursor-pointer`}
        animate={state === 'bright' ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        onMouseEnter={() => showTooltip && setIsTooltipVisible(true)}
        onMouseLeave={() => showTooltip && setIsTooltipVisible(false)}
        onClick={() => showTooltip && setIsTooltipVisible(!isTooltipVisible)}
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

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && isTooltipVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-neutral-800 border border-neutral-700 rounded-xl p-4 shadow-xl z-50"
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-neutral-800 border-l border-t border-neutral-700 rotate-45" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Your Lantern</h4>
                <span className={`text-sm font-medium ${
                  state === 'bright' ? 'text-yellow-400' :
                  state === 'glowing' ? 'text-orange-400' :
                  state === 'dimming' ? 'text-orange-600' :
                  'text-red-500'
                }`}>
                  {health}/100
                </span>
              </div>
              
              <p className="text-sm text-neutral-400 mb-3">
                {stateMessages[state]}
              </p>

              {streakDays > 0 && (
                <div className="bg-neutral-900/50 rounded-lg p-3 mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{streakChapter.emoji}</span>
                    <span className="font-medium text-white">{streakChapter.name}</span>
                  </div>
                  <p className="text-xs text-neutral-500">{streakChapter.description}</p>
                  <p className="text-xs text-neutral-400 mt-1">{streakDays} day streak</p>
                </div>
              )}

              <div className="text-xs text-neutral-500 flex items-start gap-2">
                <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>Your Lantern dims gently when you miss days, but never resets to zero. Every action brightens it.</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
