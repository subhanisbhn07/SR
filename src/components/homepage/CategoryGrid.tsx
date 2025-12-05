import React from 'react';
import { motion } from 'framer-motion';

interface CategoryGridProps {
  onCategorySelect?: (category: string) => void;
}

const categories = [
  { id: 1, name: 'Inner Peace', emoji: '🧘', color: 'from-blue-500/20 to-purple-500/20' },
  { id: 2, name: 'Daily Motivation', emoji: '⚡', color: 'from-orange-500/20 to-red-500/20' },
  { id: 3, name: 'Manifest Abundance', emoji: '✨', color: 'from-yellow-500/20 to-orange-500/20' },
  { id: 4, name: 'Gratitude Practice', emoji: '🙏', color: 'from-green-500/20 to-teal-500/20' },
  { id: 5, name: 'Deep Sleep', emoji: '🌙', color: 'from-indigo-500/20 to-purple-500/20' },
  { id: 6, name: 'Heal Relationships', emoji: '💝', color: 'from-pink-500/20 to-rose-500/20' },
  { id: 7, name: 'Confidence Boost', emoji: '💪', color: 'from-red-500/20 to-pink-500/20' },
  { id: 8, name: 'Anxiety Relief', emoji: '🌸', color: 'from-purple-500/20 to-pink-500/20' },
  { id: 9, name: 'Self-Worth', emoji: '👑', color: 'from-yellow-500/20 to-amber-500/20' },
  { id: 10, name: 'Clarity & Focus', emoji: '🎯', color: 'from-cyan-500/20 to-blue-500/20' },
  { id: 11, name: 'Morning Rituals', emoji: '🌅', color: 'from-orange-500/20 to-yellow-500/20' },
  { id: 12, name: 'Release Negativity', emoji: '🕊️', color: 'from-teal-500/20 to-green-500/20' }
];

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">Explore by Intention</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {categories.map((category, index) => (
                    <motion.button
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.05 * index }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onCategorySelect?.(category.name)}
                      className={`p-4 md:p-6 rounded-2xl bg-white dark:bg-gradient-to-br ${category.color} backdrop-blur-sm border border-neutral-200 dark:border-neutral-700/30 cursor-pointer group transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/10 dark:hover:shadow-accent-500/10 text-left shadow-sm dark:shadow-none`}
                    >
            <div className="text-center">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {category.emoji}
              </div>
              <h3 className="text-sm font-medium text-neutral-700 dark:text-neutral-200 leading-tight">
                {category.name}
              </h3>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
