import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  X,
  Volume2,
  VolumeX,
  Check,
  Sparkles,
  Flame
} from 'lucide-react';
import { useLanternStore } from '../../store/lanternStore';
import { useAuthStore } from '../../store/authStore';

interface MeditationPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  dayNumber?: number;
  title?: string;
  duration?: number;
  signEmoji?: string;
}

export const MeditationPlayer: React.FC<MeditationPlayerProps> = ({
  isOpen,
  onClose,
  dayNumber = 1,
  title = "Setting Your Intention",
  duration = 300,
  signEmoji = "🪶"
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [showReward, setShowReward] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { completeMeditation } = useLanternStore();
  const { updateUser, user } = useAuthStore();

  const progress = (currentTime / duration) * 100;
  const canManualComplete = progress >= 50;
  const autoCompleteThreshold = 90;

  const handleCompletion = useCallback(() => {
    if (hasCompleted) return;
    
    setHasCompleted(true);
    setIsPlaying(false);
    completeMeditation();
    
    const currentSparks = user?.sparks || 0;
    updateUser({ sparks: currentSparks + 10 });
    
    setShowReward(true);
    setTimeout(() => {
      setShowReward(false);
      setShowCompletion(true);
    }, 2000);
  }, [hasCompleted, completeMeditation, user?.sparks, updateUser]);

  useEffect(() => {
    if (isPlaying && currentTime < duration) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1;
          if ((newTime / duration) * 100 >= autoCompleteThreshold && !hasCompleted) {
            handleCompletion();
          }
          return Math.min(newTime, duration);
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, duration, hasCompleted, handleCompletion]);

  const handleManualComplete = () => {
    if (canManualComplete && !hasCompleted) {
      handleCompletion();
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSkip = (seconds: number) => {
    setCurrentTime(prev => Math.max(0, Math.min(duration, prev + seconds)));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setHasCompleted(false);
    setShowCompletion(false);
    onClose();
  };

  if (!isOpen) return null;

  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0f0f1a 50%, #050510 100%)'
          }}
        />
        
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.2
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-md mx-4">
          <button
            onClick={handleClose}
            className="absolute top-0 right-0 p-2 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">{signEmoji}</span>
              <span className="text-white/60 text-sm">Day {dayNumber}</span>
            </div>
            <h2 className="text-xl font-semibold text-white">{title}</h2>
          </div>

          <div className="relative flex items-center justify-center mb-8">
            <svg className="w-64 h-64 transform -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="128"
                cy="128"
                r="120"
                stroke="url(#progressGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.5 }}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center mb-4 shadow-lg"
                style={{
                  boxShadow: isPlaying 
                    ? '0 0 40px rgba(20, 184, 166, 0.4)' 
                    : '0 0 20px rgba(20, 184, 166, 0.2)'
                }}
              >
                <span className="text-4xl">{signEmoji}</span>
              </motion.div>
              
              <div className="text-white text-3xl font-mono">
                {formatTime(currentTime)}
              </div>
              <div className="text-white/40 text-sm">
                / {formatTime(duration)}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 mb-8">
            <button
              onClick={() => handleSkip(-15)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <SkipBack className="w-5 h-5 text-white" />
            </button>
            
            <button
              onClick={handlePlayPause}
              className="p-5 rounded-full bg-teal-500 hover:bg-teal-400 transition-colors shadow-lg"
              style={{ boxShadow: '0 0 30px rgba(20, 184, 166, 0.4)' }}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1" />
              )}
            </button>
            
            <button
              onClick={() => handleSkip(15)}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <SkipForward className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="flex items-center justify-between px-4">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white/60" />
              ) : (
                <Volume2 className="w-5 h-5 text-white/60" />
              )}
            </button>

            {canManualComplete && !hasCompleted && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleManualComplete}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/20 border border-teal-500/50 text-teal-400 hover:bg-teal-500/30 transition-colors"
              >
                <Check className="w-4 h-4" />
                <span className="text-sm">Complete Now</span>
              </motion.button>
            )}

            <div className="text-white/40 text-sm">
              {Math.round(progress)}%
            </div>
          </div>

          {progress < 50 && (
            <p className="text-center text-white/40 text-xs mt-4">
              Listen to 50% to unlock manual completion
            </p>
          )}
        </div>

        <AnimatePresence>
          {showReward && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <div className="bg-neumo-bg rounded-neumo-lg p-8 shadow-2xl text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-neumo-text mb-2">Meditation Complete!</h3>
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1 text-brand-teal">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-semibold">+10 Sparks</span>
                  </div>
                  <div className="flex items-center gap-1 text-orange-400">
                    <Flame className="w-4 h-4" />
                    <span className="font-semibold">+5 Lantern</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showCompletion && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50 bg-black/50"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-neumo-bg rounded-neumo-lg p-6 mx-4 max-w-sm text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-teal/20 flex items-center justify-center">
                  <Check className="w-8 h-8 text-brand-teal" />
                </div>
                <h3 className="text-xl font-bold text-neumo-text mb-2">Day {dayNumber} Complete</h3>
                <p className="text-neumo-text-secondary mb-4">
                  Your Lantern glows brighter. Keep watching for your sign today.
                </p>
                <button
                  onClick={handleClose}
                  className="w-full px-6 py-3 rounded-neumo bg-brand-teal text-white font-semibold shadow-neumo-sm hover:shadow-neumo-inset transition-all"
                >
                  Continue
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};
