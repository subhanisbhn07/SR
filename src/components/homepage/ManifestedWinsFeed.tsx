import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ChevronRight, X, MessageCircle, Share2, Trophy, Heart } from 'lucide-react';
import { useManifestedWinsStore, WIN_CATEGORIES, ManifestedWin } from '../../store/manifestedWinsStore';

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return `${Math.floor(diffDays / 7)} weeks ago`;
};

export const ManifestedWinsFeed: React.FC = () => {
  const { wins, likeWin, unlikeWin, selectedCategory, setCategory } = useManifestedWinsStore();
  const [showModal, setShowModal] = useState(false);

  const handleSendLight = (winId: string, isLiked: boolean) => {
    if (isLiked) {
      unlikeWin(winId);
    } else {
      likeWin(winId);
    }
  };

  const filteredWins = selectedCategory === 'all' 
    ? wins 
    : wins.filter(w => w.category === selectedCategory);

  const categories = ['all', ...Object.keys(WIN_CATEGORIES)] as const;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-surface-card-dark rounded-2xl p-5 mb-6 border border-surface-border-strong dark:border-surface-border-dark-strong shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-500/20 flex items-center justify-center">
              <Flame className="w-6 h-6 text-green-500 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">Manifested Wins</h2>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Real stories from the road</p>
            </div>
          </div>
          <span className="text-xs bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 px-2 py-1 rounded-full">
            {wins.length} new
          </span>
        </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                  {filteredWins.slice(0, 6).map((win) => (
                    <div
                      key={win.id}
                      className={`bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-3 border cursor-pointer transition-colors ${
                        win.isHallOfFame 
                          ? 'border-gold-300 dark:border-gold-500/30 ring-1 ring-gold-200 dark:ring-gold-500/20' 
                          : 'border-surface-border-strong dark:border-surface-border-dark-strong hover:border-green-300 dark:hover:border-green-500/30'
                      }`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                            {win.userName.charAt(0)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-medium text-neutral-900 dark:text-white block truncate">{win.userName}</span>
                              {win.isHallOfFame && <Trophy className="w-3 h-3 text-gold-500" />}
                            </div>
                            <span className="text-xs text-neutral-600 dark:text-neutral-400">{formatTimeAgo(win.manifestedAt)}</span>
                          </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleSendLight(win.id, win.isLikedByUser); }}
                          className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${
                            win.isLikedByUser
                              ? 'bg-pink-100 dark:bg-pink-500/20 text-pink-500 dark:text-pink-400'
                              : 'bg-neutral-100 dark:bg-neutral-700/50 text-neutral-400 hover:bg-pink-100 dark:hover:bg-pink-500/20 hover:text-pink-500 dark:hover:text-pink-400'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${win.isLikedByUser ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                      <p className="text-xs text-neutral-800 dark:text-neutral-200 line-clamp-2 mb-2">"{win.title}"</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-600 dark:text-neutral-400">{win.daysOnRoad}d on road</span>
                        <span className="text-xs text-pink-500 font-medium flex items-center gap-1">
                          <Heart className="w-3 h-3" /> {win.likes}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full py-2.5 bg-gold-500 hover:bg-gold-600 text-neutral-900 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          Celebrate More Wins
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
              className="w-full max-w-md bg-neutral-900 rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Manifested Wins</h2>
                  <p className="text-sm text-neutral-400">Real stories from travelers on the road</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-5 h-5 text-neutral-400" />
                </button>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat as typeof selectedCategory)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-primary-500 text-white'
                        : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                    }`}
                  >
                    {cat === 'all' ? 'All' : WIN_CATEGORIES[cat as ManifestedWin['category']].label}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {filteredWins.map((win) => (
                  <motion.div
                    key={win.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-neutral-800/50 rounded-xl p-4 border ${
                      win.isHallOfFame ? 'border-gold-500/30 ring-1 ring-gold-500/20' : 'border-neutral-700/50'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                        {win.userName.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">{win.userName}</span>
                          {win.isHallOfFame && (
                            <span className="text-xs bg-gold-500/20 text-gold-400 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Trophy className="w-3 h-3" /> Hall of Fame
                            </span>
                          )}
                          <span className="text-xs bg-neutral-700 text-neutral-400 px-2 py-0.5 rounded-full">
                            {WIN_CATEGORIES[win.category].label}
                          </span>
                        </div>
                        <span className="text-xs text-neutral-500">{formatTimeAgo(win.manifestedAt)}</span>
                      </div>
                    </div>

                    <p className="text-white font-medium mb-2">"{win.title}"</p>
                    <p className="text-sm text-neutral-400 mb-3">{win.description}</p>

                    <div className="bg-neutral-900/50 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <p className="text-lg font-bold text-white">{win.daysOnRoad}</p>
                          <p className="text-xs text-neutral-500">days on road</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-pink-400">{win.likes}</p>
                          <p className="text-xs text-neutral-500">likes</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleSendLight(win.id, win.isLikedByUser)}
                          className={`flex items-center gap-1.5 text-sm transition-colors ${
                            win.isLikedByUser
                              ? 'text-pink-400'
                              : 'text-neutral-400 hover:text-pink-400'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${win.isLikedByUser ? 'fill-current' : ''}`} />
                          <span>{win.likes}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          <span>Reply</span>
                        </button>
                      </div>
                      <button className="flex items-center gap-1.5 text-sm text-neutral-400 hover:text-white transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                <div className="flex items-start gap-3">
                  <Flame className="w-5 h-5 text-green-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-white font-medium">Send light to celebrate wins</p>
                    <p className="text-xs text-neutral-400 mt-1">
                      When you send light to someone's manifestation, you strengthen the collective energy 
                      and earn Sparks for your own journey.
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
