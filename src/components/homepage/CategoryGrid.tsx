import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CategoryGridProps {
  onCategorySelect?: (category: string) => void;
}

const categories = [
  { id: 1, name: 'Inner Peace', emoji: '🧘', accentColor: 'emerald' },
  { id: 2, name: 'Daily Motivation', emoji: '⚡', accentColor: 'teal' },
  { id: 3, name: 'Manifest Abundance', emoji: '✨', accentColor: 'gold' },
  { id: 4, name: 'Gratitude Practice', emoji: '🙏', accentColor: 'emerald' },
  { id: 5, name: 'Deep Sleep', emoji: '🌙', accentColor: 'teal' },
  { id: 6, name: 'Heal Relationships', emoji: '💝', accentColor: 'emerald' },
  { id: 7, name: 'Confidence Boost', emoji: '💪', accentColor: 'teal' },
  { id: 8, name: 'Anxiety Relief', emoji: '🌸', accentColor: 'emerald' },
  { id: 9, name: 'Self-Worth', emoji: '👑', accentColor: 'gold' },
  { id: 10, name: 'Clarity & Focus', emoji: '🎯', accentColor: 'teal' },
  { id: 11, name: 'Morning Rituals', emoji: '🌅', accentColor: 'emerald' },
  { id: 12, name: 'Release Negativity', emoji: '🕊️', accentColor: 'teal' }
];

const getAccentClasses = (accent: string) => {
  switch (accent) {
    case 'emerald':
      return {
        iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
        iconText: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-l-emerald-400 dark:border-l-emerald-600',
      };
    case 'teal':
      return {
        iconBg: 'bg-teal-50 dark:bg-teal-900/30',
        iconText: 'text-teal-600 dark:text-teal-400',
        border: 'border-l-teal-400 dark:border-l-teal-600',
      };
    case 'gold':
      return {
        iconBg: 'bg-gold-50 dark:bg-gold-900/30',
        iconText: 'text-gold-600 dark:text-gold-400',
        border: 'border-l-gold-400 dark:border-l-gold-600',
      };
    default:
      return {
        iconBg: 'bg-emerald-50 dark:bg-emerald-900/30',
        iconText: 'text-emerald-600 dark:text-emerald-400',
        border: 'border-l-emerald-400 dark:border-l-emerald-600',
      };
  }
};

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleCategories = showAll ? categories : categories.slice(0, 8);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">Explore by Intention</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        <AnimatePresence>
          {visibleCategories.map((category, index) => {
            const accent = getAccentClasses(category.accentColor);
            return (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, delay: Math.min(0.02 * index, 0.15) }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onCategorySelect?.(category.name)}
                aria-label={`Explore ${category.name} courses`}
                className={`p-4 md:p-5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 border-l-4 ${accent.border} cursor-pointer group transition-all duration-200 hover:shadow-md text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${accent.iconBg} flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200`}>
                    {category.emoji}
                  </div>
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
                    {category.name}
                  </h3>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {categories.length > 8 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => setShowAll(!showAll)}
          aria-expanded={showAll}
          className="mt-4 mx-auto flex items-center gap-2 px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950"
        >
          {showAll ? (
            <>
              Show less <ChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              Show all intentions <ChevronDown className="w-4 h-4" />
            </>
          )}
        </motion.button>
      )}
    </motion.div>
  );
};
