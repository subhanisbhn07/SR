import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
import { NeumoCard } from '../ui/NeumoCard';

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

  const ambientParticles = useMemo(() => 
    [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 3
    })), []);

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

  const circumference = 2 * Math.PI * 90;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-neumo-text/30"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="relative w-full max-w-md mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <NeumoCard size="lg" showBlob={true} blobColor="teal">
            <div className="relative overflow-hidden">
              {ambientParticles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-1.5 h-1.5 rounded-full bg-brand-teal/20"
                  style={{ left: particle.left, top: particle.top }}
                  animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.3, 1] }}
                  transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay }}
                />
              ))}

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-neumo bg-brand-teal shadow-teal-glow flex items-center justify-center">
                    <span className="text-xl">{signEmoji}</span>
                  </div>
                  <div>
                    <p className="text-xs text-neumo-text-muted uppercase tracking-wide">Day {dayNumber}</p>
                    <h2 className="text-lg font-semibold text-neumo-text">{title}</h2>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset-sm transition-all"
                >
                  <X className="w-5 h-5 text-neumo-text-secondary" />
                </button>
              </div>

              <div className="relative flex items-center justify-center mb-6">
                <div className="relative">
                  <svg className="w-48 h-48 transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="90"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-neumo-border"
                    />
                    <motion.circle
                      cx="96"
                      cy="96"
                      r="90"
                      stroke="url(#progressGradientNeumo)"
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
                      <linearGradient id="progressGradientNeumo" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#0E7A77" />
                        <stop offset="100%" stopColor="#17A7A2" />
                      </linearGradient>
                    </defs>
                  </svg>

                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                      animate={isPlaying ? { scale: [1, 1.08, 1] } : {}}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="w-20 h-20 rounded-full bg-brand-teal shadow-teal-glow flex items-center justify-center mb-2"
                    >
                      <span className="text-3xl">{signEmoji}</span>
                    </motion.div>
                    <div className="text-2xl font-bold text-neumo-text font-mono">
                      {formatTime(currentTime)}
                    </div>
                    <div className="text-sm text-neumo-text-muted">
                      / {formatTime(duration)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mb-6">
                <button
                  onClick={() => handleSkip(-15)}
                  className="p-3 rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset-sm transition-all"
                >
                  <SkipBack className="w-5 h-5 text-neumo-text-secondary" />
                </button>
                
                <button
                  onClick={handlePlayPause}
                  className="p-5 rounded-full bg-brand-teal shadow-teal-glow hover:bg-brand-teal-dark transition-all"
                >
                  {isPlaying ? (
                    <Pause className="w-8 h-8 text-white" />
                  ) : (
                    <Play className="w-8 h-8 text-white ml-1" />
                  )}
                </button>
                
                <button
                  onClick={() => handleSkip(15)}
                  className="p-3 rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset-sm transition-all"
                >
                  <SkipForward className="w-5 h-5 text-neumo-text-secondary" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-neumo shadow-neumo-sm hover:shadow-neumo-inset-sm transition-all"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-neumo-text-muted" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-neumo-text-secondary" />
                  )}
                </button>

                {canManualComplete && !hasCompleted ? (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={handleManualComplete}
                    className="flex items-center gap-2 px-4 py-2 rounded-neumo bg-brand-teal/10 shadow-neumo-sm hover:shadow-neumo-inset-sm text-brand-teal transition-all"
                  >
                    <Check className="w-4 h-4" />
                    <span className="text-sm font-medium">Complete Now</span>
                  </motion.button>
                ) : (
                  <div className="px-4 py-2 rounded-neumo shadow-neumo-inset-sm">
                    <span className="text-sm font-medium text-neumo-text">{Math.round(progress)}%</span>
                  </div>
                )}

                <div className="w-10" />
              </div>

              {progress < 50 && (
                <p className="text-center text-neumo-text-muted text-xs mt-4">
                  Listen to 50% to unlock manual completion
                </p>
              )}
            </div>
          </NeumoCard>
        </motion.div>

        <AnimatePresence>
          {showReward && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            >
              <div className="bg-neumo-bg rounded-neumo-lg p-8 shadow-neumo-lg text-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: 3 }}
                  className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-teal shadow-teal-glow flex items-center justify-center"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-neumo-text mb-2">Meditation Complete!</h3>
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-1 text-brand-teal">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-semibold">+10 Sparks</span>
                  </div>
                  <div className="flex items-center gap-1 text-neumo-text-secondary">
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
              className="fixed inset-0 flex items-center justify-center z-50 bg-neumo-text/40"
              onClick={handleClose}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-neumo-bg rounded-neumo-lg p-6 mx-4 max-w-sm text-center shadow-neumo-lg"
                onClick={(e) => e.stopPropagation()}
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
                  className="w-full px-6 py-3 rounded-neumo bg-brand-teal text-white font-semibold shadow-teal-glow hover:bg-brand-teal-dark transition-all"
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
