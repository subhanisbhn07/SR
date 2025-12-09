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
    // Primary - Neumorphic raised button with proper depth
    primary: 'bg-neumo-surface shadow-neumo-sm hover:shadow-neumo-inset-sm active:shadow-neumo-inset-sm text-neumo-text focus:ring-neumo-accent',
    // Secondary - Neumorphic subtle button
    secondary: 'bg-neumo-surface shadow-neumo-sm hover:shadow-neumo-inset-sm active:shadow-neumo-inset-sm text-neumo-text-secondary focus:ring-neumo-accent',
    // Accent - Neumorphic accent button with border
    accent: 'bg-neumo-surface shadow-neumo-sm hover:shadow-neumo-inset-sm active:shadow-neumo-inset-sm text-neumo-text border border-neumo-border focus:ring-neumo-accent font-semibold',
    // Outline - Neumorphic border button
    outline: 'border border-neumo-border text-neumo-text-secondary hover:bg-neumo-surface-soft focus:ring-neumo-accent',
    // Ghost - Minimal emphasis
    ghost: 'text-neumo-text-secondary hover:bg-neumo-surface-soft focus:ring-neumo-accent',
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
