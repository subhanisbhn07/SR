import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight, Sparkles, Flame, Trophy } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { LanternIcon } from '../components/ui/LanternIcon';

const menuItems = [
  { icon: Settings, label: 'Settings', description: 'App preferences' },
  { icon: Bell, label: 'Notifications', description: 'Manage alerts' },
  { icon: Shield, label: 'Privacy', description: 'Data & security' },
  { icon: HelpCircle, label: 'Help & Support', description: 'Get assistance' },
];

export const ProfilePage: React.FC = () => {
  const { user, logout } = useAuthStore();
  const lanternHealth = user?.lanternHealth || 82;
  const streakDays = user?.streakDays || 7;
  const sparks = user?.sparks || 245;

  return (
    <div className="px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-white mb-2">Profile</h1>
        <p className="text-neutral-400 text-sm">Manage your account</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-neutral-800/50 rounded-2xl p-6 border border-neutral-700/50 mb-6"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-500 to-purple-500 flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{user?.name || 'User'}</h2>
            <p className="text-neutral-400 text-sm">{user?.email || 'user@example.com'}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-neutral-900/50 rounded-xl p-3 text-center">
            <div className="flex justify-center mb-2">
              <LanternIcon health={lanternHealth} size="sm" />
            </div>
            <p className="text-lg font-bold text-white">{lanternHealth}</p>
            <p className="text-xs text-neutral-500">Lantern</p>
          </div>
          <div className="bg-neutral-900/50 rounded-xl p-3 text-center">
            <div className="flex justify-center mb-2">
              <Flame className="w-6 h-6 text-orange-400" />
            </div>
            <p className="text-lg font-bold text-white">{streakDays}</p>
            <p className="text-xs text-neutral-500">Day Streak</p>
          </div>
          <div className="bg-neutral-900/50 rounded-xl p-3 text-center">
            <div className="flex justify-center mb-2">
              <Sparkles className="w-6 h-6 text-accent-400" />
            </div>
            <p className="text-lg font-bold text-white">{sparks}</p>
            <p className="text-xs text-neutral-500">Sparks</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-neutral-800/50 rounded-2xl border border-neutral-700/50 mb-6 overflow-hidden"
      >
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`w-full flex items-center gap-4 p-4 hover:bg-neutral-700/30 transition-colors ${
                index !== menuItems.length - 1 ? 'border-b border-neutral-700/50' : ''
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-700/50 flex items-center justify-center">
                <Icon className="w-5 h-5 text-neutral-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-white">{item.label}</p>
                <p className="text-xs text-neutral-500">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-500" />
            </button>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-accent-500/10 to-purple-500/10 rounded-2xl p-6 border border-accent-500/20 mb-6"
      >
        <div className="flex items-center gap-3 mb-3">
          <Trophy className="w-6 h-6 text-accent-400" />
          <h3 className="font-semibold text-white">Your Achievements</h3>
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
          <div className="w-12 h-12 rounded-xl bg-neutral-700/50 flex items-center justify-center text-neutral-500">
            +5
          </div>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onClick={() => logout()}
        className="w-full flex items-center justify-center gap-2 py-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 font-medium hover:bg-red-500/20 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </motion.button>
    </div>
  );
};
