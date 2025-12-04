import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Target, TrendingUp, Award, Play, Clock } from 'lucide-react';
import { useAuthStore } from '../../auth/store/authStore';
import { useWellnessStore } from '../../wellness/store/wellnessStore';
import { Card } from '../../../shared/ui/Card';
import { Button } from '../../../shared/ui/Button';
import { Badge } from '../../../shared/ui/Badge';

export const ConsumerDashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { sessions, achievements } = useWellnessStore();
  
  const featuredSessions = sessions.slice(0, 3);
  const unlockedAchievements = achievements.filter(a => a.unlockedAt);
  
  const stats = [
    {
      label: 'Current Streak',
      value: `${user?.streak || 0} days`,
      icon: Calendar,
      color: 'text-primary-600',
      bg: 'bg-primary-50',
    },
    {
      label: 'Sessions Completed',
      value: user?.totalSessions || 0,
      icon: Target,
      color: 'text-secondary-600',
      bg: 'bg-secondary-50',
    },
    {
      label: 'Wellness Score',
      value: '87%',
      icon: TrendingUp,
      color: 'text-success-600',
      bg: 'bg-success-50',
    },
    {
      label: 'Achievements',
      value: unlockedAchievements.length,
      icon: Award,
      color: 'text-accent-600',
      bg: 'bg-accent-50',
    },
  ];
  
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-primary-100 text-lg">
              You're on a {user?.streak}-day streak! Keep the momentum going.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-4xl">🔥</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                    <p className="text-sm text-neutral-600">{stat.label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
      
      {/* Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Daily Check-in */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Daily Reflection</h2>
            <p className="text-neutral-600 mb-6">
              How do you feel about your current emotions?
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Your reflection..."
                  className="flex-1 px-4 py-3 border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Button size="sm">
                  Save
                </Button>
              </div>
              
              <div className="flex space-x-2">
                {['😊', '😐', '😔', '😰', '😤', '😕'].map((emoji, index) => (
                  <button
                    key={index}
                    className="w-12 h-12 bg-neutral-100 hover:bg-primary-50 rounded-xl flex items-center justify-center text-xl transition-colors duration-200"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
        
        {/* Featured Sessions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-neutral-900">Featured</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-3">
              {featuredSessions.map((session) => (
                <div
                  key={session.id}
                  className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-neutral-100 transition-colors duration-200"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-neutral-900">{session.title}</h3>
                      {session.isPremium && (
                        <Badge variant="warning" size="sm">Premium</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-neutral-600">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{session.duration}min</span>
                      </span>
                      <Badge variant="primary" size="sm">
                        {session.category}
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
      
      {/* Recent Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Recent Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {unlockedAchievements.map((achievement) => (
              <div
                key={achievement.id}
                className="flex items-center space-x-3 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl"
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div>
                  <h3 className="font-medium text-neutral-900">{achievement.title}</h3>
                  <p className="text-sm text-neutral-600">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
