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
    <div className="min-h-screen pb-20">
      {/* Header - Watercolor Style */}
      <header className="backdrop-blur-sm border-b sticky top-0 z-10" style={{ backgroundColor: 'rgba(232, 245, 241, 0.9)', borderColor: 'rgba(125, 211, 192, 0.3)' }}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/journey')}
            className="transition-colors"
            style={{ color: '#4a5568' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#2d3748')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#4a5568')}
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold" style={{ color: '#2d3748' }}>Profile</h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="transition-colors"
            style={{ color: '#4a5568' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#2d3748')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#4a5568')}
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Avatar & User Info - Watercolor Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-watercolor rounded-2xl p-8 mb-6"
        >
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #7dd3c0 0%, #ffd89b 100%)' }}>
                <User className="w-12 h-12" style={{ color: '#2d3748' }} />
              </div>
              {/* Lantern Health Indicator */}
              <div className="absolute -bottom-2 -right-2 rounded-full p-2 border-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderColor: '#ffd89b' }}>
                <Flame className="w-5 h-5" style={{ color: '#f4c77e' }} />
              </div>
            </div>

            {/* User Details */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1" style={{ color: '#2d3748' }}>
                {user?.email?.split('@')[0] || 'Traveler'}
              </h2>
              <p className="mb-2" style={{ color: '#4a5568' }}>
                {tier === 'seeker' ? '✨ Seeker' : '🌟 Wanderer'}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span style={{ color: '#718096' }}>
                  Joined {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Customize Button */}
            <button
              onClick={() => navigate('/cosmetics')}
              className="px-4 py-2 rounded-lg transition-colors"
              style={{ background: 'linear-gradient(135deg, #ffd89b 0%, #f4c77e 100%)', color: '#2d3748', border: '2px solid rgba(244, 199, 126, 0.5)' }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Customize
            </button>
          </div>
        </motion.div>

        {/* Stats Grid - Watercolor Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="card-watercolor rounded-xl p-4"
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(125, 211, 192, 0.15)' }}>
                <stat.icon className="w-5 h-5" style={{ color: '#5fb8a6' }} />
              </div>
              <p className="text-2xl font-bold mb-1" style={{ color: '#2d3748' }}>{stat.value}</p>
              <p className="text-sm" style={{ color: '#4a5568' }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Settings Panel - Watercolor Style */}
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="card-watercolor rounded-xl p-6 mb-6"
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: '#2d3748' }}>Settings</h3>
            
            {/* Notifications Toggle */}
            <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: 'rgba(125, 211, 192, 0.2)' }}>
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5" style={{ color: '#718096' }} />
                <div>
                  <p className="font-medium" style={{ color: '#2d3748' }}>Notifications</p>
                  <p className="text-sm" style={{ color: '#718096' }}>Daily meditation reminders</p>
                </div>
              </div>
              <button
                onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                className="w-12 h-6 rounded-full transition-colors"
                style={{ backgroundColor: notificationsEnabled ? '#7dd3c0' : 'rgba(168, 230, 215, 0.3)' }}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Sound Toggle */}
            <div className="flex items-center justify-between py-3 border-b" style={{ borderColor: 'rgba(125, 211, 192, 0.2)' }}>
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5" style={{ color: '#718096' }} />
                <div>
                  <p className="font-medium" style={{ color: '#2d3748' }}>Sound Effects</p>
                  <p className="text-sm" style={{ color: '#718096' }}>UI interaction sounds</p>
                </div>
              </div>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="w-12 h-6 rounded-full transition-colors"
                style={{ backgroundColor: soundEnabled ? '#7dd3c0' : 'rgba(168, 230, 215, 0.3)' }}
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
                  <Moon className="w-5 h-5" style={{ color: '#718096' }} />
                ) : (
                  <Sun className="w-5 h-5" style={{ color: '#718096' }} />
                )}
                <div>
                  <p className="font-medium" style={{ color: '#2d3748' }}>Dark Mode</p>
                  <p className="text-sm" style={{ color: '#718096' }}>App appearance</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-12 h-6 rounded-full transition-colors"
                style={{ backgroundColor: darkMode ? '#7dd3c0' : 'rgba(168, 230, 215, 0.3)' }}
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

        {/* Quick Actions - Watercolor Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card-watercolor rounded-xl overflow-hidden mb-6"
        >
          <button
            onClick={() => navigate('/travelers-log')}
            className="w-full flex items-center justify-between p-4 transition-colors border-b"
            style={{ borderColor: 'rgba(125, 211, 192, 0.2)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168, 230, 215, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5" style={{ color: '#718096' }} />
              <span style={{ color: '#2d3748' }}>Traveler's Log</span>
            </div>
            <ChevronRight className="w-5 h-5" style={{ color: '#718096' }} />
          </button>

          <button
            onClick={() => navigate('/hall-of-fame')}
            className="w-full flex items-center justify-between p-4 transition-colors border-b"
            style={{ borderColor: 'rgba(125, 211, 192, 0.2)' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168, 230, 215, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5" style={{ color: '#718096' }} />
              <span style={{ color: '#2d3748' }}>Hall of Fame</span>
            </div>
            <ChevronRight className="w-5 h-5" style={{ color: '#718096' }} />
          </button>

          {tier === 'wanderer' && (
            <button
              onClick={() => navigate('/subscription')}
              className="w-full flex items-center justify-between p-4 transition-colors border-b"
              style={{ borderColor: 'rgba(125, 211, 192, 0.2)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(168, 230, 215, 0.2)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5" style={{ color: '#f4c77e' }} />
                <span style={{ color: '#2d3748' }}>Upgrade to Seeker</span>
              </div>
              <ChevronRight className="w-5 h-5" style={{ color: '#718096' }} />
            </button>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between p-4 transition-colors"
            style={{ color: '#f4a6a6' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(244, 166, 166, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5" />
              <span style={{  }}>Log Out</span>
            </div>
            <ChevronRight className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Account Info - Watercolor Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center text-sm"
          style={{ color: '#718096' }}
        >
          <p>SignRoad v1.0.0</p>
          <p className="mt-1">
            <a href="#" className="transition-colors" style={{ color: '#718096' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#4a5568')} onMouseLeave={(e) => (e.currentTarget.style.color = '#718096')}>Privacy Policy</a>
            {' · '}
            <a href="#" className="transition-colors" style={{ color: '#718096' }} onMouseEnter={(e) => (e.currentTarget.style.color = '#4a5568')} onMouseLeave={(e) => (e.currentTarget.style.color = '#718096')}>Terms of Service</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};
