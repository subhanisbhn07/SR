import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { useJourneyStore } from '../../store/journeyStore';

export const LanternWidget = () => {
  const { userProgress } = useJourneyStore();
  const health = userProgress.lantern.health;

  const getFlameColor = () => {
    if (health >= 75) return 'text-accent-500';
    if (health >= 50) return 'text-yellow-500';
    if (health >= 25) return 'text-orange-500';
    return 'text-red-500';
  };

  const getFlameSize = () => {
    if (health >= 75) return 'w-8 h-8';
    if (health >= 50) return 'w-7 h-7';
    if (health >= 25) return 'w-6 h-6';
    return 'w-5 h-5';
  };

  return (
    <div className="relative group">
      <motion.div
        animate={{
          scale: health >= 75 ? [1, 1.1, 1] : [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative"
      >
        <Flame className={`${getFlameSize()} ${getFlameColor()} transition-all duration-300`} />
        {health < 50 && (
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0"
          >
            <Flame className={`${getFlameSize()} ${getFlameColor()}`} />
          </motion.div>
        )}
      </motion.div>

      {/* Tooltip */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-neutral-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
        <div className="font-semibold">Lantern Health: {health}%</div>
        <div className="text-xs text-neutral-400 mt-1">
          {health >= 75 && 'Burning bright! Keep it up!'}
          {health >= 50 && health < 75 && 'Steady flame. Stay consistent.'}
          {health >= 25 && health < 50 && 'Dimming. Time to meditate!'}
          {health < 25 && 'Nearly out! Rekindle soon!'}
        </div>
      </div>
    </div>
  );
};
