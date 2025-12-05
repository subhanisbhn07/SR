import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ChevronRight, X, MessageCircle, Share2 } from 'lucide-react';
import { LanternIcon } from '../ui/LanternIcon';

interface ManifestedWin {
  id: string;
  userName: string;
  userAvatar?: string;
  title: string;
  category: string;
  daysToManifest: number;
  signsLogged: number;
  probability: number;
  manifestedAt: Date;
  lightsReceived: number;
  hasReceivedLight: boolean;
}

const mockWins: ManifestedWin[] = [
  {
    id: '1',
    userName: 'Sarah C.',
    title: 'Got my dream job offer',
    category: 'Career',
    daysToManifest: 21,
    signsLogged: 18,
    probability: 8.3,
    manifestedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    lightsReceived: 47,
    hasReceivedLight: false,
  },
  {
    id: '2',
    userName: 'Marcus J.',
    title: 'Reconnected with my father',
    category: 'Relationships',
    daysToManifest: 14,
    signsLogged: 12,
    probability: 12.5,
    manifestedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    lightsReceived: 89,
    hasReceivedLight: true,
  },
  {
    id: '3',
    userName: 'Elena R.',
    title: 'Finally sleeping through the night',
    category: 'Health',
    daysToManifest: 7,
    signsLogged: 7,
    probability: 23.1,
    manifestedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    lightsReceived: 156,
    hasReceivedLight: false,
  },
  {
    id: '4',
    userName: 'James K.',
    title: 'Paid off all my debt',
    category: 'Finance',
    daysToManifest: 45,
    signsLogged: 32,
    probability: 5.2,
    manifestedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    lightsReceived: 234,
    hasReceivedLight: false,
  },
  {
    id: '5',
    userName: 'Lisa M.',
    title: 'Found my soulmate',
    category: 'Love',
    daysToManifest: 30,
    signsLogged: 25,
    probability: 7.8,
    manifestedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    lightsReceived: 312,
    hasReceivedLight: true,
  },
  {
    id: '6',
    userName: 'David P.',
    title: 'Started my own business',
    category: 'Career',
    daysToManifest: 60,
    signsLogged: 48,
    probability: 3.5,
    manifestedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    lightsReceived: 189,
    hasReceivedLight: false,
  },
];

const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return `${Math.floor(diffDays / 7)} weeks ago`;
};

export const ManifestedWinsFeed: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [wins, setWins] = useState(mockWins);

  const handleSendLight = (winId: string) => {
    setWins(prev => prev.map(win => 
      win.id === winId 
        ? { ...win, lightsReceived: win.lightsReceived + 1, hasReceivedLight: true }
        : win
    ));
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gradient-to-br dark:from-green-500/10 dark:to-teal-500/10 rounded-2xl p-5 mb-6 border border-neutral-200 dark:border-green-500/20 shadow-sm dark:shadow-none"
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
                  {wins.slice(0, 6).map((win) => (
                    <div
                      key={win.id}
                      className="bg-neutral-50 dark:bg-neutral-800/50 rounded-xl p-3 border border-neutral-200 dark:border-neutral-700/50 cursor-pointer hover:border-green-300 dark:hover:border-green-500/30 transition-colors"
                    >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                            {win.userName.charAt(0)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="text-xs font-medium text-neutral-900 block truncate">{win.userName}</span>
                            <span className="text-xs text-neutral-600">{formatTimeAgo(win.manifestedAt)}</span>
                          </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleSendLight(win.id); }}
                          disabled={win.hasReceivedLight}
                          className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${
                            win.hasReceivedLight
                              ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-500 dark:text-yellow-400'
                              : 'bg-neutral-100 dark:bg-neutral-700/50 text-neutral-400 hover:bg-yellow-100 dark:hover:bg-yellow-500/20 hover:text-yellow-500 dark:hover:text-yellow-400'
                          }`}
                        >
                          <LanternIcon health={win.hasReceivedLight ? 100 : 50} size="xs" showLabel={false} />
                        </button>
                      </div>
                      <p className="text-xs text-neutral-800 line-clamp-2 mb-2">"{win.title}"</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-600">{win.daysToManifest}d · {win.signsLogged} signs</span>
                        <span className="text-xs text-green-600 font-medium">{(100 - win.probability).toFixed(1)}%</span>
                      </div>
                    </div>
                  ))}
                </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full py-2.5 bg-green-500/20 hover:bg-green-500/30 text-green-400 font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          View All Wins
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

              <div className="space-y-4">
                {wins.map((win) => (
                  <motion.div
                    key={win.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700/50"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                        {win.userName.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">{win.userName}</span>
                          <span className="text-xs bg-neutral-700 text-neutral-400 px-2 py-0.5 rounded-full">
                            {win.category}
                          </span>
                        </div>
                        <span className="text-xs text-neutral-500">{formatTimeAgo(win.manifestedAt)}</span>
                      </div>
                    </div>

                    <p className="text-white font-medium mb-3">"{win.title}"</p>

                    <div className="bg-neutral-900/50 rounded-lg p-3 mb-3">
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-lg font-bold text-white">{win.daysToManifest}</p>
                          <p className="text-xs text-neutral-500">days</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-white">{win.signsLogged}</p>
                          <p className="text-xs text-neutral-500">signs</p>
                        </div>
                        <div>
                          <p className="text-lg font-bold text-green-400">{100 - win.probability}%</p>
                          <p className="text-xs text-neutral-500">odds beat</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleSendLight(win.id)}
                          disabled={win.hasReceivedLight}
                          className={`flex items-center gap-1.5 text-sm transition-colors ${
                            win.hasReceivedLight
                              ? 'text-yellow-400'
                              : 'text-neutral-400 hover:text-yellow-400'
                          }`}
                        >
                          <LanternIcon health={win.hasReceivedLight ? 100 : 50} size="xs" showLabel={false} />
                          <span>{win.lightsReceived}</span>
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
