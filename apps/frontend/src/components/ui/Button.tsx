import React from 'react';
import { motion } from 'framer-motion';

/**
 * SignRoad Button Component (Design System v6.0)
 * Apple-Style Modern Flat Design
 *
 * Design Philosophy:
 * - Buttons are ALWAYS clearly tappable with high contrast
 * - No neumorphism on buttons (reserved for non-critical surfaces)
 * - Clean, predictable hover/active states
 * - Restrained motion (subtle scale, no bounce)
 *
 * Variants:
 * - primary: Transformative Teal (#0E9A91) - Main CTAs, interactive elements
 * - secondary: Light background with teal text - Alternative actions
 * - gold: Luminous Gold (#E8B54A) - HIGH-VALUE CONVERSION ONLY
 * - ghost: Text only with underline on hover - Tertiary actions
 * - outline: Transparent with border - Secondary emphasis
 *
 * CRITICAL: Gold CTA reserved for:
 * - Paywall primary CTA
 * - "Continue Journey" after trial
 * - "Share Receipt" (viral moment)
 * - "Rekindle Lantern" (return action)
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
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
  const baseClasses = `
    inline-flex items-center justify-center 
    font-semibold tracking-tight
    rounded-xl 
    transition-all duration-200 ease-out
    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    ${fullWidth ? 'w-full' : ''}
  `.replace(/\s+/g, ' ').trim();

  const variants = {
    // PRIMARY - Solid teal, Apple-style clean
    primary: `
      bg-[#0E9A91] text-white
      shadow-sm
      hover:bg-[#0C8A82] hover:shadow-md
      active:bg-[#0A7A72] active:shadow-sm
      focus-visible:ring-[#0E9A91]
    `,

    // SECONDARY - Light teal background, teal text
    secondary: `
      bg-[#0E9A91]/10 text-[#0E9A91]
      border border-transparent
      hover:bg-[#0E9A91]/15 hover:border-[#0E9A91]/20
      active:bg-[#0E9A91]/20
      focus-visible:ring-[#0E9A91]
    `,

    // OUTLINE - Transparent with border
    outline: `
      bg-transparent text-[#0E9A91]
      border-2 border-[#0E9A91]
      hover:bg-[#0E9A91]/5
      active:bg-[#0E9A91]/10
      focus-visible:ring-[#0E9A91]
    `,

    // GOLD - High-value conversion only
    gold: `
      bg-[#E8B54A] text-[#1A2B4A]
      shadow-sm
      hover:bg-[#D4A43F] hover:shadow-md
      active:bg-[#C09435] active:shadow-sm
      focus-visible:ring-[#E8B54A]
    `,

    // GHOST - Text only, minimal
    ghost: `
      bg-transparent text-neutral-600
      hover:text-neutral-900 hover:bg-neutral-100
      active:bg-neutral-200
      focus-visible:ring-neutral-400
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-base',
  };
  
  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.01 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.99 }}
      transition={{ duration: 0.15 }}
      className={`${baseClasses} ${variants[variant].replace(/\s+/g, ' ').trim()} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      type={type}
      aria-label={ariaLabel}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" aria-hidden="true" />
      ) : null}
      {children}
    </motion.button>
  );
};
