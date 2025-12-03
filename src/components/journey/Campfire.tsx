import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send } from 'lucide-react';
import { useJourneyStore } from '../../store/journeyStore';
import { AVATAR_EMOJIS } from '../../types/journey';

interface CampfireProps {
  onClose: () => void;
}

export const Campfire: React.FC<CampfireProps> = ({ onClose }) => {
  const { user, sendSpark, joinTribe } = useJourneyStore();

  // Auto-join tribe if not in one (Day 4+)
  React.useEffect(() => {
    if (user && user.progress.currentDay >= 4 && !user.tribe) {
      joinTribe();
    }
  }, [user, joinTribe]);

  if (!user) return null;

  // Show locked state if before Day 4
  if (user.progress.currentDay < 4) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-900 rounded-3xl p-8 max-w-sm w-full text-center border border-white/10"
        >
          <div className="text-6xl mb-4">🔥</div>
          <h2 className="text-2xl font-bold text-white mb-2">The Campfire Awaits</h2>
          <p className="text-purple-300 mb-6">
            On Day 4, you'll be placed in a Tribe of 5 fellow Wanderers. Together, you'll walk the Road.
          </p>
          <div className="bg-white/5 rounded-xl p-4 mb-6">
            <p className="text-sm text-purple-300">
              <span className="text-amber-400 font-semibold">
                {4 - user.progress.currentDay} days
              </span>{' '}
              until your Tribe forms
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-full py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors"
          >
            Continue Your Journey
          </button>
        </motion.div>
      </motion.div>
    );
  }

  const tribe = user.tribe;
  if (!tribe) return null;

  const meditatedCount = tribe.members.filter((m) => m.meditatedToday).length;
  const allMeditated = meditatedCount === tribe.members.length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-black z-50 overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-b from-indigo-950 to-transparent p-4 z-10">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <h1 className="text-xl font-bold text-white">Your Campfire</h1>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 pb-20">
        {/* Campfire visualization */}
        <div className="relative h-80 flex items-center justify-center mb-8">
          {/* Fire glow */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute w-32 h-32 bg-orange-500/30 rounded-full blur-3xl"
          />

          {/* Central fire */}
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute text-6xl"
          >
            🔥
          </motion.div>

          {/* Tribe members around the fire */}
          {tribe.members.map((member, index) => {
            const angle = (index * 72 - 90) * (Math.PI / 180); // 72 degrees apart, starting from top
            const radius = 100;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            const isCurrentUser = member.id === user.id;

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${x}px - 24px)`,
                  top: `calc(50% + ${y}px - 24px)`,
                }}
                className="flex flex-col items-center"
              >
                {/* Stone/seat */}
                <motion.button
                  onClick={() => !member.meditatedToday && !isCurrentUser && sendSpark(member.id)}
                  disabled={member.meditatedToday || isCurrentUser}
                  whileHover={!member.meditatedToday && !isCurrentUser ? { scale: 1.1 } : {}}
                  whileTap={!member.meditatedToday && !isCurrentUser ? { scale: 0.95 } : {}}
                  className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    member.meditatedToday
                      ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30'
                      : 'bg-gray-700 border-2 border-gray-600'
                  } ${isCurrentUser ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-900' : ''}`}
                >
                  <span className="text-2xl">{AVATAR_EMOJIS[member.avatar]}</span>

                  {/* Flame indicator */}
                  {member.meditatedToday && (
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="absolute -top-2 text-sm"
                    >
                      🔥
                    </motion.div>
                  )}

                  {/* Send spark indicator */}
                  {!member.meditatedToday && !isCurrentUser && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                      <Send className="w-3 h-3 text-white" />
                    </div>
                  )}
                </motion.button>

                {/* Name */}
                <p className="text-xs text-purple-300 mt-2 text-center max-w-16 truncate">
                  {isCurrentUser ? 'You' : member.odonym.split(' ')[0]}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="bg-white/5 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-purple-300">Tribe Progress</span>
            <span className="text-sm text-white font-medium">
              {meditatedCount}/{tribe.members.length}
            </span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(meditatedCount / tribe.members.length) * 100}%` }}
              transition={{ duration: 0.5 }}
              className={`h-full rounded-full ${
                allMeditated
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }`}
            />
          </div>
          {allMeditated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 flex items-center justify-center gap-2 text-amber-400"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Tribe Bonus: +5 Sparks!</span>
            </motion.div>
          )}
        </div>

        {/* Tribe info */}
        <div className="bg-white/5 rounded-2xl p-4 mb-6">
          <h3 className="text-white font-semibold mb-3">How Tribes Work</h3>
          <ul className="space-y-2 text-sm text-purple-300">
            <li className="flex items-start gap-2">
              <span className="text-amber-400">•</span>
              <span>5 anonymous Wanderers walking together</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400">•</span>
              <span>See who's meditated today (no names, no chat)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400">•</span>
              <span>Tap a cold stone to send a gentle spark of encouragement</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-400">•</span>
              <span>When all 5 complete the day, everyone gets +5 bonus Sparks</span>
            </li>
          </ul>
        </div>

        {/* Tribe members list */}
        <div className="bg-white/5 rounded-2xl p-4">
          <h3 className="text-white font-semibold mb-3">Your Tribe</h3>
          <div className="space-y-3">
            {tribe.members.map((member) => {
              const isCurrentUser = member.id === user.id;
              return (
                <div
                  key={member.id}
                  className={`flex items-center justify-between p-3 rounded-xl ${
                    isCurrentUser ? 'bg-purple-500/20 border border-purple-500/30' : 'bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{AVATAR_EMOJIS[member.avatar]}</span>
                    <div>
                      <p className="text-white text-sm font-medium">
                        {isCurrentUser ? 'You' : member.odonym}
                      </p>
                      <p className="text-xs text-purple-300">Day {member.currentDay}</p>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      member.meditatedToday
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}
                  >
                    {member.meditatedToday ? '✓ Done' : 'Waiting'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
