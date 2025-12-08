import React from 'react';
import { motion } from 'framer-motion';
import { Flame, AlertTriangle, Sparkles } from 'lucide-react';
import { useGamificationStore, getLanternColor, getLanternGlow, LANTERN_MAX_HEALTH } from '../../store/gamificationStore';
import { useThemeStore } from '../../store/themeStore';

interface LanternDisplayProps {
  size?: 'sm' | 'md' | 'lg';
  showStats?: boolean;
  onClick?: () => void;
}

export const LanternDisplay: React.FC<LanternDisplayProps> = ({
  size = 'md',
  showStats = true,
  onClick,
}) => {
  const { theme } = useThemeStore();
  const { 
    lanternHealth, 
    streakDays,
    getLanternStatus,
    getStreakStatus,
  } = useGamificationStore();

  const lanternStatus = getLanternStatus();
  const streakStatus = getStreakStatus();
  const lanternColor = getLanternColor(lanternHealth);
  const glowIntensity = getLanternGlow(lanternHealth);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const streakMessages = {
    active: `${streakDays} day streak`,
    at_risk: 'Streak at risk!',
    broken: 'Start a new streak',
  };

  return (
    <div className="flex flex-col items-center">
      {/* Lantern Icon */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`relative ${sizeClasses[size]} rounded-full flex items-center justify-center cursor-pointer`}
        style={{
          background: `radial-gradient(circle, ${lanternColor}40 0%, transparent 70%)`,
          boxShadow: lanternStatus !== 'extinguished' 
            ? `0 0 ${20 * glowIntensity}px ${lanternColor}60, 0 0 ${40 * glowIntensity}px ${lanternColor}30`
            : 'none',
        }}
      >
        {/* Animated glow ring */}
        {lanternStatus !== 'extinguished' && (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.2, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${lanternColor}30 0%, transparent 70%)`,
            }}
          />
        )}

        {/* Lantern icon */}
        <motion.div
          animate={lanternStatus === 'bright' ? {
            scale: [1, 1.05, 1],
          } : {}}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Flame
            className={iconSizes[size]}
            style={{ color: lanternColor }}
            fill={lanternStatus !== 'extinguished' ? lanternColor : 'none'}
          />
        </motion.div>

        {/* Warning indicator for critical/dim */}
        {(lanternStatus === 'critical' || lanternStatus === 'dim') && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1"
          >
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </motion.div>
        )}
      </motion.div>

      {/* Stats */}
      {showStats && (
        <div className="mt-3 text-center">
          {/* Health bar */}
          <div className="w-20 h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${lanternHealth}%` }}
              transition={{ duration: 0.5 }}
              className="h-full rounded-full"
              style={{ backgroundColor: lanternColor }}
            />
          </div>

          {/* Status text */}
          <p className={`text-xs font-medium ${
            lanternStatus === 'bright' ? 'text-emerald-500' :
            lanternStatus === 'dim' ? 'text-amber-500' :
            lanternStatus === 'critical' ? 'text-red-500' :
            'text-neutral-500'
          }`}>
            {lanternHealth}% Health
          </p>

          {/* Streak */}
          <p className={`text-xs mt-1 ${
            streakStatus === 'active' ? 'text-emerald-500' :
            streakStatus === 'at_risk' ? 'text-amber-500' :
            theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'
          }`}>
            {streakMessages[streakStatus]}
          </p>
        </div>
      )}
    </div>
  );
};

// Compact version for header/nav
export const LanternBadge: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const { theme } = useThemeStore();
  const { lanternHealth, sparks, getLanternStatus } = useGamificationStore();
  const lanternStatus = getLanternStatus();
  const lanternColor = getLanternColor(lanternHealth);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
        theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'
      }`}
    >
      <Flame
        className="w-4 h-4"
        style={{ color: lanternColor }}
        fill={lanternStatus !== 'extinguished' ? lanternColor : 'none'}
      />
      <span className={`text-sm font-medium ${
        theme === 'dark' ? 'text-white' : 'text-neutral-900'
      }`}>
        {lanternHealth}%
      </span>
      <div className="w-px h-4 bg-neutral-300 dark:bg-neutral-600" />
      <Sparkles className="w-4 h-4 text-gold-500" />
      <span className="text-sm font-medium text-gold-500">{sparks}</span>
    </motion.button>
  );
};

// Full stats card for profile/dashboard
export const LanternStatsCard: React.FC = () => {
  const { theme } = useThemeStore();
  const {
    lanternHealth,
    streakDays,
    sparks,
    totalSparksEarned,
    totalSignsLogged,
    totalMeditationsCompleted,
    longestStreak,
    getLanternStatus,
  } = useGamificationStore();

  const lanternStatus = getLanternStatus();
  const lanternColor = getLanternColor(lanternHealth);

  const stats = [
    { label: 'Current Streak', value: `${streakDays} days`, icon: '🔥' },
    { label: 'Longest Streak', value: `${longestStreak} days`, icon: '🏆' },
    { label: 'Signs Logged', value: totalSignsLogged, icon: '✨' },
    { label: 'Meditations', value: totalMeditationsCompleted, icon: '🧘' },
    { label: 'Total Sparks', value: totalSparksEarned, icon: '⚡' },
  ];

  return (
    <div className={`p-6 rounded-2xl border ${
      theme === 'dark' ? 'bg-neutral-800/50 border-neutral-700' : 'bg-white border-neutral-200'
    }`}>
      {/* Header with Lantern */}
      <div className="flex items-center gap-4 mb-6">
        <LanternDisplay size="lg" showStats={false} />
        <div>
          <h3 className={`text-lg font-bold ${
            theme === 'dark' ? 'text-white' : 'text-neutral-900'
          }`}>
            Your Lantern
          </h3>
          <p className={`text-sm ${
            lanternStatus === 'bright' ? 'text-emerald-500' :
            lanternStatus === 'dim' ? 'text-amber-500' :
            lanternStatus === 'critical' ? 'text-red-500' :
            'text-neutral-500'
          }`}>
            {lanternHealth}% Health • {
              lanternStatus === 'bright' ? 'Shining Bright' :
              lanternStatus === 'dim' ? 'Needs Attention' :
              lanternStatus === 'critical' ? 'Critical!' :
              'Extinguished'
            }
          </p>
        </div>
        <div className="ml-auto flex items-center gap-1 px-3 py-1.5 rounded-full bg-gold-500/10">
          <Sparkles className="w-5 h-5 text-gold-500" />
          <span className="text-lg font-bold text-gold-500">{sparks}</span>
        </div>
      </div>

      {/* Health Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}>
            Lantern Health
          </span>
          <span className={theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}>
            {lanternHealth}/{LANTERN_MAX_HEALTH}
          </span>
        </div>
        <div className="h-3 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${lanternHealth}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full"
            style={{ backgroundColor: lanternColor }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`p-3 rounded-xl ${
              theme === 'dark' ? 'bg-neutral-700/50' : 'bg-neutral-50'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span>{stat.icon}</span>
              <span className={`text-lg font-bold ${
                theme === 'dark' ? 'text-white' : 'text-neutral-900'
              }`}>
                {stat.value}
              </span>
            </div>
            <p className={`text-xs ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
