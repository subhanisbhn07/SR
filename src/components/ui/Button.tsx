import React from 'react';
import { motion } from 'framer-motion';

/**
 * SignRoad Button Component
 * 
 * Variants follow the 60/30/10 brand color distribution:
 * - primary: Emerald (#0F6F55) - Main CTAs, form submissions
 * - secondary: Teal (#11A39E) - Secondary actions, alternative paths
 * - accent: Gold (#EEC76A) - Reward CTAs, premium upsells, celebrations
 * - outline: Teal border - Tertiary actions, cancel buttons
 * - ghost: Text only - Minimal emphasis, inline actions
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = `inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${fullWidth ? 'w-full' : ''}`;
  
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </motion.button>
  );
};
