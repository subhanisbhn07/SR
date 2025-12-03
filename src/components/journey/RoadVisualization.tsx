import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Check, Play, Sparkles } from 'lucide-react';
import { ROAD_STEPS, LANTERN_LEVELS } from '../../types/journey';
import { useJourneyStore } from '../../store/journeyStore';

interface RoadVisualizationProps {
  onDaySelect: (day: number) => void;
}

export const RoadVisualization: React.FC<RoadVisualizationProps> = ({ onDaySelect }) => {
  const { user, getDayStatus, canAccessDay } = useJourneyStore();
  const currentDayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to current day on mount
    if (currentDayRef.current) {
      currentDayRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [user?.progress.currentDay]);

  if (!user) return null;

  const getLanternLevel = () => {
    const health = user.progress.lanternHealth;
    if (health >= LANTERN_LEVELS.RADIANT.min) return LANTERN_LEVELS.RADIANT;
    if (health >= LANTERN_LEVELS.GLOWING.min) return LANTERN_LEVELS.GLOWING;
    if (health >= LANTERN_LEVELS.DIM.min) return LANTERN_LEVELS.DIM;
    return LANTERN_LEVELS.FADING;
  };

  const lanternLevel = getLanternLevel();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black overflow-hidden">
      {/* Header with stats */}
      <div className="sticky top-0 z-20 bg-gradient-to-b from-indigo-950 to-transparent pb-8 pt-4 px-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {/* Day indicator */}
          <div className="text-white">
            <p className="text-sm text-purple-300">Day</p>
            <p className="text-2xl font-bold">{user.progress.currentDay}</p>
          </div>

          {/* Lantern */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`w-14 h-14 rounded-full bg-gradient-to-br ${lanternLevel.color} flex items-center justify-center shadow-lg`}
            style={{
              boxShadow: `0 0 ${user.progress.lanternHealth / 2}px ${user.progress.lanternHealth / 4}px rgba(251, 191, 36, ${user.progress.lanternHealth / 100})`,
            }}
          >
            <span className="text-2xl">🏮</span>
          </motion.div>

          {/* Sparks */}
          <div className="text-white text-right">
            <p className="text-sm text-purple-300">Sparks</p>
            <div className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <p className="text-2xl font-bold">{user.progress.sparks}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Road path */}
      <div className="relative px-4 pb-32">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-500/50 via-purple-500/50 to-transparent -translate-x-1/2" />

        {/* Day nodes */}
        <div className="relative max-w-md mx-auto space-y-8">
          {ROAD_STEPS.map((step, index) => {
            const status = getDayStatus(step.day);
            const canAccess = canAccessDay(step.day);
            const isCurrent = step.day === user.progress.currentDay;
            const isLocked = status === 'locked' || (!step.isFree && !user.isSeeker);
            const isPremiumLocked = !step.isFree && !user.isSeeker && step.day <= user.progress.currentDay;

            return (
              <motion.div
                key={step.day}
                ref={isCurrent ? currentDayRef : null}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Node */}
                <motion.button
                  onClick={() => canAccess && onDaySelect(step.day)}
                  disabled={!canAccess}
                  whileHover={canAccess ? { scale: 1.05 } : {}}
                  whileTap={canAccess ? { scale: 0.95 } : {}}
                  className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                    status === 'completed'
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30'
                      : isCurrent
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/30 animate-pulse'
                      : isPremiumLocked
                      ? 'bg-gradient-to-br from-gray-600 to-gray-700 border-2 border-amber-500/50'
                      : 'bg-white/10 border-2 border-white/20'
                  }`}
                >
                  {status === 'completed' ? (
                    <Check className="w-8 h-8 text-white" />
                  ) : isCurrent ? (
                    <Play className="w-8 h-8 text-white ml-1" />
                  ) : isPremiumLocked ? (
                    <Lock className="w-6 h-6 text-amber-400" />
                  ) : isLocked ? (
                    <span className="text-2xl opacity-50">{step.signEmoji}</span>
                  ) : (
                    <span className="text-2xl">{step.signEmoji}</span>
                  )}

                  {/* Pulsing ring for current day */}
                  {isCurrent && (
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeOut',
                      }}
                      className="absolute inset-0 rounded-full border-2 border-purple-400"
                    />
                  )}
                </motion.button>

                {/* Content card */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? 'ml-4 text-left' : 'mr-4 text-right'
                  }`}
                >
                  <motion.div
                    whileHover={canAccess ? { scale: 1.02 } : {}}
                    onClick={() => canAccess && onDaySelect(step.day)}
                    className={`p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                      status === 'completed'
                        ? 'bg-amber-500/10 border border-amber-500/30'
                        : isCurrent
                        ? 'bg-purple-500/20 border border-purple-500/50'
                        : isPremiumLocked
                        ? 'bg-gray-800/50 border border-amber-500/30'
                        : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          step.isFree
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-amber-500/20 text-amber-400'
                        }`}
                      >
                        {step.isFree ? 'Free' : 'Seeker'}
                      </span>
                      <span className="text-xs text-purple-300">Day {step.day}</span>
                    </div>
                    <h3
                      className={`font-semibold ${
                        isLocked && !isPremiumLocked ? 'text-white/50' : 'text-white'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm mt-1 ${
                        isLocked && !isPremiumLocked ? 'text-purple-300/50' : 'text-purple-300'
                      }`}
                    >
                      {step.theme}
                    </p>
                    {isPremiumLocked && (
                      <p className="text-xs text-amber-400 mt-2 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Become a Seeker to unlock
                      </p>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Fog overlay for locked days */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};
