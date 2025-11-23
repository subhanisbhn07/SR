import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useJourneyStore } from '../../../features/journey/store/journeyStore';

export const SparksCounter = () => {
  const { userProgress } = useJourneyStore();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center gap-2 px-3 py-2 bg-neutral-800/50 rounded-lg border border-neutral-700 cursor-pointer group"
    >
      <Sparkles className="w-5 h-5 text-accent-500" />
      <span className="font-semibold text-white">{userProgress.sparks}</span>
      
      {/* Tooltip */}
      <div className="absolute top-full right-0 mt-2 px-3 py-2 bg-neutral-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
        <div className="font-semibold">Sparks Balance</div>
        <div className="text-xs text-neutral-400 mt-1">
          Earn through meditation & signs
        </div>
      </div>
    </motion.div>
  );
};
