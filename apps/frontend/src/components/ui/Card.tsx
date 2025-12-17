import React from 'react';
import { motion } from 'framer-motion';

/**
 * SignRoad Card Component (Design System v6.0)
 * Apple-Style Modern Flat + Controlled Depth + Ceremonial Glass
 *
 * Design Philosophy:
 * - flat (default, 80-85%): Apple-style modern flat design. Clean surfaces, high-contrast.
 *   Used for daily use screens: Today, audio player, logging flows, onboarding, settings.
 * 
 * - softDepth (15-20%): Subtle depth cue. NOT for text, buttons, or decisions.
 *   Used for: Lantern container, progress indicators, inactive cards, background wells.
 * 
 * - glass (5%): Ceremonial moments only. Creates emotional pause.
 *   Used for: Universe Receipts, milestone reveals, share modals, completion states.
 * 
 * Legacy variants (standard, elevated, glow, dark) are mapped to new system.
 */
interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'flat' | 'softDepth' | 'glass' | 'standard' | 'elevated' | 'glow' | 'dark';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'flat',
  padding,
  hover = false,
  onClick,
}) => {
  const Component = onClick ? motion.div : 'div';

  // Map legacy variants to new system
  const normalizedVariant = {
    standard: 'flat',
    elevated: 'flat',
    glow: 'glass',
    dark: 'softDepth',
    flat: 'flat',
    softDepth: 'softDepth',
    glass: 'glass',
  }[variant] as 'flat' | 'softDepth' | 'glass';

  const variants = {
    // FLAT CARD (Apple-style, 80-85% of UI)
    // Clean white surface, subtle shadow, crisp border, high contrast
    flat: 'bg-white border border-neutral-200 rounded-xl shadow-sm',

    // SOFT DEPTH CARD (Neumorphic depth cue, 15-20%)
    // Subtle inset feeling, warm background, for non-critical surfaces only
    // Never for text, primary buttons, or decision-heavy interactions
    softDepth: 'bg-neutral-50 border border-neutral-200/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.02)] rounded-xl',

    // GLASS CARD (Ceremonial moments, 5%)
    // Translucent with blur, creates emotional pause
    // Only for: Universe Receipts, milestone reveals, share modals, completion states
    glass: 'bg-white/80 backdrop-blur-xl border border-white/50 shadow-lg rounded-2xl',
  };

  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4 sm:p-5',
    lg: 'p-5 sm:p-6',
  };

  // Default padding based on variant if not specified
  const defaultPadding = padding || (normalizedVariant === 'glass' ? 'lg' : 'md');
  const paddingClass = paddingStyles[defaultPadding];

  const hoverEffects = hover 
    ? 'hover:shadow-md hover:border-neutral-300 active:scale-[0.99] transition-all duration-200 ease-out' 
    : '';
  const cursorEffect = onClick ? 'cursor-pointer' : '';

  return (
    <Component
      className={`${variants[normalizedVariant]} ${paddingClass} ${hoverEffects} ${cursorEffect} ${className}`}
      onClick={onClick}
      whileHover={onClick && !hover ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </Component>
  );
};

// Convenience exports for specific use cases
export const FlatCard: React.FC<Omit<CardProps, 'variant'>> = (props) => (
  <Card variant="flat" {...props} />
);

export const SoftDepthCard: React.FC<Omit<CardProps, 'variant'>> = (props) => (
  <Card variant="softDepth" {...props} />
);

export const GlassCard: React.FC<Omit<CardProps, 'variant'>> = (props) => (
  <Card variant="glass" {...props} />
);
