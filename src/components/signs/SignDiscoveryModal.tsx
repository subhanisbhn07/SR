import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Search, CheckCircle } from 'lucide-react';
import { useSignsStore, Sign, SignRarity, RARITY_SPARKS } from '../../store/signsStore';
import { useGamificationStore } from '../../store/gamificationStore';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';
import { SignCard } from './SignCard';

interface SignDiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'active' | 'all' | 'logged';

export const SignDiscoveryModal: React.FC<SignDiscoveryModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useThemeStore();
  const { user } = useAuthStore();
  const { 
    signLogs, 
    assignDailySigns, 
    logSign, 
    getActiveSignDetails, 
    getAvailableSigns,
    hasLoggedSignToday,
    getSignById,
  } = useSignsStore();
  const { addSparks, incrementSignsLogged } = useGamificationStore();

  const [activeTab, setActiveTab] = useState<TabType>('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRarity, setSelectedRarity] = useState<SignRarity | 'all'>('all');
  const [loggedSign, setLoggedSign] = useState<{ sign: Sign; sparks: number } | null>(null);
  const [locationNote, setLocationNote] = useState('');
  const [showLogModal, setShowLogModal] = useState<Sign | null>(null);

  // Get user's current day (default to 1 if not available)
  const userDay = user?.streak || 1;

  // Assign daily signs on mount
  useEffect(() => {
    if (isOpen) {
      assignDailySigns(userDay);
    }
  }, [isOpen, userDay, assignDailySigns]);

  const activeSignDetails = getActiveSignDetails();
  const availableSigns = getAvailableSigns(userDay);

  // Filter signs based on search and rarity
  const filteredSigns = availableSigns.filter(sign => {
    const matchesSearch = sign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sign.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRarity = selectedRarity === 'all' || sign.rarity === selectedRarity;
    return matchesSearch && matchesRarity;
  });

  // Get logged signs for today
  const todayLogs = signLogs.filter(log => {
    const logDate = new Date(log.foundAt);
    const today = new Date();
    return logDate.toDateString() === today.toDateString();
  });

  const handleLogSign = async (sign: Sign) => {
    const result = await logSign(sign.id, locationNote);
    if (result.success) {
      addSparks(result.sparksEarned, `Found sign: ${sign.name}`);
      incrementSignsLogged();
      setLoggedSign({ sign, sparks: result.sparksEarned });
      setShowLogModal(null);
      setLocationNote('');
      
      // Auto-close success message after 3 seconds
      setTimeout(() => setLoggedSign(null), 3000);
    }
  };

  const rarityOptions: { value: SignRarity | 'all'; label: string }[] = [
    { value: 'all', label: 'All Rarities' },
    { value: 'whispered', label: 'Whispered' },
    { value: 'spoken', label: 'Spoken' },
    { value: 'shouted', label: 'Shouted' },
    { value: 'thundered', label: 'Thundered' },
    { value: 'cosmos_aligned', label: 'Cosmos Aligned' },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className={`w-full max-w-2xl max-h-[85vh] rounded-3xl overflow-hidden ${
            theme === 'dark' ? 'bg-neutral-900' : 'bg-white'
          }`}
        >
          {/* Header */}
          <div className={`p-6 border-b ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                  Sign Discovery
                </h2>
                <p className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Find signs from the universe and earn sparks
                </p>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-full ${
                  theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100'
                }`}
              >
                <X className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
              {[
                { id: 'active' as TabType, label: 'Today\'s Signs', count: activeSignDetails.length },
                { id: 'all' as TabType, label: 'All Signs', count: availableSigns.length },
                { id: 'logged' as TabType, label: 'Logged Today', count: todayLogs.length },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-emerald-500 text-white'
                      : theme === 'dark'
                      ? 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>

          {/* Search and Filter (for All Signs tab) */}
          {activeTab === 'all' && (
            <div className={`p-4 border-b ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}`}>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                    theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'
                  }`} />
                  <input
                    type="text"
                    placeholder="Search signs..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-xl border ${
                      theme === 'dark'
                        ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-400'
                    }`}
                  />
                </div>
                <select
                  value={selectedRarity}
                  onChange={e => setSelectedRarity(e.target.value as SignRarity | 'all')}
                  className={`px-4 py-2 rounded-xl border ${
                    theme === 'dark'
                      ? 'bg-neutral-800 border-neutral-700 text-white'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                  }`}
                >
                  {rarityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[50vh]">
            {/* Success Message */}
            <AnimatePresence>
              {loggedSign && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-500" />
                    <div>
                      <p className="font-medium text-emerald-600 dark:text-emerald-400">
                        Sign Logged: {loggedSign.sign.name} {loggedSign.sign.emoji}
                      </p>
                      <p className="text-sm text-emerald-500 flex items-center gap-1">
                        <Sparkles className="w-4 h-4" />
                        +{loggedSign.sparks} sparks earned!
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Active Signs Tab */}
            {activeTab === 'active' && (
              <div className="space-y-4">
                {activeSignDetails.length === 0 ? (
                  <div className={`text-center py-8 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    <p>No active signs right now.</p>
                    <p className="text-sm mt-2">Check back tomorrow for new signs!</p>
                  </div>
                ) : (
                  activeSignDetails.map(sign => (
                    <SignCard
                      key={sign.id}
                      sign={sign}
                      assignedAt={sign.assignedAt}
                      expiresAt={sign.expiresAt}
                      isLogged={hasLoggedSignToday(sign.id)}
                      onLog={() => setShowLogModal(sign)}
                    />
                  ))
                )}
              </div>
            )}

            {/* All Signs Tab */}
            {activeTab === 'all' && (
              <div className="grid gap-3">
                {filteredSigns.length === 0 ? (
                  <div className={`text-center py-8 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    <p>No signs match your search.</p>
                  </div>
                ) : (
                  filteredSigns.map(sign => (
                    <SignCard
                      key={sign.id}
                      sign={sign}
                      compact
                      isLogged={hasLoggedSignToday(sign.id)}
                      onLog={() => setShowLogModal(sign)}
                    />
                  ))
                )}
              </div>
            )}

            {/* Logged Today Tab */}
            {activeTab === 'logged' && (
              <div className="space-y-4">
                {todayLogs.length === 0 ? (
                  <div className={`text-center py-8 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    <p>No signs logged today yet.</p>
                    <p className="text-sm mt-2">Go find some signs!</p>
                  </div>
                ) : (
                  todayLogs.map(log => {
                    const sign = getSignById(log.signId);
                    if (!sign) return null;
                    return (
                      <div
                        key={log.id}
                        className={`p-4 rounded-2xl border ${
                          theme === 'dark' ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-50 border-neutral-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{sign.emoji}</span>
                          <div className="flex-1">
                            <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                              {sign.name}
                            </h4>
                            <p className={`text-sm ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                              Found at {new Date(log.foundAt).toLocaleTimeString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-gold-500">
                            <Sparkles className="w-4 h-4" />
                            <span className="font-medium">+{log.sparksEarned}</span>
                          </div>
                        </div>
                        {log.locationNote && (
                          <p className={`mt-2 text-sm italic ${
                            theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'
                          }`}>
                            "{log.locationNote}"
                          </p>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>

          {/* Footer Stats */}
          <div className={`p-4 border-t ${theme === 'dark' ? 'border-neutral-800 bg-neutral-800/50' : 'border-neutral-200 bg-neutral-50'}`}>
            <div className="flex items-center justify-between text-sm">
              <span className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}>
                Day {userDay} • {availableSigns.length} signs unlocked
              </span>
              <span className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}>
                {signLogs.length} total signs logged
              </span>
            </div>
          </div>
        </motion.div>

        {/* Log Sign Modal */}
        <AnimatePresence>
          {showLogModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50"
              onClick={() => setShowLogModal(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className={`w-full max-w-md p-6 rounded-3xl ${
                  theme === 'dark' ? 'bg-neutral-900' : 'bg-white'
                }`}
              >
                <div className="text-center mb-6">
                  <span className="text-5xl">{showLogModal.emoji}</span>
                  <h3 className={`text-xl font-bold mt-3 ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
                    Log: {showLogModal.name}
                  </h3>
                  <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    You'll earn <span className="text-gold-500 font-medium">+{RARITY_SPARKS[showLogModal.rarity]} sparks</span>
                  </p>
                </div>

                <div className="mb-6">
                  <label className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                  }`}>
                    Where did you find it? (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., In the park near my house"
                    value={locationNote}
                    onChange={e => setLocationNote(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      theme === 'dark'
                        ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-900 placeholder-neutral-400'
                    }`}
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLogModal(null)}
                    className={`flex-1 py-3 rounded-xl font-medium ${
                      theme === 'dark'
                        ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleLogSign(showLogModal)}
                    className="flex-1 py-3 rounded-xl font-medium bg-emerald-500 text-white hover:bg-emerald-600"
                  >
                    Log Sign
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
