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
  const baseClasses = `inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed ${fullWidth ? 'w-full' : ''}`;

  const variants = {
    // Primary - Teal gradient with neumorphic shadow (main CTAs)
    primary: 'bg-gradient-teal text-white focus-visible:ring-teal-400 shadow-neu-sm dark:shadow-neu-dark-sm hover:shadow-neu-teal-glow dark:hover:shadow-neu-dark-teal',
    // Secondary - Soft teal gradient (alternative actions)
    secondary: 'bg-gradient-teal-soft text-white focus-visible:ring-teal-400 shadow-neu-sm dark:shadow-neu-dark-sm hover:shadow-neu-teal dark:hover:shadow-neu-dark-teal',
    // Accent - Gold gradient (rewards, premium) - use sparingly (5% rule)
    accent: 'bg-gradient-gold text-neutral-900 focus-visible:ring-gold-400 shadow-neu-gold dark:shadow-neu-dark-sm hover:shadow-neu-xl',
    // Outline - Neumorphic outline style
    outline: 'bg-gradient-neu dark:bg-gradient-neu-dark border-2 border-teal-400 dark:border-teal-600 text-teal-600 dark:text-teal-400 focus-visible:ring-teal-400 shadow-neu-sm dark:shadow-neu-dark-sm hover:shadow-neu hover:border-teal-500',
    // Ghost - Minimal with subtle hover
    ghost: 'text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/50 focus-visible:ring-teal-400',
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
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" aria-hidden="true" />
      ) : null}
      {children}
    </motion.button>
  );
};
