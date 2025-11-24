import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Flame, 
  Zap, 
  Calendar, 
  Trophy, 
  Settings, 
  LogOut,
  Bell,
  Volume2,
  Moon,
  Sun,
  ChevronRight
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useJourneyStore } from '../features/journey/store/journeyStore';
import { useSubscriptionStore } from '../features/subscription/store/subscriptionStore';

export const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { currentDay, completedDays, streak, lanternHealth, sparks } = useJourneyStore();
  const { tier } = useSubscriptionStore();
  const [showSettings, setShowSettings] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const stats = [
    {
      icon: Calendar,
      label: 'Current Day',
      value: currentDay,
      color: 'text-primary-400',
      bgColor: 'bg-primary-500/10',
    },
    {
      icon: Trophy,
      label: 'Completed',
      value: completedDays.length,
      color: 'text-accent-400',
      bgColor: 'bg-accent-500/10',
    },
    {
      icon: Flame,
      label: 'Streak',
      value: `${streak} days`,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
    },
    {
      icon: Flame,
      label: 'Lantern Health',
      value: `${lanternHealth}%`,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
    },
    {
      icon: Zap,
      label: 'Sparks',
      value: sparks,
      color: 'text-accent-400',
      bgColor: 'bg-accent-500/10',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 pb-20">
      {/* Header */}
      <header className="bg-neutral-900/50 backdrop-blur-sm border-b border-neutral-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/journey')}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold text-white">Profile</h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Avatar & User Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl p-8 mb-6 border border-neutral-700"
        >
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              {/* Lantern Health Indicator */}
              <div className="absolute -bottom-2 -right-2 bg-neutral-900 rounded-full p-2 border-2 border-yellow-500">
                <Flame className="w-5 h-5 text-yellow-400" />
              </div>
            </div>

            {/* User Details */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-1">
                {user?.email?.split('@')[0] || 'Traveler'}
              </h2>
              <p className="text-neutral-400 mb-2">
                {tier === 'seeker' ? '✨ Seeker' : '🌟 Wanderer'}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-neutral-400">
                  Joined {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Customize Button */}
            <button
              onClick={() => navigate('/cosmetics')}
              className="px-4 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-lg transition-colors"
            >
              Customize
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-neutral-800 rounded-xl p-4 border border-neutral-700"
            >
              <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-sm text-neutral-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Settings Panel */}
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-neutral-800 rounded-xl p-6 mb-6 border border-neutral-700"
          >
            <h3 className="text-lg font-bold text-white mb-4">Settings</h3>
            
            {/* Notifications Toggle */}
            <div className="flex items-center justify-between py-3 border-b border-neutral-700">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-neutral-400" />
                <div>
                  <p className="text-white font-medium">Notifications</p>
                  <p className="text-sm text-neutral-400">Daily meditation reminders</p>
                </div>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  notificationsEnabled ? 'bg-primary-500' : 'bg-neutral-600'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Sound Toggle */}
            <div className="flex items-center justify-between py-3 border-b border-neutral-700">
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-neutral-400" />
                <div>
                  <p className="text-white font-medium">Sound Effects</p>
                  <p className="text-sm text-neutral-400">UI interaction sounds</p>
                </div>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  soundEnabled ? 'bg-primary-500' : 'bg-neutral-600'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    soundEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                {darkMode ? (
                  <Moon className="w-5 h-5 text-neutral-400" />
                ) : (
                  <Sun className="w-5 h-5 text-neutral-400" />
                )}
                <div>
                  <p className="text-white font-medium">Dark Mode</p>
                  <p className="text-sm text-neutral-400">App appearance</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  darkMode ? 'bg-primary-500' : 'bg-neutral-600'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden mb-6"
        >
          <button
            onClick={() => navigate('/travelers-log')}
            className="w-full flex items-center justify-between p-4 hover:bg-neutral-700 transition-colors border-b border-neutral-700"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-neutral-400" />
              <span className="text-white">Traveler's Log</span>
            </div>
            <ChevronRight className="w-5 h-5 text-neutral-400" />
          </button>

          <button
            onClick={() => navigate('/hall-of-fame')}
            className="w-full flex items-center justify-between p-4 hover:bg-neutral-700 transition-colors border-b border-neutral-700"
          >
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-neutral-400" />
              <span className="text-white">Hall of Fame</span>
            </div>
            <ChevronRight className="w-5 h-5 text-neutral-400" />
          </button>

          {tier === 'wanderer' && (
            <button
              onClick={() => navigate('/subscription')}
              className="w-full flex items-center justify-between p-4 hover:bg-neutral-700 transition-colors border-b border-neutral-700"
            >
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-accent-400" />
                <span className="text-white">Upgrade to Seeker</span>
              </div>
              <ChevronRight className="w-5 h-5 text-neutral-400" />
            </button>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-4 hover:bg-neutral-700 transition-colors text-red-400"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5" />
              <span>Log Out</span>
            </div>
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Account Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm text-neutral-500"
        >
          <p>SignRoad v1.0.0</p>
          <p className="mt-1">
            <a href="#" className="hover:text-neutral-400 transition-colors">Privacy Policy</a>
            {' · '}
            <a href="#" className="hover:text-neutral-400 transition-colors">Terms of Service</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
