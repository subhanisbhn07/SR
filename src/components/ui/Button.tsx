import React from 'react';
import { motion } from 'framer-motion';

/**
 * SignRoad Button Component (Design System v4.0)
 * Aligned with Master Documentation Section 5.1
 *
 * Variants follow the design system color distribution:
 * - primary: Transformative Teal (#0E9A91) - Main CTAs, form submissions (12-15% usage)
 * - secondary: Soft Teal (#5FBFB8) - Secondary actions, alternative paths
 * - accent: Luminous Gold (#E8B54A) - Reward CTAs, premium upsells, celebrations (5% MAX!)
 * - outline: Teal border - Tertiary actions, cancel buttons
 * - ghost: Text only - Minimal emphasis, inline actions
 *
 * Motion: 120ms ease-in-out hover transitions per master doc spec
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
  const baseClasses = `inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-snow disabled:opacity-50 disabled:cursor-not-allowed ${fullWidth ? 'w-full' : ''}`;

  const variants = {
    // Primary - Transformative Teal (#0E9A91)
    primary: 'bg-brand-teal text-white shadow-sm hover:bg-brand-teal-dark active:bg-brand-teal-dark focus-visible:ring-brand-teal',

    // Secondary - Soft Teal (#5FBFB8)
    secondary: 'bg-brand-teal-soft text-white shadow-sm hover:bg-brand-teal-light active:bg-brand-teal focus-visible:ring-brand-teal-soft',

    // Accent - Luminous Gold (#E8B54A) - USE SPARINGLY (5% max!)
    accent: 'bg-gold-500 text-neutral-charcoal shadow-gold-glow hover:bg-gold-600 active:bg-gold-700 focus-visible:ring-gold-500 font-semibold',

    // Outline - Teal border
    outline: 'border-2 border-brand-teal text-brand-teal bg-transparent hover:bg-brand-teal-muted active:bg-brand-teal-muted focus-visible:ring-brand-teal',

    // Ghost - Minimal emphasis
    ghost: 'text-brand-teal bg-transparent hover:bg-brand-teal-muted active:bg-opacity-20 focus-visible:ring-brand-teal',
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
      transition={{ duration: 0.12, ease: 'easeInOut' }}
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
