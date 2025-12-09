import React from 'react';
import { motion } from 'framer-motion';

/**
 * SignRoad Button Component (Design System v1)
 * 
 * Variants follow the 70/15/10/5 brand color distribution:
 * - primary: Transformative Teal (#0E7A77) - Main CTAs, form submissions
 * - secondary: Teal Soft (#17A7A2) - Secondary actions, alternative paths
 * - accent: Gold (#EEC76A) - Reward CTAs, premium upsells, celebrations (use sparingly - 5% max!)
 * - outline: Teal border - Tertiary actions, cancel buttons
 * - ghost: Text only - Minimal emphasis, inline actions
 * 
 * Motion: 120ms ease-in-out hover transitions per spec
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  /** Accessible label for screen readers when button content is not descriptive */
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ariaLabel,
  type = 'button',
  ...props
}) => {
  const baseClasses = `inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed ${fullWidth ? 'w-full' : ''}`;
  
  const variants = {
    // Emerald - Primary brand CTA (most important actions)
    primary: 'bg-emerald-500 hover:bg-emerald-600 text-white focus:ring-emerald-400 shadow-lg hover:shadow-xl',
    // Teal - Secondary actions (alternative paths)
    secondary: 'bg-teal-500 hover:bg-teal-600 text-white focus:ring-teal-400 shadow-lg hover:shadow-xl',
    // Gold - Accent CTA (rewards, premium, celebrations) - use sparingly (10% rule)
    accent: 'bg-gold-500 hover:bg-gold-600 text-neutral-900 focus:ring-gold-400 shadow-lg hover:shadow-xl font-semibold',
    // Teal outline - Tertiary actions
    outline: 'border-2 border-teal-500 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950 focus:ring-teal-400',
    // Ghost - Minimal emphasis
    ghost: 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950 focus:ring-emerald-400',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      type={type}
      aria-label={ariaLabel}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" aria-hidden="true" />
      ) : null}
      {children}
    </motion.button>
  );
};
