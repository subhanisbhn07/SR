import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { useJourneyStore } from '../../store/journeyStore';

export const StreakDisplay = () => {
  const { userProgress } = useJourneyStore();

  if (userProgress.streak === 0) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg border border-orange-500/30"
    >
      <Flame className="w-5 h-5 text-orange-500" />
      <span className="font-semibold text-white">{userProgress.streak} day streak</span>
    </motion.div>
  );
};
