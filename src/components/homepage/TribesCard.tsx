import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Flame, ChevronRight, X, Plus, Crown, Check } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { LanternIcon } from '../ui/LanternIcon';

interface TribeMember {
  id: string;
  name: string;
  avatar?: string;
  lanternHealth: number;
  showedUpToday: boolean;
  isLeader: boolean;
}

const mockTribeMembers: TribeMember[] = [
  { id: '1', name: 'You', lanternHealth: 82, showedUpToday: true, isLeader: false },
  { id: '2', name: 'Sarah', lanternHealth: 91, showedUpToday: true, isLeader: true },
  { id: '3', name: 'Marcus', lanternHealth: 67, showedUpToday: true, isLeader: false },
  { id: '4', name: 'Elena', lanternHealth: 45, showedUpToday: false, isLeader: false },
  { id: '5', name: 'Open Spot', lanternHealth: 0, showedUpToday: false, isLeader: false },
];

export const TribesCard: React.FC = () => {
  useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [hasJoinedTribe, setHasJoinedTribe] = useState(true);

  const tribeMembers = mockTribeMembers;
  const showedUpCount = tribeMembers.filter(m => m.showedUpToday && m.name !== 'Open Spot').length;
  const totalMembers = tribeMembers.filter(m => m.name !== 'Open Spot').length;
  const tribeLanternAvg = Math.round(
    tribeMembers
      .filter(m => m.name !== 'Open Spot')
      .reduce((sum, m) => sum + m.lanternHealth, 0) / totalMembers
  );

  if (!hasJoinedTribe) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-surface-card-dark rounded-2xl p-5 mb-6 border border-surface-border-strong dark:border-surface-border-dark-strong shadow-md dark:shadow-none"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center">
            <Users className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Join a Tribe</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">5-person accountability groups</p>
          </div>
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
          Walk the road together with 4 others. Share your journey, keep each other accountable, 
          and watch your collective lantern grow brighter.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => setHasJoinedTribe(true)}
            className="flex-1 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-xl transition-colors"
          >
            Find a Tribe
          </button>
          <button
            onClick={() => setHasJoinedTribe(true)}
            className="flex-1 py-2.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-medium rounded-xl transition-colors"
          >
            Create One
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-surface-card-dark rounded-2xl p-5 mb-6 border border-surface-border-strong dark:border-surface-border-dark-strong shadow-md dark:shadow-none"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center">
              <Users className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Your Tribe</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">The Manifestors</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <LanternIcon health={tribeLanternAvg} size="sm" />
              <span className="text-lg font-bold text-neutral-900 dark:text-white">{tribeLanternAvg}</span>
            </div>
            <p className="text-xs text-neutral-500">Tribe Lantern</p>
          </div>
        </div>

        <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">Today's Check-ins</span>
            <span className="text-sm font-medium text-teal-600 dark:text-teal-400">{showedUpCount}/{totalMembers}</span>
          </div>
          <div className="flex gap-2">
            {tribeMembers.map((member) => (
              <div
                key={member.id}
                className={`flex-1 h-2 rounded-full ${
                  member.name === 'Open Spot'
                    ? 'bg-neutral-300 dark:bg-neutral-700 border border-dashed border-neutral-400 dark:border-neutral-600'
                    : member.showedUpToday
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-500'
                    : 'bg-neutral-300 dark:bg-neutral-700'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          {tribeMembers.slice(0, 4).map((member, index) => (
            <div
              key={member.id}
              className="flex flex-col items-center gap-1"
            >
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-medium relative ${
                  member.showedUpToday
                    ? 'border-teal-500 bg-teal-100 dark:bg-teal-500/30 text-teal-600 dark:text-teal-300'
                    : 'border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400'
                }`}
              >
                {member.isLeader && (
                  <Crown className="w-3 h-3 absolute -top-1 -right-1 text-gold-500" />
                )}
                {member.name === 'Open Spot' ? (
                  <Plus className="w-4 h-4" />
                ) : (
                  member.name.charAt(0)
                )}
              </div>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate max-w-[50px]">
                {member.name === 'Open Spot' ? '+' : member.name.split(' ')[0]}
              </span>
            </div>
          ))}
          {tribeMembers.length > 4 && (
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full border-2 border-neutral-300 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center text-xs text-neutral-500 dark:text-neutral-400">
                +{tribeMembers.length - 4}
              </div>
              <span className="text-xs text-neutral-500 dark:text-neutral-400">more</span>
            </div>
          )}
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          Check In With Tribe
          <ChevronRight className="w-4 h-4" />
        </button>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-neutral-900 rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">The Manifestors</h2>
                  <p className="text-sm text-neutral-400">Walking the road together</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-400" />
                </button>
              </div>

              <div className="flex items-center justify-between mb-6 p-4 bg-teal-500/10 rounded-xl">
                <div className="flex items-center gap-3">
                  <LanternIcon health={tribeLanternAvg} size="md" />
                  <div>
                    <p className="text-sm text-neutral-400">Tribe Lantern</p>
                    <p className="text-lg font-bold text-white">{tribeLanternAvg}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-neutral-400">Showed up today</p>
                  <p className="text-lg font-bold text-teal-400">{showedUpCount}/{totalMembers}</p>
                </div>
              </div>

              <h3 className="text-sm font-medium text-neutral-400 mb-3">TRIBE MEMBERS</h3>
              <div className="space-y-3">
                {tribeMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`p-4 rounded-xl border ${
                      member.name === 'Open Spot'
                        ? 'bg-neutral-800/30 border-dashed border-neutral-700'
                        : 'bg-neutral-800/50 border-neutral-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium ${
                        member.name === 'Open Spot'
                          ? 'bg-neutral-700 text-neutral-500'
                          : member.showedUpToday
                          ? 'bg-teal-500/30 text-teal-300'
                          : 'bg-neutral-700 text-neutral-400'
                      }`}>
                        {member.name === 'Open Spot' ? (
                          <Plus className="w-5 h-5" />
                        ) : (
                          member.name.charAt(0)
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-medium ${
                            member.name === 'Open Spot' ? 'text-neutral-500' : 'text-white'
                          }`}>
                            {member.name}
                          </h3>
                          {member.isLeader && (
                            <Crown className="w-4 h-4 text-gold-400" />
                          )}
                          {member.name === 'You' && (
                            <span className="text-xs bg-teal-500/20 text-teal-400 px-2 py-0.5 rounded-full">
                              You
                            </span>
                          )}
                        </div>
                        {member.name !== 'Open Spot' && (
                          <div className="flex items-center gap-2 mt-1">
                            <LanternIcon health={member.lanternHealth} size="xs" showLabel={false} />
                            <span className="text-xs text-neutral-500">{member.lanternHealth}</span>
                            {member.showedUpToday && (
                              <span className="flex items-center gap-1 text-xs text-success-400">
                                <Check className="w-3 h-3" />
                                Today
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      {member.name === 'Open Spot' && (
                        <button
                          onClick={() => {
                            const link = 'https://signroad.com/invite/the-manifestors';
                            if (navigator.share) {
                              navigator.share({
                                title: 'Join My Tribe on SignRoad',
                                text: 'Walk the manifestation road with me! Join The Manifestors tribe.',
                                url: link,
                              }).catch(() => {});
                            } else {
                              navigator.clipboard.writeText(link);
                              alert('Invite link copied to clipboard!');
                            }
                          }}
                          className="px-3 py-1.5 bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 text-sm font-medium rounded-lg transition-colors"
                        >
                          Invite
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-neutral-800/50 rounded-xl">
                <div className="flex items-start gap-3">
                  <Flame className="w-5 h-5 text-accent-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-white font-medium">Keep the tribe lantern bright!</p>
                    <p className="text-xs text-neutral-400 mt-1">
                      When everyone shows up, the tribe lantern glows brighter. 
                      Support each other on the road to manifestation.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
