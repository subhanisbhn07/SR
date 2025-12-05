import React from 'react';
import { motion } from 'framer-motion';

interface CategoryGridProps {
  onCategorySelect?: (category: string) => void;
}

const categories = [
  { id: 1, name: 'Inner Peace', emoji: '🧘', bgColor: 'bg-purple-100', textColor: 'text-purple-800' },
  { id: 2, name: 'Daily Motivation', emoji: '⚡', bgColor: 'bg-orange-100', textColor: 'text-orange-800' },
  { id: 3, name: 'Manifest Abundance', emoji: '✨', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
  { id: 4, name: 'Gratitude Practice', emoji: '🙏', bgColor: 'bg-green-100', textColor: 'text-green-800' },
  { id: 5, name: 'Deep Sleep', emoji: '🌙', bgColor: 'bg-indigo-100', textColor: 'text-indigo-800' },
  { id: 6, name: 'Heal Relationships', emoji: '💝', bgColor: 'bg-pink-100', textColor: 'text-pink-800' },
  { id: 7, name: 'Confidence Boost', emoji: '💪', bgColor: 'bg-red-100', textColor: 'text-red-800' },
  { id: 8, name: 'Anxiety Relief', emoji: '🌸', bgColor: 'bg-fuchsia-100', textColor: 'text-fuchsia-800' },
  { id: 9, name: 'Self-Worth', emoji: '👑', bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
  { id: 10, name: 'Clarity & Focus', emoji: '🎯', bgColor: 'bg-cyan-100', textColor: 'text-cyan-800' },
  { id: 11, name: 'Morning Rituals', emoji: '🌅', bgColor: 'bg-orange-50', textColor: 'text-orange-800' },
  { id: 12, name: 'Release Negativity', emoji: '🕊️', bgColor: 'bg-teal-100', textColor: 'text-teal-800' }
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
                      className={`p-4 md:p-6 rounded-2xl ${category.bgColor} backdrop-blur-sm border border-neutral-200/50 cursor-pointer group transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/10 text-left shadow-sm`}
                    >
            <div className="text-center">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {category.emoji}
              </div>
              <h3 className={`text-sm font-medium ${category.textColor} leading-tight`}>
                {category.name}
              </h3>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
