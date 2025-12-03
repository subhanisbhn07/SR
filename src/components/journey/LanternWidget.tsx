import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useJourneyStore } from '../../store/journeyStore';
import { LANTERN_LEVELS } from '../../types/journey';

interface LanternWidgetProps {
  compact?: boolean;
}

export const LanternWidget: React.FC<LanternWidgetProps> = ({ compact = false }) => {
  const { user } = useJourneyStore();

  if (!user) return null;

  const getLanternLevel = () => {
    const health = user.progress.lanternHealth;
    if (health >= LANTERN_LEVELS.RADIANT.min) return LANTERN_LEVELS.RADIANT;
    if (health >= LANTERN_LEVELS.GLOWING.min) return LANTERN_LEVELS.GLOWING;
    if (health >= LANTERN_LEVELS.DIM.min) return LANTERN_LEVELS.DIM;
    return LANTERN_LEVELS.FADING;
  };

  const lanternLevel = getLanternLevel();
  const health = user.progress.lanternHealth;

  if (compact) {
    return (
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={`w-10 h-10 rounded-full bg-gradient-to-br ${lanternLevel.color} flex items-center justify-center`}
        style={{
          boxShadow: `0 0 ${health / 4}px ${health / 8}px rgba(251, 191, 36, ${health / 100})`,
        }}
      >
        <span className="text-lg">🏮</span>
      </motion.div>
    );
  }

  return (
    <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
      <div className="flex items-center gap-4">
        {/* Lantern icon */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`w-16 h-16 rounded-full bg-gradient-to-br ${lanternLevel.color} flex items-center justify-center`}
          style={{
            boxShadow: `0 0 ${health / 2}px ${health / 4}px rgba(251, 191, 36, ${health / 100})`,
          }}
        >
          <span className="text-3xl">🏮</span>
        </motion.div>

        {/* Stats */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-semibold">{lanternLevel.label}</span>
            <span className="text-purple-300 text-sm">{health}%</span>
          </div>

          {/* Health bar */}
          <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${health}%` }}
              transition={{ duration: 0.5 }}
              className={`h-full rounded-full bg-gradient-to-r ${lanternLevel.color}`}
            />
          </div>

          {/* Sparks */}
          <div className="flex items-center gap-1 text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span className="font-semibold">{user.progress.sparks}</span>
            <span className="text-purple-300 text-sm">Sparks</span>
          </div>
        </div>
      </div>

      {/* Low health warning */}
      {health < 50 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl"
        >
          <p className="text-orange-300 text-sm">
            Your Lantern is dimming. Complete today's meditation to restore its light.
          </p>
        </motion.div>
      )}
    </div>
  );
};
