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
        iconBg: 'bg-teal-100 dark:bg-teal-900/30',
        shadow: 'hover:shadow-neu-teal dark:hover:shadow-neu-dark-teal',
        accent: 'from-teal-500',
      };
    case 'teal':
      return {
        iconBg: 'bg-teal-soft-100 dark:bg-teal-soft-900/30',
        shadow: 'hover:shadow-neu-teal dark:hover:shadow-neu-dark-teal',
        accent: 'from-teal-soft-500',
      };
    case 'gold':
      return {
        iconBg: 'bg-gold-100 dark:bg-gold-900/30',
        shadow: 'hover:shadow-neu-gold dark:hover:shadow-neu-dark-sm',
        accent: 'from-gold-500',
      };
    default:
      return {
        iconBg: 'bg-teal-100 dark:bg-teal-900/30',
        shadow: 'hover:shadow-neu-teal dark:hover:shadow-neu-dark-teal',
        accent: 'from-teal-500',
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
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">Explore by Intention</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
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
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onCategorySelect?.(category.name)}
                aria-label={`Explore ${category.name} courses`}
                className={`p-5 md:p-6 rounded-2xl bg-gradient-card dark:bg-gradient-card-dark shadow-neu dark:shadow-neu-dark ${accent.shadow} cursor-pointer group transition-all duration-300 text-left relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950`}
              >
                {/* Subtle gradient accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accent.accent} to-transparent opacity-60`} />

                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl ${accent.iconBg} flex items-center justify-center text-2xl shadow-neu-sm dark:shadow-neu-dark-sm group-hover:scale-110 transition-transform duration-300`}>
                    {category.emoji}
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-neutral-800 dark:text-neutral-100 leading-tight">
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
          className="mt-6 mx-auto flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-teal-600 dark:text-teal-400 bg-gradient-neu dark:bg-gradient-neu-dark shadow-neu-sm dark:shadow-neu-dark-sm hover:shadow-neu transition-all duration-200 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-950"
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
