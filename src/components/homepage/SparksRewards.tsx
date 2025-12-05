import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Lock, Check, ChevronRight, X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

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
        className="bg-white dark:bg-gradient-to-br dark:from-gold-500/10 dark:to-gold-600/5 rounded-2xl p-5 mb-6 border border-neutral-200 dark:border-gold-500/20 shadow-sm dark:shadow-none"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-6 h-6 text-neutral-900" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Your Sparks</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Earned rewards, never purchased</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gold-600 dark:text-gold-400">{userSparks}</div>
            <p className="text-xs text-neutral-500">{unlockedCount}/{rewards.length} unlocked</p>
          </div>
        </div>

        {/* Neuromarketing: Progress hint to next reward */}
        {userSparks < 100 && (
          <div className="mb-4 p-3 bg-gold-50 dark:bg-gold-500/10 rounded-xl border border-gold-200 dark:border-gold-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gold-700 dark:text-gold-400 font-medium">Next reward at 100 Sparks</span>
              <span className="text-xs text-gold-600 dark:text-gold-400">{100 - userSparks} to go!</span>
            </div>
            <div className="h-2 bg-gold-200 dark:bg-gold-900/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-gold-400 to-gold-500 rounded-full transition-all duration-500"
                style={{ width: `${(userSparks / 100) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 mb-4">
          {rewards.slice(0, 3).map((reward) => (
            <div
              key={reward.id}
              className={`p-3 rounded-xl text-center ${
                reward.unlocked 
                  ? 'bg-gold-100 dark:bg-gold-500/20 border border-gold-200 dark:border-gold-500/30' 
                  : 'bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700/50'
              }`}
            >
              <div className="text-2xl mb-1">{reward.emoji}</div>
              <p className={`text-xs font-medium ${reward.unlocked ? 'text-gold-700 dark:text-gold-400' : 'text-neutral-500'}`}>
                {reward.name}
              </p>
              {!reward.unlocked && (
                <div className="flex items-center justify-center gap-1 mt-1">
                  <Lock className="w-3 h-3 text-neutral-400 dark:text-neutral-600" />
                  <span className="text-xs text-neutral-400 dark:text-neutral-600">{reward.cost}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full py-2.5 bg-gold-500 hover:bg-gold-600 text-neutral-900 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          Unlock More Rewards
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
                  <h2 className="text-xl font-bold text-white">Sparks Rewards</h2>
                  <p className="text-sm text-neutral-400">Unlock with earned Sparks only</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-400" />
                </button>
              </div>

              <div className="flex items-center justify-between mb-4 p-3 bg-gold-500/10 rounded-xl">
                <span className="text-sm text-neutral-300">Your Balance</span>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-gold-400" />
                  <span className="text-lg font-bold text-gold-400">{userSparks}</span>
                </div>
              </div>

              <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                {(['all', 'avatar', 'ambience', 'badge'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-gold-500 text-neutral-900'
                        : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
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
                    className={`p-4 rounded-xl border ${
                      reward.unlocked
                        ? 'bg-gold-500/10 border-gold-500/30'
                        : 'bg-neutral-800/50 border-neutral-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                        reward.unlocked ? 'bg-gold-500/20' : 'bg-neutral-700/50'
                      }`}>
                        {reward.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-medium ${reward.unlocked ? 'text-white' : 'text-neutral-300'}`}>
                            {reward.name}
                          </h3>
                          {reward.unlocked && (
                            <Check className="w-4 h-4 text-success-400" />
                          )}
                        </div>
                        <p className="text-xs text-neutral-500">{reward.description}</p>
                      </div>
                      {!reward.unlocked && (
                        <button
                          disabled={userSparks < reward.cost}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1 ${
                            userSparks >= reward.cost
                              ? 'bg-gold-500 text-neutral-900 hover:bg-gold-600'
                              : 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
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

              <div className="mt-6 p-4 bg-neutral-800/50 rounded-xl">
                <p className="text-xs text-neutral-400 text-center">
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
