import React from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';

export const PersonalGreeting: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8 p-6 bg-white dark:bg-neutral-800/50 backdrop-blur-sm rounded-2xl border border-neutral-200 dark:border-neutral-700/50 shadow-sm dark:shadow-none"
    >
      <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
        Hi {user?.name || 'there'}, ready to manifest your next win? ✨
      </h2>
      <p className="text-neutral-600 dark:text-neutral-300 flex items-center space-x-2">
        <span>You've meditated {user?.streak || 3} days in a row</span>
        <span className="text-2xl">🙌</span>
      </p>
    </motion.div>
  );
};
