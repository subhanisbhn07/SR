import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Check, X, MapPin, Smartphone, Eye } from 'lucide-react';
import { RoadStep } from '../../types/journey';
import { useJourneyStore } from '../../store/journeyStore';

interface SignRevealProps {
  step: RoadStep;
  onClose: () => void;
}

export const SignReveal: React.FC<SignRevealProps> = ({ step, onClose }) => {
  const { logSign, skipSign, signRevealed, revealSign } = useJourneyStore();
  const [showLogForm, setShowLogForm] = useState(false);
  const [journalEntry, setJournalEntry] = useState('');
  const [isDigital, setIsDigital] = useState(false);
  const [location, setLocation] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  const handleReveal = () => {
    revealSign();
  };

  const handleFoundIt = () => {
    setShowLogForm(true);
  };

  const handleSubmit = () => {
    logSign(journalEntry, isDigital, location);
    setShowConfetti(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleSkip = () => {
    skipSign();
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-6"
    >
      {/* Confetti effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: '50%',
                  y: '50%',
                  scale: 0,
                }}
                animate={{
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: [0, 1, 0],
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 1.5,
                  delay: Math.random() * 0.3,
                  ease: 'easeOut',
                }}
                className={`absolute w-3 h-3 rounded-full ${
                  ['bg-amber-400', 'bg-orange-400', 'bg-pink-400', 'bg-purple-400'][
                    Math.floor(Math.random() * 4)
                  ]
                }`}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm"
      >
        {!signRevealed ? (
          // Card flip reveal
          <motion.div
            className="relative w-full aspect-[3/4] cursor-pointer perspective-1000"
            onClick={handleReveal}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-1"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(168, 85, 247, 0.3)',
                  '0 0 60px rgba(168, 85, 247, 0.5)',
                  '0 0 30px rgba(168, 85, 247, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-full h-full rounded-3xl bg-gray-900 flex flex-col items-center justify-center">
                <motion.div
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-16 h-16 text-amber-400 mb-4" />
                </motion.div>
                <p className="text-white text-xl font-semibold">Your Sign Awaits</p>
                <p className="text-purple-300 mt-2">Tap to reveal</p>
              </div>
            </motion.div>
          </motion.div>
        ) : showLogForm ? (
          // Log form
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 rounded-3xl p-6 border border-white/10"
          >
            <div className="text-center mb-6">
              <span className="text-5xl mb-4 block">{step.signEmoji}</span>
              <h3 className="text-xl font-bold text-white">You found the {step.signName}!</h3>
            </div>

            {/* Journal entry */}
            <div className="mb-4">
              <label className="text-sm text-purple-300 mb-2 block">
                Where did you see it?
              </label>
              <textarea
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                placeholder={step.journalPrompt}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-amber-500 resize-none h-24"
              />
            </div>

            {/* Location (optional) */}
            <div className="mb-4">
              <label className="text-sm text-purple-300 mb-2 block">
                Location (optional)
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, State"
                  className="w-full py-2 pl-10 pr-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300/50 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Physical vs Digital toggle */}
            <div className="mb-6">
              <label className="text-sm text-purple-300 mb-2 block">How did you see it?</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsDigital(false)}
                  className={`flex-1 py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                    !isDigital
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  Physical
                </button>
                <button
                  onClick={() => setIsDigital(true)}
                  className={`flex-1 py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-all ${
                    isDigital
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/10 text-white/70 hover:bg-white/20'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  Digital
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Log Sign +5 Sparks
            </button>
          </motion.div>
        ) : (
          // Revealed sign
          <motion.div
            initial={{ rotateY: 180, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 p-1 rounded-3xl"
          >
            <div className="bg-gray-900 rounded-3xl p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className="text-7xl mb-6"
              >
                {step.signEmoji}
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-bold text-white mb-2"
              >
                {step.signName}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-purple-300 mb-2"
              >
                Day {step.day}: {step.title}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-white/80 italic mb-8"
              >
                "{step.keyLesson}"
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="space-y-3"
              >
                <button
                  onClick={handleFoundIt}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  I Found It!
                </button>

                <button
                  onClick={handleSkip}
                  className="w-full py-3 bg-white/10 text-white/70 font-medium rounded-xl hover:bg-white/20 transition-colors"
                >
                  Not Today
                </button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-xs text-purple-300/70 mt-4"
              >
                Go find it in the world. Return here when you do.
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* Close button */}
        {!showLogForm && signRevealed && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </motion.div>
    </motion.div>
  );
};
