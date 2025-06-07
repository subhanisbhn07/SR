import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick,
}) => {
  const Component = onClick ? motion.div : 'div';
  
  return (
    <Component
      className={`bg-white rounded-2xl shadow-sm border border-neutral-200 ${
        hover ? 'hover:shadow-lg transition-shadow duration-200' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      whileHover={onClick ? { y: -2 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </Component>
  );
};