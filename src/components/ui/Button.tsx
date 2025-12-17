import React from 'react';
import { motion } from 'framer-motion';

/**
 * SignRoad Button Component (Design System v5.0)
 * "Soft Mystical Minimalism" Framework
 *
 * Variants:
 * - primary: Transformative Teal (#0E9A91) - Main CTAs, interactive elements
 * - secondary: Transparent with teal border - Alternative actions
 * - gold: Luminous Gold (#E8B54A) - HIGH-VALUE CONVERSION ONLY (paywall, viral moments)
 * - ghost: Text only - Tertiary actions
 *
 * CRITICAL: Gold CTA reserved for:
 * - Paywall primary CTA
 * - "Continue Journey" after trial
 * - "Share Receipt" (viral moment)
 * - "Rekindle Lantern" (return action)
 *
 * Animations: 120ms hover, scale effects per design guide
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'ghost';
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
  const baseClasses = `inline-flex items-center justify-center font-medium rounded-xl transition-all duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed ${fullWidth ? 'w-full' : ''}`;

  const variants = {
    // PRIMARY BUTTON - Transformative Teal
    primary: 'bg-brand-teal text-white shadow-btn hover:bg-brand-teal-dark hover:shadow-btn-hover active:bg-brand-teal-darker active:scale-98',

    // SECONDARY BUTTON - Transparent with teal border
    secondary: 'bg-transparent border-[1.5px] border-brand-teal text-brand-teal hover:bg-btn-secondary-hover active:bg-[rgba(14,154,145,0.12)]',

    // GOLD CTA BUTTON - High-value conversion only
    gold: 'bg-gold text-charcoal font-semibold shadow-btn-gold hover:bg-gold-dark hover:shadow-btn-gold-hover active:bg-gold-darker active:scale-98',

    // GHOST BUTTON - Tertiary
    ghost: 'bg-transparent text-slate hover:text-charcoal hover:underline',
  };

  const sizes = {
    sm: 'px-4 py-2.5 text-sm',
    md: 'px-6 py-3.5 text-base',
    lg: 'px-7 py-4 text-base',
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
