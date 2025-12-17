import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { Sun, Moon, Sunrise, Sunset } from 'lucide-react';

const getTimeOfDayGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return { greeting: 'Good morning', icon: Sunrise, emoji: '🌅', message: 'Start your day with intention' };
  } else if (hour >= 12 && hour < 17) {
    return { greeting: 'Good afternoon', icon: Sun, emoji: '☀️', message: 'Keep your momentum going' };
  } else if (hour >= 17 && hour < 21) {
    return { greeting: 'Good evening', icon: Sunset, emoji: '🌆', message: 'Wind down and reflect' };
  } else {
    return { greeting: 'Good night', icon: Moon, emoji: '🌙', message: 'Rest well, manifest tomorrow' };
  }
};

const getRoadMessage = (road?: string) => {
  switch (road) {
    case 'sleep':
      return 'Your sleep journey continues tonight';
    case 'burnout':
      return 'One step at a time toward balance';
    case 'manifestation':
      return 'The universe is listening';
    default:
      return 'Your manifestation road awaits';
  }
};

export const PersonalGreeting: React.FC = () => {
  const { user } = useAuthStore();
  const timeOfDay = getTimeOfDayGreeting();
  const TimeIcon = timeOfDay.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8 p-6 bg-neumo-bg rounded-neumo-lg shadow-neumo"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <TimeIcon className="w-5 h-5 text-neumo-text-secondary" />
            <span className="text-sm text-neumo-text-secondary font-medium">{timeOfDay.message}</span>
          </div>
          <h2 className="text-2xl font-bold text-neumo-text mb-2">
            {timeOfDay.greeting}, {user?.name || 'there'}
          </h2>
          <p className="text-neumo-text-secondary">
            {getRoadMessage(user?.selectedRoad)} {timeOfDay.emoji}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-neumo-text-secondary">{user?.streak || 3}</div>
          <p className="text-xs text-neumo-text-muted">day streak</p>
        </div>
      </div>
    </motion.div>
  );
};
