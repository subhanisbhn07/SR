import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

/**
 * Living Lantern Icon Component
 * Aligned with Master Documentation Section 5.4
 *
 * Brightness States (CORRECTED per master doc):
 * - 80-100 points: Bright (Active today)
 * - 60-79 points: Steady (1 day missed)
 * - 40-59 points: Dimming (2 days missed)
 * - 20-39 points: Fading (3+ days missed)
 * - 0-19 points: Ember (7+ days missed, NEVER extinguishes)
 *
 * Colors: Luminous Gold (#E8B54A) per master doc
 */

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

  // CORRECTED: Brightness thresholds per master doc Section 5.4
  const getState = () => {
    if (health >= 80) return 'bright';        // 80-100: Active today
    if (health >= 60) return 'steady';        // 60-79: 1 day missed
    if (health >= 40) return 'dimming';       // 40-59: 2 days missed
    if (health >= 20) return 'fading';        // 20-39: 3+ days missed
    return 'ember';                           // 0-19: 7+ days missed
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

  // CORRECTED: Glow intensities using Luminous Gold per master doc Section 5.4
  const glowIntensity = {
    bright: 'shadow-lantern-bright',    // 0 0 30px rgba(232, 181, 74, 0.6)
    steady: 'shadow-lantern-steady',    // 0 0 20px rgba(232, 181, 74, 0.4)
    dimming: 'shadow-lantern-dimming',  // 0 0 15px rgba(184, 146, 58, 0.3)
    fading: 'shadow-lantern-fading',    // 0 0 8px rgba(136, 104, 40, 0.2)
    ember: 'shadow-none',
  };

  // CORRECTED: Using Luminous Gold (#E8B54A) and proper gradients
  const flameColors = {
    bright: { start: '#FFFBF0', mid: '#E8B54A', end: '#DBA940' },     // 100% Bright
    steady: { start: '#E8B54A', mid: '#DBA940', end: '#C99A38' },     // 80% Bright
    dimming: { start: '#DBA940', mid: '#C99A38', end: '#B8923A' },    // 60% Bright
    fading: { start: '#A07830', mid: '#886828', end: '#705820' },     // 40% Bright
    ember: { start: '#705820', mid: '#584818', end: '#3D3210' },      // 20% Bright (ember)
  };

  const stateLabels = {
    bright: 'Bright',
    steady: 'Steady',
    dimming: 'Dimming',
    fading: 'Fading',
    ember: 'Rekindle',
  };

  const stateMessages = {
    bright: 'Your Lantern is shining bright! Keep up the amazing work.',
    steady: 'Your Lantern is glowing steadily. Stay consistent!',
    dimming: 'Your Lantern is dimming. A quick session will brighten it.',
    fading: 'Your Lantern is fading. Return soon to restore your flame.',
    ember: 'Your Lantern needs rekindling. Start a session to bring it back.',
  };

  const currentColors = flameColors[state];

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
          {/* Flame shape */}
          <defs>
            <linearGradient id={`flameGradient-${state}`} x1="12" y1="2" x2="12" y2="14" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={currentColors.start} />
              <stop offset="50%" stopColor={currentColors.mid} />
              <stop offset="100%" stopColor={currentColors.end} />
            </linearGradient>
          </defs>

          {/* Animated flame */}
          <motion.path
            d="M12 2C12 2 8 6 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 6 12 2 12 2Z"
            fill={`url(#flameGradient-${state})`}
            animate={state !== 'ember' ? {
              opacity: [0.85, 1, 0.85],
            } : {}}
            transition={{
              duration: state === 'bright' ? 2 : state === 'steady' ? 3 : 4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Lantern base (wick holder) */}
          <rect x="9" y="13" width="6" height="2" rx="0.5" fill="#78716c" />

          {/* Lantern stem */}
          <path
            d="M10 14V20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20V14"
            stroke="#78716c"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="#a8a29e"
          />
        </svg>

        {/* Bright state glow animation */}
        {state === 'bright' && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: 'rgba(232, 181, 74, 0.2)' }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.div>

      {showLabel && (
        <div className="flex flex-col">
          <span className={`text-xs font-medium ${
            state === 'bright' ? 'text-gold-500' :
            state === 'steady' ? 'text-gold-600' :
            state === 'dimming' ? 'text-gold-700' :
            state === 'fading' ? 'text-gold-800' :
            'text-gold-900'
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
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-cosmos text-neutral-snow border border-neutral-700 rounded-xl p-4 shadow-xl z-50"
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-cosmos border-l border-t border-neutral-700 rotate-45" />

            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Your Lantern</h4>
                <span className={`text-sm font-medium ${
                  state === 'bright' ? 'text-gold-400' :
                  state === 'steady' ? 'text-gold-500' :
                  state === 'dimming' ? 'text-gold-600' :
                  state === 'fading' ? 'text-gold-700' :
                  'text-gold-800'
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
