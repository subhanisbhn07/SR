import { motion } from 'framer-motion';
import { Users, Send } from 'lucide-react';
import { useTribeStore } from '../store/tribeStore';
import { useState } from 'react';

export const TribeCampfire = () => {
  const { tribe, nudgeTribe, canNudge } = useTribeStore();
  const [showNudgeConfirm, setShowNudgeConfirm] = useState(false);
  const [nudgeSent, setNudgeSent] = useState(false);

  if (!tribe) return null;

  const handleNudge = () => {
    nudgeTribe();
    setNudgeSent(true);
    setShowNudgeConfirm(false);
    setTimeout(() => setNudgeSent(false), 3000);
  };

  const meditatedCount = tribe.members.filter(m => m.meditatedToday).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 backdrop-blur-sm rounded-2xl p-6 border border-neutral-700"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-accent-500" />
          <h3 className="text-lg font-semibold text-white">Your Tribe</h3>
        </div>
        <div className="text-sm text-neutral-400">
          {meditatedCount}/{tribe.members.length} meditated today
        </div>
      </div>

      {/* Tribe Name & Focus */}
      <div className="mb-4">
        <h4 className="text-white font-medium">{tribe.name}</h4>
        <p className="text-sm text-neutral-400">Focus: {tribe.focus}</p>
      </div>

      {/* Campfire Visual */}
      <div className="relative h-48 mb-4 flex items-end justify-center">
        {/* Fire in center */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
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
            className="w-16 h-16 rounded-full bg-gradient-to-t from-accent-600 via-accent-500 to-yellow-400 blur-sm"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3,
            }}
            className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-t from-accent-500 to-yellow-300 blur-md"
          />
        </div>

        {/* Member avatars in circle around fire */}
        {tribe.members.map((member, index) => {
          const angle = (index * 360) / tribe.members.length - 90;
          const radius = 80;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="absolute"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="relative">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className={`w-12 h-12 rounded-full border-2 transition-all ${
                    member.meditatedToday
                      ? 'border-accent-500 shadow-lg shadow-accent-500/50'
                      : 'border-neutral-600 opacity-50 grayscale'
                  }`}
                />
                {member.meditatedToday && (
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 rounded-full border-2 border-accent-500"
                  />
                )}
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <p className="text-xs text-white font-medium">{member.name.split(' ')[0]}</p>
                <p className="text-xs text-neutral-500 text-center">Day {member.currentStep}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tribe Score */}
      <div className="mb-4 p-3 bg-neutral-900/50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm text-neutral-400">Tribe Score</span>
          <span className="text-lg font-bold text-accent-500">{tribe.tribeScore}</span>
        </div>
        <div className="mt-2 h-2 bg-neutral-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((tribe.tribeScore / 500) * 100, 100)}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-accent-500 to-primary-500"
          />
        </div>
      </div>

      {/* Nudge Button */}
      {!showNudgeConfirm ? (
        <button
          onClick={() => setShowNudgeConfirm(true)}
          disabled={!canNudge() || nudgeSent}
          className="w-full px-4 py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-neutral-700 disabled:text-neutral-500 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          {nudgeSent ? 'Nudge Sent!' : canNudge() ? 'Nudge Tribe' : 'Nudge on Cooldown (24h)'}
        </button>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-neutral-300 text-center">
            Send a gentle reminder to tribe members who haven't meditated today?
          </p>
          <div className="flex gap-2">
            <button
              onClick={handleNudge}
              className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
            >
              Send Nudge
            </button>
            <button
              onClick={() => setShowNudgeConfirm(false)}
              className="flex-1 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};
