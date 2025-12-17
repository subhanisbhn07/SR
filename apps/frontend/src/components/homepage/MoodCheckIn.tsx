import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const moods = [
  { emoji: '😊', label: 'Happy', value: 'happy' },
  { emoji: '😌', label: 'Peaceful', value: 'peaceful' },
  { emoji: '😔', label: 'Sad', value: 'sad' },
  { emoji: '😰', label: 'Anxious', value: 'anxious' },
  { emoji: '😤', label: 'Frustrated', value: 'frustrated' },
  { emoji: '🥰', label: 'Grateful', value: 'grateful' }
];

export const MoodCheckIn: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setTimeout(() => {
      setIsOpen(false);
      setSelectedMood(null);
    }, 1500);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 w-14 h-14 bg-accent-500 hover:bg-accent-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40"
      >
        <span className="text-xl">😊</span>
      </motion.button>

      {/* Mood Check-in Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-neutral-800 rounded-2xl p-6 max-w-sm w-full border border-neutral-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-neutral-100">How are you feeling?</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-neutral-700 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-neutral-400" />
                </button>
              </div>

              {!selectedMood ? (
                <div className="grid grid-cols-3 gap-3">
                  {moods.map((mood) => (
                    <motion.button
                      key={mood.value}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleMoodSelect(mood.value)}
                      className="p-4 bg-neutral-700/50 hover:bg-neutral-600/50 rounded-xl transition-colors duration-200 text-center"
                    >
                      <div className="text-2xl mb-2">{mood.emoji}</div>
                      <div className="text-xs text-neutral-300">{mood.label}</div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="text-4xl mb-4">✨</div>
                  <p className="text-neutral-100 font-medium">Thank you for sharing!</p>
                  <p className="text-neutral-400 text-sm">Your mood has been recorded.</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};