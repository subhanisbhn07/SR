import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight, Sparkles, Flame, Trophy, Eye, Target, Plus, Check, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useSignsGoalsStore } from '../store/signsGoalsStore';
import { LanternIcon } from '../components/ui/LanternIcon';

const menuItems = [
  { icon: Settings, label: 'Settings', description: 'App preferences' },
  { icon: Bell, label: 'Notifications', description: 'Manage alerts' },
  { icon: Shield, label: 'Privacy', description: 'Data & security' },
  { icon: HelpCircle, label: 'Help & Support', description: 'Get assistance' },
];

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { activeSigns, foundSigns, goals, markSignFound, addGoal, markGoalAchieved, removeGoal, maybeAssignNewSign } = useSignsGoalsStore();
  const [newGoalText, setNewGoalText] = useState('');
  const [showAddGoal, setShowAddGoal] = useState(false);
  
  const lanternHealth = user?.lanternHealth || 82;
  const streakDays = user?.streakDays || 7;
  const sparks = user?.sparks || 245;
  
  const activeGoals = goals.filter(g => !g.achievedAt);
  const achievedGoals = goals.filter(g => g.achievedAt);
  
  const handleAddGoal = () => {
    if (newGoalText.trim()) {
      addGoal(newGoalText.trim());
      setNewGoalText('');
      setShowAddGoal(false);
    }
  };

  return (
    <div className="px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Profile</h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">Manage your account</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-neutral-800/50 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700/50 shadow-sm dark:shadow-none mb-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-500 to-purple-500 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">{user?.name || 'User'}</h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm">{user?.email || 'user@example.com'}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-neutral-100 dark:bg-neutral-900/50 rounded-xl p-3 text-center">
            <div className="flex justify-center mb-2">
              <LanternIcon health={lanternHealth} size="sm" />
            </div>
            <p className="text-lg font-bold text-neutral-900 dark:text-white">{lanternHealth}</p>
            <p className="text-xs text-neutral-500">Lantern</p>
          </div>
          <div className="bg-neutral-100 dark:bg-neutral-900/50 rounded-xl p-3 text-center">
            <div className="flex justify-center mb-2">
              <Flame className="w-6 h-6 text-orange-500 dark:text-orange-400" />
            </div>
            <p className="text-lg font-bold text-neutral-900 dark:text-white">{streakDays}</p>
            <p className="text-xs text-neutral-500">Day Streak</p>
          </div>
          <div className="bg-neutral-100 dark:bg-neutral-900/50 rounded-xl p-3 text-center">
            <div className="flex justify-center mb-2">
              <Sparkles className="w-6 h-6 text-accent-500 dark:text-accent-400" />
            </div>
            <p className="text-lg font-bold text-neutral-900 dark:text-white">{sparks}</p>
            <p className="text-xs text-neutral-500">Sparks</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-neutral-800/50 rounded-2xl border border-neutral-200 dark:border-neutral-700/50 shadow-sm dark:shadow-none mb-6 overflow-hidden"
      >
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`w-full flex items-center gap-4 p-4 hover:bg-neutral-100 dark:hover:bg-neutral-700/30 transition-colors ${
                index !== menuItems.length - 1 ? 'border-b border-neutral-200 dark:border-neutral-700/50' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-700/50 flex items-center justify-center">
                <Icon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-neutral-900 dark:text-white">{item.label}</p>
                <p className="text-xs text-neutral-500">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-500" />
            </button>
          );
        })}
      </motion.div>

      {/* Signs to Find Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-neutral-800/50 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700/50 shadow-sm dark:shadow-none mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-purple-500" />
            <h3 className="font-semibold text-neutral-900 dark:text-white">Signs to Find</h3>
          </div>
          <span className="text-xs text-neutral-500 bg-neutral-100 dark:bg-neutral-700/50 px-2 py-1 rounded-full">
            {activeSigns.length}/3 active
          </span>
        </div>
        {activeSigns.length === 0 ? (
          <p className="text-sm text-neutral-500 text-center py-4">No active signs. Complete your journey to receive new signs!</p>
        ) : (
          <div className="space-y-3">
            {activeSigns.map((sign) => (
              <div key={sign.id} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{sign.emoji}</span>
                  <div>
                    <p className="font-medium text-neutral-900 dark:text-white">{sign.label}</p>
                    <p className="text-xs text-neutral-500">Assigned {new Date(sign.assignedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <button
                  onClick={() => markSignFound(sign.id)}
                  className="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-600 dark:text-purple-400 text-sm font-medium rounded-lg transition-colors"
                >
                  Found It!
                </button>
              </div>
            ))}
          </div>
        )}
        {activeSigns.length < 3 && (
          <button
            onClick={() => maybeAssignNewSign()}
            className="w-full mt-3 py-2 border border-dashed border-neutral-300 dark:border-neutral-600 rounded-xl text-sm text-neutral-500 hover:border-purple-500 hover:text-purple-500 transition-colors"
          >
            + Get New Sign
          </button>
        )}
      </motion.div>

      {/* Signs Found Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white dark:bg-neutral-800/50 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700/50 shadow-sm dark:shadow-none mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-green-500" />
            <h3 className="font-semibold text-neutral-900 dark:text-white">Signs Found</h3>
          </div>
          <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-500/20 px-2 py-1 rounded-full">
            {foundSigns.length} total
          </span>
        </div>
        {foundSigns.length === 0 ? (
          <p className="text-sm text-neutral-500 text-center py-4">No signs found yet. Keep your eyes open!</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {foundSigns.slice(0, 12).map((sign) => (
              <div key={sign.id} className="flex items-center gap-2 px-3 py-2 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl">
                <span className="text-lg">{sign.emoji}</span>
                <span className="text-sm text-green-700 dark:text-green-400">{sign.label}</span>
              </div>
            ))}
            {foundSigns.length > 12 && (
              <div className="flex items-center px-3 py-2 bg-neutral-100 dark:bg-neutral-700/50 rounded-xl">
                <span className="text-sm text-neutral-500">+{foundSigns.length - 12} more</span>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Manifestation Goals Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-neutral-800/50 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700/50 shadow-sm dark:shadow-none mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-accent-500" />
            <h3 className="font-semibold text-neutral-900 dark:text-white">Manifestation Goals</h3>
          </div>
          <button
            onClick={() => setShowAddGoal(true)}
            className="flex items-center gap-1 text-xs text-accent-600 dark:text-accent-400 bg-accent-100 dark:bg-accent-500/20 px-2 py-1 rounded-full hover:bg-accent-200 dark:hover:bg-accent-500/30 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add Goal
          </button>
        </div>

        {/* Add Goal Input */}
        {showAddGoal && (
          <div className="mb-4 p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl">
            <input
              type="text"
              value={newGoalText}
              onChange={(e) => setNewGoalText(e.target.value)}
              placeholder="What do you want to manifest?"
              className="w-full px-3 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg text-neutral-900 dark:text-white placeholder-neutral-400 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
              onKeyDown={(e) => e.key === 'Enter' && handleAddGoal()}
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleAddGoal}
                className="flex-1 py-2 bg-accent-500 hover:bg-accent-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Add Goal
              </button>
              <button
                onClick={() => { setShowAddGoal(false); setNewGoalText(''); }}
                className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-sm font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Active Goals */}
        {activeGoals.length > 0 && (
          <div className="space-y-2 mb-4">
            <p className="text-xs text-neutral-500 uppercase tracking-wide">Active Goals</p>
            {activeGoals.map((goal) => (
              <div key={goal.id} className="flex items-center justify-between p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-xl">
                <div className="flex-1">
                  <p className="font-medium text-neutral-900 dark:text-white">{goal.title}</p>
                  <p className="text-xs text-neutral-500">Added {new Date(goal.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => markGoalAchieved(goal.id)}
                    className="p-2 bg-green-500/20 hover:bg-green-500/30 text-green-600 dark:text-green-400 rounded-lg transition-colors"
                    title="Mark as achieved"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeGoal(goal.id)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors"
                    title="Remove goal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Achieved Goals */}
        {achievedGoals.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-neutral-500 uppercase tracking-wide">Manifested Goals</p>
            {achievedGoals.slice(0, 5).map((goal) => (
              <div key={goal.id} className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-green-700 dark:text-green-400">{goal.title}</p>
                  <p className="text-xs text-green-600/70 dark:text-green-400/70">Manifested {new Date(goal.achievedAt!).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {achievedGoals.length > 5 && (
              <p className="text-xs text-neutral-500 text-center">+{achievedGoals.length - 5} more manifested goals</p>
            )}
          </div>
        )}

        {activeGoals.length === 0 && achievedGoals.length === 0 && !showAddGoal && (
          <p className="text-sm text-neutral-500 text-center py-4">No goals yet. Add your first manifestation goal!</p>
        )}
      </motion.div>

      {/* Achievements Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="bg-gradient-to-br from-accent-500/10 to-purple-500/10 rounded-2xl p-6 border border-accent-500/20 mb-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <Trophy className="w-6 h-6 text-accent-500 dark:text-accent-400" />
          <h3 className="font-semibold text-neutral-900 dark:text-white">Your Achievements</h3>
        </div>
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-xl bg-accent-500/20 flex items-center justify-center text-2xl">
            🌟
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-2xl">
            🔥
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center text-2xl">
            🎯
          </div>
          <div className="w-12 h-12 rounded-xl bg-neutral-200 dark:bg-neutral-700/50 flex items-center justify-center text-neutral-500">
            +5
          </div>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={() => logout()}
        className="w-full flex items-center justify-center gap-2 py-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 dark:text-red-400 font-medium hover:bg-red-500/20 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </motion.button>
    </div>
  );
};
