import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface OnboardingSplashProps {
  onContinue: () => void;
}

export const OnboardingSplash: React.FC<OnboardingSplashProps> = ({ onContinue }) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-black flex flex-col items-center justify-center p-6 overflow-hidden"
    >
      {/* Particle background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              y: [null, Math.random() * -200],
              opacity: [null, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: 'loop',
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex items-center justify-center shadow-2xl shadow-amber-500/30"
        >
          <Sparkles className="w-16 h-16 text-white" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-8 text-4xl font-bold text-white tracking-wider"
        >
          SignRoad
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-4 text-lg text-purple-200 text-center max-w-xs"
        >
          The Universe speaks in whispers.
          <br />
          Learn to listen.
        </motion.p>
      </motion.div>

      {/* Enter button */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={onContinue}
            className="absolute bottom-20 px-12 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105"
          >
            Enter the Unknown
          </motion.button>
        )}
      </AnimatePresence>

      {/* Subtle glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
    </motion.div>
  );
};
