import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Target, AlertCircle, Calendar, BarChart3 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const EnterpriseDashboard: React.FC = () => {
  const teamStats = [
    {
      label: 'Team Wellness Score',
      value: '84%',
      change: '+5.2%',
      icon: TrendingUp,
      color: 'text-success-600',
      bg: 'bg-success-50',
    },
    {
      label: 'Active Participants',
      value: '127/150',
      change: '+12',
      icon: Users,
      color: 'text-primary-600',
      bg: 'bg-primary-50',
    },
    {
      label: 'Program Completion',
      value: '78%',
      change: '+8.1%',
      icon: Target,
      color: 'text-secondary-600',
      bg: 'bg-secondary-50',
    },
    {
      label: 'Risk Alerts',
      value: '3',
      change: '-2',
      icon: AlertCircle,
      color: 'text-warning-600',
      bg: 'bg-warning-50',
    },
  ];
  
  const recentActivities = [
    {
      user: 'Sarah Chen',
      action: 'Completed "Leadership Presence" program',
      time: '2 hours ago',
      type: 'completion',
    },
    {
      user: 'Marketing Team',
      action: 'Started "Stress Management" workshop',
      time: '4 hours ago',
      type: 'start',
    },
    {
      user: 'John Smith',
      action: 'Achieved 30-day wellness streak',
      time: '6 hours ago',
      type: 'achievement',
    },
  ];
  
  const upcomingEvents = [
    {
      title: 'Team Mindfulness Session',
      date: 'Today, 2:00 PM',
      participants: 24,
    },
    {
      title: 'Leadership Workshop',
      date: 'Tomorrow, 10:00 AM',
      participants: 15,
    },
    {
      title: 'Wellness Check-in',
      date: 'Friday, 3:00 PM',
      participants: 45,
    },
  ];
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-accent-500 to-primary-500 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Enterprise Dashboard</h1>
            <p className="text-accent-100 text-lg">
              Monitor your team's wellness journey and drive performance excellence.
            </p>
          </div>
          <div className="hidden md:flex space-x-4">
            <Button variant="secondary" size="sm">
              Export Report
            </Button>
            <Button variant="outline" size="sm" className="border-white text-white hover:bg-white/10">
              Schedule Review
            </Button>
          </div>
        </div>
      </motion.div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {teamStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <Badge variant={stat.change.startsWith('+') ? 'success' : 'error'} size="sm">
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-neutral-900 mb-1">{stat.value}</p>
                <p className="text-sm text-neutral-600">{stat.label}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
      
      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Team Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2"
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-neutral-900">Recent Activity</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-neutral-50 rounded-xl"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'completion' ? 'bg-success-100' :
                    activity.type === 'start' ? 'bg-primary-100' : 'bg-warning-100'
                  }`}>
                    {activity.type === 'completion' ? '✅' :
                     activity.type === 'start' ? '🚀' : '🏆'}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-neutral-900">{activity.user}</p>
                    <p className="text-sm text-neutral-600">{activity.action}</p>
                  </div>
                  <span className="text-xs text-neutral-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
        
        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-neutral-900">Upcoming Events</h2>
              <Calendar className="w-5 h-5 text-neutral-400" />
            </div>
            
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="p-4 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors duration-200"
                >
                  <h3 className="font-medium text-neutral-900 mb-1">{event.title}</h3>
                  <p className="text-sm text-neutral-600 mb-2">{event.date}</p>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-neutral-400" />
                    <span className="text-sm text-neutral-600">{event.participants} participants</span>
                  </div>
                </div>
              ))}
            </div>
            
            <Button className="w-full mt-4" variant="outline">
              Schedule New Event
            </Button>
          </Card>
        </motion.div>
      </div>
      
      {/* Analytics Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-neutral-900">Wellness Trends</h2>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm">7D</Button>
              <Button variant="ghost" size="sm">30D</Button>
              <Button variant="primary" size="sm">90D</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
              <BarChart3 className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <p className="text-2xl font-bold text-primary-900">92%</p>
              <p className="text-sm text-primary-700">Engagement Rate</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-success-50 to-success-100 rounded-xl">
              <TrendingUp className="w-8 h-8 text-success-600 mx-auto mb-3" />
              <p className="text-2xl font-bold text-success-900">+15%</p>
              <p className="text-sm text-success-700">Productivity Increase</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl">
              <Target className="w-8 h-8 text-secondary-600 mx-auto mb-3" />
              <p className="text-2xl font-bold text-secondary-900">87%</p>
              <p className="text-sm text-secondary-700">Goal Achievement</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};