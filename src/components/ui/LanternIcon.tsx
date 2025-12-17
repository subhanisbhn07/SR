import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

/**
 * SignRoad Living Lantern Component (Design System v5.0)
 * "Soft Mystical Minimalism" Framework
 *
 * Visual States by Lantern Points:
 * - 80-100 (Bright): Full glow, gentle flicker (2s)
 * - 60-79 (Steady): Medium glow, slower flicker (3s)
 * - 40-59 (Dimming): Reduced glow, very slow flicker (4s)
 * - 20-39 (Fading): Minimal glow, ember pulse
 * - 0-19 (Ember): Barely visible, very slow pulse (NEVER fully extinguishes)
 *
 * Size Variants:
 * - xs: 16px (compact contexts)
 * - sm: 32px (Header - Mini)
 * - md: 80px (Home Screen - Primary)
 * - lg: 120px (Achievement Modal - Hero)
 */
interface LanternIconProps {
  health: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  showTooltip?: boolean;
  streakDays?: number;
  isRekindling?: boolean;
}

export const LanternIcon: React.FC<LanternIconProps> = ({
  health,
  size = 'md',
  showLabel = false,
  showTooltip = false,
  streakDays = 0,
  isRekindling = false
}) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const getState = () => {
    if (health >= 80) return 'bright';
    if (health >= 60) return 'steady';
    if (health >= 40) return 'dimming';
    if (health >= 20) return 'fading';
    return 'ember';
  };

  const state = getState();

  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-8 h-8',
    md: 'w-20 h-20',
    lg: 'w-30 h-30',
  };

  // Design Guide Color Specifications
  const flameGradients = {
    bright: { from: '#FFFBF0', to: '#E8B54A' },
    steady: { from: '#E8B54A', to: '#D4A43A' },
    dimming: { from: '#D4A43A', to: '#B8923A' },
    fading: { from: '#A07830', to: '#886828' },
    ember: { from: '#705820', to: '#584818' },
  };

  const glowShadows = {
    bright: '0 0 30px rgba(232, 181, 74, 0.6)',
    steady: '0 0 20px rgba(232, 181, 74, 0.4)',
    dimming: '0 0 15px rgba(184, 146, 58, 0.3)',
    fading: '0 0 8px rgba(136, 104, 40, 0.2)',
    ember: '0 0 4px rgba(88, 72, 24, 0.1)',
  };

  const animationDurations = {
    bright: 2,
    steady: 3,
    dimming: 4,
    fading: 5,
    ember: 6,
  };

  const opacityRange = {
    bright: { min: 0.9, max: 1 },
    steady: { min: 0.85, max: 0.95 },
    dimming: { min: 0.8, max: 0.9 },
    fading: { min: 0.8, max: 0.9 },
    ember: { min: 0.8, max: 0.9 },
  };

  const stateLabels = {
    bright: 'Bright',
    steady: 'Steady',
    dimming: 'Dimming',
    fading: 'Fading',
    ember: 'Ember',
  };

  const stateMessages = {
    bright: 'Your Lantern is shining bright! Keep up the amazing work.',
    steady: 'Your Lantern is glowing steadily. Stay consistent!',
    dimming: 'Your Lantern is dimming. A quick session will brighten it.',
    fading: 'Your Lantern is fading. Come back to rekindle it.',
    ember: 'Your Lantern is an ember, but it never dies. Rekindle your practice.',
  };

  return (
    <div className="relative flex items-center gap-2">
      <motion.div
        className={`relative ${sizeClasses[size]} flex items-center justify-center cursor-pointer`}
        animate={isRekindling ? {
          scale: [1, 1.05, 1.1, 1],
          opacity: [0.8, 0.9, 1, 1]
        } : {}}
        transition={isRekindling ? {
          duration: 1.5,
          ease: 'easeOut'
        } : {}}
        onMouseEnter={() => showTooltip && setIsTooltipVisible(true)}
        onMouseLeave={() => showTooltip && setIsTooltipVisible(false)}
        onClick={() => showTooltip && setIsTooltipVisible(!isTooltipVisible)}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full"
          style={{
            filter: `drop-shadow(${glowShadows[state]})`
          }}
        >
          {/* Flame with flicker animation */}
          <motion.path
            d="M12 2C12 2 8 6 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 6 12 2 12 2Z"
            fill="url(#flameGradient)"
            animate={{
              opacity: [opacityRange[state].min, opacityRange[state].max, opacityRange[state].min],
            }}
            transition={{
              duration: animationDurations[state],
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className={isRekindling ? 'animate-lantern-rekindle' : ''}
          />

          {/* Lantern base */}
          <path
            d="M10 14V20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20V14"
            stroke="#78716c"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="#a8a29e"
          />
          <rect x="9" y="13" width="6" height="2" rx="0.5" fill="#78716c" />

          {/* Gradient definitions */}
          <defs>
            <radialGradient id="flameGradient" cx="12" cy="8" r="8" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={flameGradients[state].from} />
              <stop offset="100%" stopColor={flameGradients[state].to} />
            </radialGradient>
          </defs>
        </svg>

        {/* Rekindling particle effects */}
        {isRekindling && (
          <>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gold rounded-full"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1
                }}
                animate={{
                  x: Math.cos(i * 30 * Math.PI / 180) * 40,
                  y: Math.sin(i * 30 * Math.PI / 180) * 40,
                  opacity: 0,
                  scale: 0.5
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.6,
                  ease: 'easeOut'
                }}
              />
            ))}
          </>
        )}
      </motion.div>

      {showLabel && (
        <div className="flex flex-col">
          <span className={`text-xs font-medium ${
            state === 'bright' ? 'text-gold' :
            state === 'steady' ? 'text-gold-dark' :
            state === 'dimming' ? 'text-gold-darker' :
            state === 'fading' ? 'text-gold-800' :
            'text-gold-900'
          }`}>
            {stateLabels[state]}
          </span>
          <span className="text-xs text-stone">{health}/100</span>
        </div>
      )}

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && isTooltipVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-cosmos border border-white/10 rounded-xl p-4 shadow-xl z-50"
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-cosmos border-l border-t border-white/10 rotate-45" />

            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-white">Your Lantern</h4>
                <span className={`text-sm font-medium ${
                  state === 'bright' ? 'text-gold' :
                  state === 'steady' ? 'text-gold-dark' :
                  state === 'dimming' ? 'text-gold-darker' :
                  state === 'fading' ? 'text-gold-800' :
                  'text-gold-900'
                }`}>
                  {health}/100
                </span>
              </div>

              <p className="text-sm text-neutral-300 mb-3">
                {stateMessages[state]}
              </p>

              {streakDays > 0 && (
                <div className="bg-white/5 rounded-lg p-3 mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">🔥</span>
                    <span className="font-medium text-white">{streakDays} day streak</span>
                  </div>
                  <p className="text-xs text-neutral-400">Keep the flame alive!</p>
                </div>
              )}

              <div className="text-xs text-neutral-400 flex items-start gap-2">
                <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>Your Lantern dims gently when you miss days, but never dies. Every action brightens it.</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
