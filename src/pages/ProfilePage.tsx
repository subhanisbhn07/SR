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
        <h1 className="text-2xl font-bold text-neumo-text mb-2">Profile</h1>
        <p className="text-neumo-text-secondary text-sm">Manage your account</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-neumo-bg rounded-neumo-lg p-6 shadow-neumo mb-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-neumo-bg shadow-neumo-sm flex items-center justify-center">
            <User className="w-8 h-8 text-neumo-text-secondary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-neumo-text">{user?.name || 'User'}</h2>
            <p className="text-neumo-text-secondary text-sm">{user?.email || 'user@example.com'}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-neumo-bg rounded-neumo p-3 text-center shadow-neumo-inset-sm">
            <div className="flex justify-center mb-2">
              <LanternIcon health={lanternHealth} size="sm" />
            </div>
            <p className="text-lg font-bold text-neumo-text">{lanternHealth}</p>
            <p className="text-xs text-neumo-text-muted">Lantern</p>
          </div>
          <div className="bg-neumo-bg rounded-neumo p-3 text-center shadow-neumo-inset-sm">
            <div className="flex justify-center mb-2">
              <Flame className="w-6 h-6 text-neumo-text-secondary" />
            </div>
            <p className="text-lg font-bold text-neumo-text">{streakDays}</p>
            <p className="text-xs text-neumo-text-muted">Day Streak</p>
          </div>
          <div className="bg-neumo-bg rounded-neumo p-3 text-center shadow-neumo-inset-sm">
            <div className="flex justify-center mb-2">
              <Sparkles className="w-6 h-6 text-neumo-text-secondary" />
            </div>
            <p className="text-lg font-bold text-neumo-text">{sparks}</p>
            <p className="text-xs text-neumo-text-muted">Sparks</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-neumo-bg rounded-neumo-lg shadow-neumo mb-6 overflow-hidden"
      >
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`w-full flex items-center gap-4 p-4 hover:bg-neumo-border transition-colors ${
                index !== menuItems.length - 1 ? 'border-b border-neumo-border' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-neumo bg-neumo-bg shadow-neumo-inset-sm flex items-center justify-center">
                <Icon className="w-5 h-5 text-neumo-text-secondary" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-neumo-text">{item.label}</p>
                <p className="text-xs text-neumo-text-muted">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-neumo-text-muted" />
            </button>
          );
        })}
      </motion.div>

      {/* Signs to Find Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-neumo-bg rounded-neumo-lg p-6 shadow-neumo mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Eye className="w-6 h-6 text-neumo-text-secondary" />
            <h3 className="font-semibold text-neumo-text">Signs to Find</h3>
          </div>
          <span className="text-xs text-neumo-text-muted bg-neumo-bg shadow-neumo-inset-sm px-2 py-1 rounded-full">
            {activeSigns.length}/3 active
          </span>
        </div>
        {activeSigns.length === 0 ? (
          <p className="text-sm text-neumo-text-muted text-center py-4">No active signs. Complete your journey to receive new signs!</p>
        ) : (
          <div className="space-y-3">
            {activeSigns.map((sign) => (
              <div key={sign.id} className="flex items-center justify-between p-3 bg-neumo-bg shadow-neumo-inset-sm rounded-neumo">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{sign.emoji}</span>
                  <div>
                    <p className="font-medium text-neumo-text">{sign.label}</p>
                    <p className="text-xs text-neumo-text-muted">Assigned {new Date(sign.assignedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <button
                  onClick={() => markSignFound(sign.id)}
                  className="px-3 py-1.5 bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset text-neumo-text-secondary text-sm font-medium rounded-neumo transition-all"
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
            className="w-full mt-3 py-2 border border-dashed border-neumo-border rounded-neumo text-sm text-neumo-text-muted hover:border-neumo-text-secondary hover:text-neumo-text-secondary transition-colors"
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
        className="bg-neumo-bg rounded-neumo-lg p-6 shadow-neumo mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-neumo-text-secondary" />
            <h3 className="font-semibold text-neumo-text">Signs Found</h3>
          </div>
          <span className="text-xs text-neumo-text-secondary bg-neumo-bg shadow-neumo-inset-sm px-2 py-1 rounded-full">
            {foundSigns.length} total
          </span>
        </div>
        {foundSigns.length === 0 ? (
          <p className="text-sm text-neumo-text-muted text-center py-4">No signs found yet. Keep your eyes open!</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {foundSigns.slice(0, 12).map((sign) => (
              <div key={sign.id} className="flex items-center gap-2 px-3 py-2 bg-neumo-bg shadow-neumo-sm rounded-neumo">
                <span className="text-lg">{sign.emoji}</span>
                <span className="text-sm text-neumo-text-secondary">{sign.label}</span>
              </div>
            ))}
            {foundSigns.length > 12 && (
              <div className="flex items-center px-3 py-2 bg-neumo-bg shadow-neumo-inset-sm rounded-neumo">
                <span className="text-sm text-neumo-text-muted">+{foundSigns.length - 12} more</span>
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
        className="bg-neumo-bg rounded-neumo-lg p-6 shadow-neumo mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-neumo-text-secondary" />
            <h3 className="font-semibold text-neumo-text">Manifestation Goals</h3>
          </div>
          <button
            onClick={() => setShowAddGoal(true)}
            className="flex items-center gap-1 text-xs text-neumo-text-secondary bg-neumo-bg shadow-neumo-sm px-2 py-1 rounded-full hover:shadow-neumo-inset transition-all"
          >
            <Plus className="w-3 h-3" />
            Add Goal
          </button>
        </div>

        {/* Add Goal Input */}
        {showAddGoal && (
          <div className="mb-4 p-3 bg-neumo-bg shadow-neumo-inset-sm rounded-neumo">
            <input
              type="text"
              value={newGoalText}
              onChange={(e) => setNewGoalText(e.target.value)}
              placeholder="What do you want to manifest?"
              className="w-full px-3 py-2 bg-neumo-bg shadow-neumo-inset-sm rounded-neumo text-neumo-text placeholder-neumo-text-muted text-sm focus:outline-none"
              onKeyDown={(e) => e.key === 'Enter' && handleAddGoal()}
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleAddGoal}
                className="flex-1 py-2 bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset text-neumo-text text-sm font-medium rounded-neumo transition-all"
              >
                Add Goal
              </button>
              <button
                onClick={() => { setShowAddGoal(false); setNewGoalText(''); }}
                className="px-4 py-2 bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset text-neumo-text-secondary text-sm font-medium rounded-neumo transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Active Goals */}
        {activeGoals.length > 0 && (
          <div className="space-y-2 mb-4">
            <p className="text-xs text-neumo-text-muted uppercase tracking-wide">Active Goals</p>
            {activeGoals.map((goal) => (
              <div key={goal.id} className="flex items-center justify-between p-3 bg-neumo-bg shadow-neumo-inset-sm rounded-neumo">
                <div className="flex-1">
                  <p className="font-medium text-neumo-text">{goal.title}</p>
                  <p className="text-xs text-neumo-text-muted">Added {new Date(goal.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => markGoalAchieved(goal.id)}
                    className="p-2 bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset text-neumo-text-secondary rounded-neumo transition-all"
                    title="Mark as achieved"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeGoal(goal.id)}
                    className="p-2 bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset text-neumo-text-secondary rounded-neumo transition-all"
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
            <p className="text-xs text-neumo-text-muted uppercase tracking-wide">Manifested Goals</p>
            {achievedGoals.slice(0, 5).map((goal) => (
              <div key={goal.id} className="flex items-center gap-3 p-3 bg-neumo-bg shadow-neumo-sm rounded-neumo">
                <div className="w-8 h-8 rounded-full bg-neumo-bg shadow-neumo-inset-sm flex items-center justify-center">
                  <Check className="w-4 h-4 text-neumo-text-secondary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-neumo-text">{goal.title}</p>
                  <p className="text-xs text-neumo-text-muted">Manifested {new Date(goal.achievedAt!).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
            {achievedGoals.length > 5 && (
              <p className="text-xs text-neumo-text-muted text-center">+{achievedGoals.length - 5} more manifested goals</p>
            )}
          </div>
        )}

        {activeGoals.length === 0 && achievedGoals.length === 0 && !showAddGoal && (
          <p className="text-sm text-neumo-text-muted text-center py-4">No goals yet. Add your first manifestation goal!</p>
        )}
      </motion.div>

      {/* Achievements Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="bg-neumo-bg rounded-neumo-lg p-6 shadow-neumo mb-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <Trophy className="w-6 h-6 text-neumo-text-secondary" />
          <h3 className="font-semibold text-neumo-text">Your Achievements</h3>
        </div>
        <div className="flex gap-3">
          <div className="w-12 h-12 rounded-neumo bg-neumo-bg shadow-neumo-sm flex items-center justify-center text-2xl">
            🌟
          </div>
          <div className="w-12 h-12 rounded-neumo bg-neumo-bg shadow-neumo-sm flex items-center justify-center text-2xl">
            🔥
          </div>
          <div className="w-12 h-12 rounded-neumo bg-neumo-bg shadow-neumo-sm flex items-center justify-center text-2xl">
            🎯
          </div>
          <div className="w-12 h-12 rounded-neumo bg-neumo-bg shadow-neumo-inset-sm flex items-center justify-center text-neumo-text-muted">
            +5
          </div>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={() => logout()}
        className="w-full flex items-center justify-center gap-2 py-4 bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset rounded-neumo text-neumo-text-secondary font-medium transition-all"
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </motion.button>
    </div>
  );
};
