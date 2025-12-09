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
        className="bg-neumo-bg rounded-neumo-lg p-5 mb-6 shadow-neumo"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-neumo bg-neumo-bg flex items-center justify-center shadow-neumo-sm">
            <Users className="w-6 h-6 text-neumo-text-secondary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-neumo-text">Join a Tribe</h2>
            <p className="text-sm text-neumo-text-secondary">5-person accountability groups</p>
          </div>
        </div>

        <p className="text-sm text-neumo-text-secondary mb-4">
          Walk the road together with 4 others. Share your journey, keep each other accountable, 
          and watch your collective lantern grow brighter.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => setHasJoinedTribe(true)}
            className="flex-1 py-2.5 bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset text-neumo-text font-medium rounded-neumo transition-all"
          >
            Find a Tribe
          </button>
          <button
            onClick={() => setHasJoinedTribe(true)}
            className="flex-1 py-2.5 bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset text-neumo-text-secondary font-medium rounded-neumo transition-all"
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
        className="bg-neumo-bg rounded-neumo-lg p-5 mb-6 shadow-neumo"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-neumo bg-neumo-bg flex items-center justify-center shadow-neumo-sm">
              <Users className="w-6 h-6 text-neumo-text-secondary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neumo-text">Your Tribe</h2>
              <p className="text-sm text-neumo-text-secondary">The Manifestors</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <LanternIcon health={tribeLanternAvg} size="sm" />
              <span className="text-lg font-bold text-neumo-text">{tribeLanternAvg}</span>
            </div>
            <p className="text-xs text-neumo-text-muted">Tribe Lantern</p>
          </div>
        </div>

        <div className="bg-neumo-bg rounded-neumo p-3 mb-4 shadow-neumo-inset-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-neumo-text-secondary">Today's Check-ins</span>
            <span className="text-sm font-medium text-neumo-text">{showedUpCount}/{totalMembers}</span>
          </div>
          <div className="flex gap-2">
            {tribeMembers.map((member) => (
              <div
                key={member.id}
                className={`flex-1 h-2 rounded-full ${
                  member.name === 'Open Spot'
                    ? 'bg-neumo-border border border-dashed border-neumo-text-muted'
                    : member.showedUpToday
                    ? 'bg-neutral-500'
                    : 'bg-neumo-border'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-4">
          {tribeMembers.slice(0, 4).map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center gap-1"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium relative shadow-neumo-sm ${
                  member.showedUpToday
                    ? 'bg-neumo-bg text-neumo-text'
                    : 'bg-neumo-bg text-neumo-text-muted'
                }`}
              >
                {member.isLeader && (
                  <Crown className="w-3 h-3 absolute -top-1 -right-1 text-neumo-text-secondary" />
                )}
                {member.name === 'Open Spot' ? (
                  <Plus className="w-4 h-4" />
                ) : (
                  member.name.charAt(0)
                )}
              </div>
              <span className="text-xs text-neumo-text-muted truncate max-w-[50px]">
                {member.name === 'Open Spot' ? '+' : member.name.split(' ')[0]}
              </span>
            </div>
          ))}
          {tribeMembers.length > 4 && (
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-neumo-bg shadow-neumo-sm flex items-center justify-center text-xs text-neumo-text-muted">
                +{tribeMembers.length - 4}
              </div>
              <span className="text-xs text-neumo-text-muted">more</span>
            </div>
          )}
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full py-2.5 bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset text-neumo-text font-semibold rounded-neumo transition-all flex items-center justify-center gap-2"
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
            className="fixed inset-0 z-50 flex items-end justify-center bg-neumo-text/30"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-md bg-neumo-bg rounded-t-neumo-xl p-6 max-h-[80vh] overflow-y-auto shadow-neumo-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-neumo-text">The Manifestors</h2>
                  <p className="text-sm text-neumo-text-secondary">Walking the road together</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset-sm transition-all"
                >
                  <X className="w-5 h-5 text-neumo-text-secondary" />
                </button>
              </div>

              <div className="flex items-center justify-between mb-6 p-4 bg-neumo-bg rounded-neumo shadow-neumo-inset-sm">
                <div className="flex items-center gap-3">
                  <LanternIcon health={tribeLanternAvg} size="md" />
                  <div>
                    <p className="text-sm text-neumo-text-secondary">Tribe Lantern</p>
                    <p className="text-lg font-bold text-neumo-text">{tribeLanternAvg}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-neumo-text-secondary">Showed up today</p>
                  <p className="text-lg font-bold text-neumo-text">{showedUpCount}/{totalMembers}</p>
                </div>
              </div>

              <h3 className="text-sm font-medium text-neumo-text-muted mb-3">TRIBE MEMBERS</h3>
              <div className="space-y-3">
                {tribeMembers.map((member) => (
                  <div
                    key={member.id}
                    className={`p-4 rounded-neumo ${
                      member.name === 'Open Spot'
                        ? 'shadow-neumo-inset-sm border border-dashed border-neumo-border'
                        : 'shadow-neumo-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium shadow-neumo-sm ${
                        member.name === 'Open Spot'
                          ? 'bg-neumo-bg text-neumo-text-muted'
                          : member.showedUpToday
                          ? 'bg-neumo-bg text-neumo-text'
                          : 'bg-neumo-bg text-neumo-text-muted'
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
                            member.name === 'Open Spot' ? 'text-neumo-text-muted' : 'text-neumo-text'
                          }`}>
                            {member.name}
                          </h3>
                          {member.isLeader && (
                            <Crown className="w-4 h-4 text-neumo-text-secondary" />
                          )}
                          {member.name === 'You' && (
                            <span className="text-xs bg-neumo-bg shadow-neumo-inset-sm text-neumo-text px-2 py-0.5 rounded-full">
                              You
                            </span>
                          )}
                        </div>
                        {member.name !== 'Open Spot' && (
                          <div className="flex items-center gap-2 mt-1">
                            <LanternIcon health={member.lanternHealth} size="xs" showLabel={false} />
                            <span className="text-xs text-neumo-text-muted">{member.lanternHealth}</span>
                            {member.showedUpToday && (
                              <span className="flex items-center gap-1 text-xs text-neumo-text-secondary">
                                <Check className="w-3 h-3" />
                                Today
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      {member.name === 'Open Spot' && (
                        <button className="px-3 py-1.5 bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset-sm text-neumo-text text-sm font-medium rounded-neumo transition-all">
                          Invite
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-neumo-bg rounded-neumo shadow-neumo-inset-sm">
                <div className="flex items-start gap-3">
                  <Flame className="w-5 h-5 text-neumo-text-secondary mt-0.5" />
                  <div>
                    <p className="text-sm text-neumo-text font-medium">Keep the tribe lantern bright!</p>
                    <p className="text-xs text-neumo-text-muted mt-1">
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
