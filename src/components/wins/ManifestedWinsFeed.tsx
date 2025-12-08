import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trophy, Calendar, ChevronRight, X, Plus, Sparkles } from 'lucide-react';
import { useManifestedWinsStore, ManifestedWin, WIN_CATEGORIES } from '../../store/manifestedWinsStore';
import { useThemeStore } from '../../store/themeStore';

interface ManifestedWinsFeedProps {
  compact?: boolean;
  limit?: number;
  showAddButton?: boolean;
}

export const ManifestedWinsFeed: React.FC<ManifestedWinsFeedProps> = ({
  compact = false,
  limit = 5,
  showAddButton = true,
}) => {
  const { theme } = useThemeStore();
  const { wins, selectedCategory, setCategory, likeWin, unlikeWin, addWin } = useManifestedWinsStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWinTitle, setNewWinTitle] = useState('');
  const [newWinDescription, setNewWinDescription] = useState('');
  const [newWinCategory, setNewWinCategory] = useState<ManifestedWin['category']>('personal');

  const filteredWins = selectedCategory === 'all' 
    ? wins.slice(0, limit) 
    : wins.filter(w => w.category === selectedCategory).slice(0, limit);

  const handleLike = (winId: string, isLiked: boolean) => {
    if (isLiked) {
      unlikeWin(winId);
    } else {
      likeWin(winId);
    }
  };

  const handleAddWin = () => {
    if (newWinTitle.trim() && newWinDescription.trim()) {
      addWin(newWinTitle, newWinDescription, newWinCategory);
      setNewWinTitle('');
      setNewWinDescription('');
      setNewWinCategory('personal');
      setShowAddModal(false);
    }
  };

  const categories = ['all', ...Object.keys(WIN_CATEGORIES)] as const;

  if (compact) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
            Latest Wins
          </h3>
          <button className="text-primary-500 text-sm font-medium flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        {filteredWins.slice(0, 3).map((win) => (
          <div
            key={win.id}
            className={`p-3 rounded-xl border ${
              theme === 'dark' 
                ? 'bg-neutral-800/50 border-neutral-700/50' 
                : 'bg-neutral-50 border-neutral-200'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">{WIN_CATEGORIES[win.category].emoji}</span>
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm truncate ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  {win.title}
                </p>
                <p className={`text-xs ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  {win.userName} • {win.daysOnRoad} days
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Heart 
                  className={`w-4 h-4 ${win.isLikedByUser ? 'fill-pink-500 text-pink-500' : 'text-neutral-400'}`} 
                />
                <span className="text-xs text-neutral-500">{win.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              theme === 'dark' ? 'bg-gold-500/20' : 'bg-gold-100'
            }`}>
              <Trophy className="w-5 h-5 text-gold-500" />
            </div>
            <div>
              <h2 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                Manifested Wins
              </h2>
              <p className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Inspiration from the community
              </p>
            </div>
          </div>
          {showAddButton && (
            <button
              onClick={() => setShowAddModal(true)}
              className="p-2 rounded-xl bg-primary-500/10 hover:bg-primary-500/20 text-primary-500 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat as typeof selectedCategory)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary-500 text-white'
                  : theme === 'dark'
                    ? 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat === 'all' ? 'All' : WIN_CATEGORIES[cat as ManifestedWin['category']].label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredWins.map((win, index) => (
            <motion.div
              key={win.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 rounded-2xl border ${
                theme === 'dark' 
                  ? 'bg-neutral-800/50 border-neutral-700/50' 
                  : 'bg-white border-neutral-200'
              } ${win.isHallOfFame ? 'ring-2 ring-gold-500/30' : ''}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  theme === 'dark' ? 'bg-neutral-700' : 'bg-neutral-100'
                }`}>
                  {WIN_CATEGORIES[win.category].emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                      {win.userName}
                    </span>
                    {win.isHallOfFame && (
                      <span className="px-2 py-0.5 bg-gold-500/20 text-gold-500 text-xs font-medium rounded-full flex items-center gap-1">
                        <Trophy className="w-3 h-3" />
                        Hall of Fame
                      </span>
                    )}
                  </div>
                  <h3 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                    {win.title}
                  </h3>
                  <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    {win.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs">
                      <span className={`flex items-center gap-1 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>
                        <Calendar className="w-3 h-3" />
                        {win.daysOnRoad} days on road
                      </span>
                      <span className={WIN_CATEGORIES[win.category].color}>
                        {WIN_CATEGORIES[win.category].label}
                      </span>
                    </div>
                    <button
                      onClick={() => handleLike(win.id, win.isLikedByUser)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors ${
                        win.isLikedByUser
                          ? 'bg-pink-500/10 text-pink-500'
                          : theme === 'dark'
                            ? 'hover:bg-neutral-700 text-neutral-400'
                            : 'hover:bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${win.isLikedByUser ? 'fill-current' : ''}`} />
                      <span className="text-sm">{win.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`w-full max-w-lg rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto ${
                theme === 'dark' ? 'bg-neutral-900' : 'bg-white'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-gold-500" />
                  </div>
                  <div>
                    <h2 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                      Share Your Win
                    </h2>
                    <p className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`}>
                      Inspire the community
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddModal(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
                  }`}
                >
                  <X className={`w-5 h-5 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    What did you manifest?
                  </label>
                  <input
                    type="text"
                    value={newWinTitle}
                    onChange={(e) => setNewWinTitle(e.target.value)}
                    placeholder="e.g., Got my dream job!"
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
                      theme === 'dark'
                        ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-400'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    Tell your story
                  </label>
                  <textarea
                    value={newWinDescription}
                    onChange={(e) => setNewWinDescription(e.target.value)}
                    placeholder="Share how it happened, what signs you noticed, and how you feel..."
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none ${
                      theme === 'dark'
                        ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-400'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}`}>
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(WIN_CATEGORIES) as ManifestedWin['category'][]).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setNewWinCategory(cat)}
                        className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                          newWinCategory === cat
                            ? 'bg-primary-500 text-white'
                            : theme === 'dark'
                              ? 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                        }`}
                      >
                        {WIN_CATEGORIES[cat].emoji} {WIN_CATEGORIES[cat].label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleAddWin}
                  disabled={!newWinTitle.trim() || !newWinDescription.trim()}
                  className={`w-full py-4 rounded-xl font-semibold transition-colors ${
                    newWinTitle.trim() && newWinDescription.trim()
                      ? 'bg-primary-500 hover:bg-primary-600 text-white'
                      : theme === 'dark'
                        ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                        : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                  }`}
                >
                  Share My Win
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
