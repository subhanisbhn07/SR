import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, TrendingUp, Calendar, Sparkles } from 'lucide-react';

const moodOptions = [
  { emoji: '😊', label: 'Great', color: 'bg-green-500/20 border-green-500/50' },
  { emoji: '🙂', label: 'Good', color: 'bg-blue-500/20 border-blue-500/50' },
  { emoji: '😐', label: 'Okay', color: 'bg-yellow-500/20 border-yellow-500/50' },
  { emoji: '😔', label: 'Low', color: 'bg-orange-500/20 border-orange-500/50' },
  { emoji: '😢', label: 'Struggling', color: 'bg-red-500/20 border-red-500/50' },
];

const weeklyMoods = [
  { day: 'Mon', mood: '😊' },
  { day: 'Tue', mood: '🙂' },
  { day: 'Wed', mood: '😐' },
  { day: 'Thu', mood: '🙂' },
  { day: 'Fri', mood: '😊' },
  { day: 'Sat', mood: '😊' },
  { day: 'Sun', mood: null },
];

export const MoodPage: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [moodLogged, setMoodLogged] = useState(false);

  const handleMoodSelect = (emoji: string) => {
    setSelectedMood(emoji);
  };

  const handleLogMood = () => {
    if (selectedMood) {
      setMoodLogged(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-neumo-text mb-2">Mood Check-In</h1>
        <p className="text-neumo-text-secondary text-sm">Track how you're feeling today</p>
      </motion.div>

      {!moodLogged ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-neumo-bg rounded-neumo-lg p-6 shadow-neumo mb-6"
        >
          <h2 className="text-lg font-semibold text-neumo-text mb-4 text-center">How are you feeling?</h2>
          <div className="flex justify-center gap-3 sm:gap-4 mb-6">
            {moodOptions.map((option) => (
              <button
                key={option.label}
                onClick={() => handleMoodSelect(option.emoji)}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-neumo flex items-center justify-center text-xl sm:text-2xl transition-all ${
                  selectedMood === option.emoji
                    ? 'bg-neumo-bg shadow-neumo-inset'
                    : 'bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset'
                }`}
              >
                {option.emoji}
              </button>
            ))}
          </div>
          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="max-w-sm mx-auto"
            >
              <p className="text-center text-neumo-text-secondary mb-4">
                You're feeling {moodOptions.find(m => m.emoji === selectedMood)?.label.toLowerCase()}
              </p>
              <button
                onClick={handleLogMood}
                className="w-full py-3 bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset text-neumo-text font-medium rounded-neumo transition-all"
              >
                Log Mood
              </button>
            </motion.div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-neumo-bg rounded-neumo-lg p-6 shadow-neumo mb-6 text-center"
        >
          <div className="w-16 h-16 rounded-full bg-neumo-bg shadow-neumo-inset-sm flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-neumo-text-secondary" />
          </div>
          <h2 className="text-lg font-semibold text-neumo-text mb-2">Mood Logged!</h2>
          <p className="text-neumo-text-secondary text-sm">+5 Sparks earned for checking in</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-neumo-bg rounded-neumo-lg p-5 sm:p-6 shadow-neumo"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-neumo-text-secondary" />
            <h2 className="text-lg font-semibold text-neumo-text">This Week</h2>
          </div>
          <div className="grid grid-cols-7 gap-2 sm:gap-3">
            {weeklyMoods.map((day, index) => (
              <div key={day.day} className="flex flex-col items-center gap-2">
                <span className="text-xs text-neumo-text-secondary">{day.day}</span>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-neumo flex items-center justify-center text-lg sm:text-xl ${
                  day.mood ? 'bg-neumo-bg shadow-neumo-inset-sm' : 'bg-neumo-bg shadow-neumo-sm'
                }`}>
                  {day.mood || (index === 6 ? '?' : '')}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-neumo-bg rounded-neumo-lg p-5 sm:p-6 shadow-neumo"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-neumo-text-secondary" />
            <h2 className="text-lg font-semibold text-neumo-text">Your Trend</h2>
          </div>
          <div className="flex items-center justify-between lg:flex-col lg:items-start lg:gap-4">
            <div>
              <p className="text-sm text-neumo-text-secondary mb-1">Average mood this week</p>
              <p className="text-2xl font-bold text-neumo-text">Good 🙂</p>
            </div>
            <div className="text-right lg:text-left">
              <p className="text-sm text-neumo-text-secondary font-medium">+12%</p>
              <p className="text-xs text-neumo-text-muted">vs last week</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
