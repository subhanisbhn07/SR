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
      } bg-neumo-bg rounded-neumo-lg border border-dashed border-neumo-border shadow-neumo-inset-sm`}
    >
      <div className={`${isCompact ? 'w-10 h-10' : 'w-14 h-14'} rounded-full bg-neumo-bg shadow-neumo-sm flex items-center justify-center mb-4`}>
        <Icon className={`${isCompact ? 'w-5 h-5' : 'w-7 h-7'} text-neumo-text-muted`} />
      </div>
      <h3 className={`${isCompact ? 'text-base' : 'text-lg'} font-semibold text-neumo-text mb-2`}>
        {title}
      </h3>
      <p className={`${isCompact ? 'text-xs' : 'text-sm'} text-neumo-text-secondary max-w-xs mb-4`}>
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-neumo-bg shadow-neumo-sm hover:shadow-neumo-inset text-neumo-text text-sm font-medium rounded-neumo transition-all"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
};
