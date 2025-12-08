import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

interface SectionCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  onViewMore?: () => void;
  viewMoreText?: string;
  className?: string;
  noPadding?: boolean;
}

/**
 * SectionCard - Unified card wrapper for all homepage sections
 * Ensures consistent card-based UI across mobile and desktop
 */
export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  subtitle,
  children,
  onViewMore,
  viewMoreText = 'View More',
  className = '',
  noPadding = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`
        bg-white dark:bg-surface-card-dark 
        rounded-2xl 
        border border-surface-border-strong dark:border-surface-border-dark-strong 
        shadow-sm dark:shadow-none
        mb-4 sm:mb-6
        ${noPadding ? '' : 'p-4 sm:p-5 lg:p-6'}
        ${className}
      `}
    >
      {/* Header with title and subtitle */}
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Content */}
      <div>{children}</div>

      {/* View More button */}
      {onViewMore && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={onViewMore}
            className="
              flex items-center gap-2 
              px-6 py-2.5 
              bg-neutral-100 dark:bg-neutral-800 
              hover:bg-neutral-200 dark:hover:bg-neutral-700 
              text-neutral-700 dark:text-neutral-300 
              font-medium text-sm
              rounded-full 
              transition-colors
              border border-neutral-200 dark:border-neutral-700
            "
          >
            {viewMoreText}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default SectionCard;
