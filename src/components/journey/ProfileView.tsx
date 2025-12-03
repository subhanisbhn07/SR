import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, Settings, Crown, Sparkles, Calendar, Target, ChevronRight } from 'lucide-react';
import { useJourneyStore } from '../../store/journeyStore';
import { LanternWidget } from './LanternWidget';

export const ProfileView: React.FC = () => {
  const { user, logout } = useJourneyStore();

  if (!user) return null;

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getRoleLabel = () => {
    switch (user.role) {
      case 'wanderer':
        return { label: 'Wanderer', color: 'text-blue-400', bg: 'bg-blue-500/20' };
      case 'seeker':
        return { label: 'Seeker', color: 'text-purple-400', bg: 'bg-purple-500/20' };
      case 'pathfinder':
        return { label: 'Pathfinder', color: 'text-pink-400', bg: 'bg-pink-500/20' };
      case 'master':
        return { label: 'Master', color: 'text-amber-400', bg: 'bg-amber-500/20' };
      default:
        return { label: 'Wanderer', color: 'text-blue-400', bg: 'bg-blue-500/20' };
    }
  };

  const roleInfo = getRoleLabel();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black pb-24">
      {/* Header */}
      <div className="p-4 pt-8">
        <div className="max-w-md mx-auto">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-3xl p-6 border border-white/10 mb-6"
          >
            {/* Avatar and name */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-3xl">
                {user.fullName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{user.fullName}</h1>
                <p className="text-purple-300 text-sm">{user.email}</p>
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${roleInfo.bg} mt-2`}>
                  {user.isSeeker && <Crown className="w-3 h-3 text-amber-400" />}
                  <span className={`text-xs font-medium ${roleInfo.color}`}>{roleInfo.label}</span>
                </div>
              </div>
            </div>

            {/* Lantern widget */}
            <LanternWidget />
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 gap-4 mb-6"
          >
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300 text-sm">Current Day</span>
              </div>
              <p className="text-3xl font-bold text-white">{user.progress.currentDay}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300 text-sm">Signs Found</span>
              </div>
              <p className="text-3xl font-bold text-white">{user.progress.totalSignsFound}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-purple-300 text-sm">Total Sparks</span>
              </div>
              <p className="text-3xl font-bold text-amber-400">{user.progress.sparks}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">🔥</span>
                <span className="text-purple-300 text-sm">Streak</span>
              </div>
              <p className="text-3xl font-bold text-orange-400">{user.progress.streakDays}</p>
            </div>
          </motion.div>

          {/* Intention */}
          {user.progress.intention && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-6"
            >
              <p className="text-purple-300 text-sm mb-1">Your Intention</p>
              <p className="text-white font-semibold capitalize">{user.progress.intention}</p>
            </motion.div>
          )}

          {/* Menu items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden mb-6"
          >
            <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5 text-purple-400" />
                <span className="text-white">Settings</span>
              </div>
              <ChevronRight className="w-5 h-5 text-purple-400" />
            </button>
            <div className="border-t border-white/10" />
            {!user.isSeeker && (
              <>
                <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <Crown className="w-5 h-5 text-amber-400" />
                    <span className="text-white">Become a Seeker</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-purple-400" />
                </button>
                <div className="border-t border-white/10" />
              </>
            )}
            <button
              onClick={logout}
              className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5 text-red-400" />
                <span className="text-red-400">Sign Out</span>
              </div>
            </button>
          </motion.div>

          {/* Journey started */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-purple-300 text-sm"
          >
            Journey started {formatDate(user.createdAt)}
          </motion.p>
        </div>
      </div>
    </div>
  );
};
