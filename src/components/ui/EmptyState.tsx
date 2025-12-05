import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: 'default' | 'compact';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  variant = 'default',
}) => {
  const isCompact = variant === 'compact';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center text-center ${
        isCompact ? 'py-6 px-4' : 'py-12 px-6'
      } bg-neutral-50 dark:bg-neutral-800/30 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-700`}
    >
      <div className={`${isCompact ? 'w-10 h-10' : 'w-14 h-14'} rounded-full bg-neutral-100 dark:bg-neutral-700/50 flex items-center justify-center mb-4`}>
        <Icon className={`${isCompact ? 'w-5 h-5' : 'w-7 h-7'} text-neutral-400 dark:text-neutral-500`} />
      </div>
      <h3 className={`${isCompact ? 'text-base' : 'text-lg'} font-semibold text-neutral-700 dark:text-neutral-300 mb-2`}>
        {title}
      </h3>
      <p className={`${isCompact ? 'text-xs' : 'text-sm'} text-neutral-500 dark:text-neutral-400 max-w-xs mb-4`}>
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
};
