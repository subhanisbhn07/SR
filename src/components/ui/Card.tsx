import React from 'react';
import { motion } from 'framer-motion';

/**
 * SignRoad Card Component (Design System v5.0)
 * "Soft Mystical Minimalism" Framework
 *
 * Variants:
 * - standard: Warm ivory background, mist border, subtle shadow
 * - elevated: Featured content with larger shadow
 * - glow: Reward/Achievement with gold glow effect
 * - dark: For deep cosmos backgrounds
 */
interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'standard' | 'elevated' | 'glow' | 'dark';
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'standard',
  hover = false,
  onClick,
}) => {
  const Component = onClick ? motion.div : 'div';

  const variants = {
    // STANDARD CARD
    standard: 'bg-surface-card border border-surface-border rounded-lg p-5 shadow-sm',

    // ELEVATED CARD (Featured Content)
    elevated: 'bg-surface-card rounded-xl p-6 shadow-md border-0',

    // GLOW CARD (Reward/Achievement)
    glow: 'bg-surface-card border-[1.5px] border-gold/40 rounded-lg p-5 shadow-glow-gold',

    // DARK CARD (On Deep Cosmos Backgrounds)
    dark: 'bg-white/5 border border-white/10 rounded-lg p-5 shadow-none',
  };

  const hoverEffects = hover ? 'hover:shadow-md hover:scale-[1.01] transition-all duration-base' : '';
  const cursorEffect = onClick ? 'cursor-pointer' : '';

  return (
    <Component
      className={`${variants[variant]} ${hoverEffects} ${cursorEffect} ${className}`}
      onClick={onClick}
      whileHover={onClick && !hover ? { y: -2, scale: 1.01 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </Component>
  );
};