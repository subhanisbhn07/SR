import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

interface PromiseScreenProps {
  onContinue: () => void;
}

export const PromiseScreen: React.FC<PromiseScreenProps> = ({ onContinue }) => {
  const [currentLine, setCurrentLine] = useState(0);

  const lines = [
    '7 Days.',
    '7 Signs.',
    '1 Journey.',
    'It begins now.',
  ];

  useEffect(() => {
    if (currentLine < lines.length) {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [currentLine]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-b from-indigo-950 via-purple-950 to-black flex flex-col items-center justify-center p-6"
    >
      {/* Animated background glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute w-96 h-96 bg-amber-500/20 rounded-full blur-3xl"
      />

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 mx-auto mb-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl shadow-amber-500/30"
        >
          <Sparkles className="w-10 h-10 text-white" />
        </motion.div>

        <div className="space-y-4 mb-12">
          {lines.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: currentLine > index ? 1 : 0,
                y: currentLine > index ? 0 : 20,
              }}
              transition={{ duration: 0.5 }}
              className={`text-3xl font-bold ${
                index === lines.length - 1 ? 'text-amber-400' : 'text-white'
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {currentLine >= lines.length && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={onContinue}
            className="px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
          >
            Take the First Step
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
      <div className="absolute top-40 right-16 w-1 h-1 bg-purple-400 rounded-full animate-pulse" />
      <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
      <div className="absolute bottom-48 right-24 w-1 h-1 bg-pink-400 rounded-full animate-pulse" />
    </motion.div>
  );
};
