import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Lock, Check, ChevronRight, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { NeumoCard } from '../ui/NeumoCard';

interface Reward {
  id: string;
  name: string;
  description: string;
  cost: number;
  category: 'avatar' | 'ambience' | 'badge';
  emoji: string;
  unlocked: boolean;
}

const rewards: Reward[] = [
  {
    id: 'avatar-golden-aura',
    name: 'Golden Aura',
    description: 'A radiant golden glow around your avatar',
    cost: 100,
    category: 'avatar',
    emoji: '✨',
    unlocked: true,
  },
  {
    id: 'avatar-cosmic-crown',
    name: 'Cosmic Crown',
    description: 'A mystical crown of stars',
    cost: 250,
    category: 'avatar',
    emoji: '👑',
    unlocked: false,
  },
  {
    id: 'ambience-ocean-waves',
    name: 'Ocean Waves',
    description: 'Calming ocean soundscape',
    cost: 150,
    category: 'ambience',
    emoji: '🌊',
    unlocked: true,
  },
  {
    id: 'ambience-forest-rain',
    name: 'Forest Rain',
    description: 'Gentle rain in a peaceful forest',
    cost: 200,
    category: 'ambience',
    emoji: '🌧️',
    unlocked: false,
  },
  {
    id: 'badge-early-riser',
    name: 'Early Riser',
    description: 'Complete 7 morning sessions',
    cost: 300,
    category: 'badge',
    emoji: '🌅',
    unlocked: false,
  },
  {
    id: 'badge-night-owl',
    name: 'Night Owl',
    description: 'Complete 7 evening sessions',
    cost: 300,
    category: 'badge',
    emoji: '🦉',
    unlocked: false,
  },
];

export const SparksRewards: React.FC = () => {
  const { user } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'avatar' | 'ambience' | 'badge'>('all');

  const userSparks = user?.sparks || 0;

  const filteredRewards = selectedCategory === 'all' 
    ? rewards 
    : rewards.filter(r => r.category === selectedCategory);

  const unlockedCount = rewards.filter(r => r.unlocked).length;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <NeumoCard showBlob={true} blobColor="teal">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-neumo bg-brand-teal flex items-center justify-center shadow-teal-glow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neumo-text">Your Sparks</h2>
              <p className="text-sm text-neumo-text-secondary">Earned rewards, never purchased</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-neumo-text">{userSparks}</div>
            <p className="text-xs text-neumo-text-muted">{unlockedCount}/{rewards.length} unlocked</p>
          </div>
        </div>

        {/* Neuromarketing: Progress hint to next reward */}
        {userSparks < 100 && (
          <div className="mb-4 p-3 bg-neumo-surface-soft rounded-neumo shadow-neumo-inset-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-neumo-text-secondary font-medium">Next reward at 100 Sparks</span>
              <span className="text-xs text-neumo-text">{100 - userSparks} to go!</span>
            </div>
            <div className="h-2 bg-neumo-border rounded-full overflow-hidden shadow-neumo-inset-sm">
              <div 
                className="h-full bg-brand-teal rounded-full transition-all duration-500"
                style={{ width: `${(userSparks / 100) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 mb-4">
          {rewards.slice(0, 3).map((reward) => (
            <div
              key={reward.id}
              className={`p-3 rounded-neumo text-center bg-neumo-surface-soft ${
                reward.unlocked 
                  ? 'shadow-neumo-inset-sm' 
                  : 'shadow-neumo-sm'
              }`}
            >
              <div className="text-2xl mb-1">{reward.emoji}</div>
              <p className={`text-xs font-medium ${reward.unlocked ? 'text-neumo-text' : 'text-neumo-text-muted'}`}>
                {reward.name}
              </p>
              {!reward.unlocked && (
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Lock className="w-3 h-3 text-neumo-text-muted" />
                  <span className="text-xs text-neumo-text-muted">{reward.cost}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full py-2.5 bg-brand-teal shadow-teal-glow hover:bg-brand-teal-dark text-white font-semibold rounded-neumo transition-all flex items-center justify-center gap-2"
        >
          Unlock More Rewards
          <ChevronRight className="w-4 h-4" />
        </button>
        </NeumoCard>
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
                  <h2 className="text-xl font-bold text-neumo-text">Sparks Rewards</h2>
                  <p className="text-sm text-neumo-text-secondary">Unlock with earned Sparks only</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset-sm transition-all"
                >
                  <X className="w-5 h-5 text-neumo-text-secondary" />
                </button>
              </div>

              <div className="flex items-center justify-between mb-4 p-3 bg-neumo-bg rounded-neumo shadow-neumo-inset-sm">
                <span className="text-sm text-neumo-text-secondary">Your Balance</span>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-neumo-text" />
                  <span className="text-lg font-bold text-neumo-text">{userSparks}</span>
                </div>
              </div>

              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {(['all', 'avatar', 'ambience', 'badge'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-neumo text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'shadow-neumo-inset text-neumo-text'
                        : 'shadow-neumo-sm text-neumo-text-secondary hover:shadow-neumo-inset-sm'
                    }`}
                  >
                    {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {filteredRewards.map((reward) => (
                  <div
                    key={reward.id}
                    className={`p-4 rounded-neumo ${
                      reward.unlocked
                        ? 'shadow-neumo-inset'
                        : 'shadow-neumo-sm'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-neumo flex items-center justify-center text-2xl shadow-neumo-sm`}>
                        {reward.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-medium ${reward.unlocked ? 'text-neumo-text' : 'text-neumo-text-secondary'}`}>
                            {reward.name}
                          </h3>
                          {reward.unlocked && (
                            <Check className="w-4 h-4 text-neumo-text" />
                          )}
                        </div>
                        <p className="text-xs text-neumo-text-muted">{reward.description}</p>
                      </div>
                      {!reward.unlocked && (
                        <button
                          disabled={userSparks < reward.cost}
                          className={`px-3 py-1.5 rounded-neumo text-sm font-medium flex items-center gap-1 ${
                            userSparks >= reward.cost
                              ? 'shadow-neumo-sm hover:shadow-neumo-inset-sm text-neumo-text'
                              : 'shadow-neumo-inset-sm text-neumo-text-muted cursor-not-allowed'
                          }`}
                        >
                          <Sparkles className="w-3 h-3" />
                          {reward.cost}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-neumo-bg rounded-neumo shadow-neumo-inset-sm">
                <p className="text-xs text-neumo-text-muted text-center">
                  Sparks are earned through daily activities, completing sessions, and logging signs. 
                  They can never be purchased with real money.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
