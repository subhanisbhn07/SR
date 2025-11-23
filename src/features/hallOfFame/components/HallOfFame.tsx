import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Sparkles, Calendar, TrendingUp } from 'lucide-react';
import { useHallOfFameStore } from '../store/hallOfFameStore';
import { format } from 'date-fns';

export const HallOfFame = () => {
  const { entries, stats, isLoading, fetchEntries } = useHallOfFameStore();

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading Hall of Fame...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Trophy className="w-12 h-12 text-accent-500" />
            <h1 className="text-5xl font-bold text-white">Hall of Fame</h1>
            <Trophy className="w-12 h-12 text-accent-500" />
          </div>
          <p className="text-xl text-neutral-400">
            Honoring the Masters who completed the 365-day journey
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700"
          >
            <Trophy className="w-8 h-8 text-accent-500 mb-2" />
            <p className="text-3xl font-bold text-white mb-1">{stats.totalMasters}</p>
            <p className="text-sm text-neutral-400">Total Masters</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700"
          >
            <Calendar className="w-8 h-8 text-primary-500 mb-2" />
            <p className="text-3xl font-bold text-white mb-1">{stats.averageCompletionTime}</p>
            <p className="text-sm text-neutral-400">Avg. Days to Complete</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700"
          >
            <Sparkles className="w-8 h-8 text-purple-500 mb-2" />
            <p className="text-3xl font-bold text-white mb-1">{stats.mostPopularGoal}</p>
            <p className="text-sm text-neutral-400">Most Popular Goal</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700"
          >
            <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
            <p className="text-3xl font-bold text-white mb-1">{stats.totalJourneyDays.toLocaleString()}</p>
            <p className="text-sm text-neutral-400">Total Journey Days</p>
          </motion.div>
        </div>

        {/* Masters List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white mb-6">The Masters</h2>
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700 hover:border-accent-500/50 transition-colors"
            >
              <div className="flex items-start gap-6">
                {/* Rank Badge */}
                <div className="flex-shrink-0">
                  <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold
                    ${entry.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900' :
                      entry.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-gray-900' :
                      entry.rank === 3 ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-orange-900' :
                      'bg-neutral-700 text-white'}
                  `}>
                    #{entry.rank}
                  </div>
                </div>

                {/* Avatar */}
                <img
                  src={entry.userAvatar}
                  alt={entry.userName}
                  className="w-20 h-20 rounded-full border-2 border-accent-500"
                />

                {/* Info */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{entry.userName}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-sm text-neutral-400">Days Completed</p>
                      <p className="text-lg font-semibold text-white">{entry.daysCompleted}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400">Total Sparks</p>
                      <p className="text-lg font-semibold text-accent-500">{entry.totalSparks.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400">Total XP</p>
                      <p className="text-lg font-semibold text-primary-500">{entry.totalXP.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400">Completed</p>
                      <p className="text-lg font-semibold text-white">
                        {format(entry.completionDate, 'MMM yyyy')}
                      </p>
                    </div>
                  </div>
                  {entry.testimonial && (
                    <blockquote className="italic text-neutral-300 border-l-2 border-accent-500 pl-4">
                      "{entry.testimonial}"
                    </blockquote>
                  )}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {entry.achievements.map((achievement) => (
                      <span
                        key={achievement}
                        className="px-3 py-1 bg-accent-500/20 text-accent-400 text-xs font-medium rounded-full border border-accent-500/30"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Become a Master CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-br from-accent-500/20 to-primary-500/20 rounded-2xl p-8 border border-accent-500/30 text-center"
        >
          <Sparkles className="w-12 h-12 text-accent-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Become a Master</h3>
          <p className="text-neutral-300 mb-6">
            Complete all 365 days of your journey and join the Hall of Fame. Your name will be honored here forever.
          </p>
          <button className="px-8 py-3 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-lg transition-colors">
            Start Your Journey
          </button>
        </motion.div>
      </div>
    </div>
  );
};
