import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, X, Volume2, Music } from 'lucide-react';
import { RoadStep, BACKGROUND_AUDIO_OPTIONS } from '../../types/journey';
import { useJourneyStore } from '../../store/journeyStore';

interface MeditationPlayerProps {
  step: RoadStep;
  onClose: () => void;
  onComplete: () => void;
}

export const MeditationPlayer: React.FC<MeditationPlayerProps> = ({
  step,
  onClose,
  onComplete,
}) => {
  const {
    user,
    audioState,
    setAudioPlaying,
    setAudioTime,
    setAudioVolume,
    setBackgroundVolume,
    setSelectedBackground,
  } = useJourneyStore();

  const [showMixer, setShowMixer] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalDuration = step.audioDuration * 60; // Convert to seconds

  useEffect(() => {
    // Auto-play on mount
    setAudioPlaying(true);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (audioState.isPlaying && !isComplete) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 1;
          if (newProgress >= totalDuration) {
            setAudioPlaying(false);
            setIsComplete(true);
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            return totalDuration;
          }
          return newProgress;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [audioState.isPlaying, isComplete, totalDuration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setAudioPlaying(!audioState.isPlaying);
  };

  const handleRewind = () => {
    setProgress(Math.max(0, progress - 15));
  };

  const handleComplete = () => {
    onComplete();
  };

  // Breathing circle animation
  const breathingVariants = {
    inhale: {
      scale: 1.3,
      opacity: 0.8,
      transition: { duration: 4, ease: 'easeInOut' },
    },
    exhale: {
      scale: 1,
      opacity: 0.5,
      transition: { duration: 4, ease: 'easeInOut' },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 flex flex-col"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white/50 hover:text-white transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        {/* Breathing visualizer */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Outer glow */}
          <motion.div
            animate={audioState.isPlaying ? { scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] } : {}}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-full h-full rounded-full bg-purple-500/20 blur-xl"
          />

          {/* Main circle */}
          <motion.div
            animate={
              audioState.isPlaying
                ? {
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      '0 0 30px rgba(168, 85, 247, 0.3)',
                      '0 0 60px rgba(168, 85, 247, 0.5)',
                      '0 0 30px rgba(168, 85, 247, 0.3)',
                    ],
                  }
                : {}
            }
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-48 h-48 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center"
          >
            <span className="text-6xl">{step.signEmoji}</span>
          </motion.div>

          {/* Progress ring */}
          <svg className="absolute w-full h-full -rotate-90">
            <circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="4"
            />
            <motion.circle
              cx="128"
              cy="128"
              r="120"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 120}
              strokeDashoffset={2 * Math.PI * 120 * (1 - progress / totalDuration)}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Title and theme */}
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-white">{step.title}</h2>
          <p className="text-purple-300 mt-2">{step.theme}</p>
        </div>

        {/* Time display */}
        <div className="mt-6 text-white/70 font-mono">
          {formatTime(progress)} / {formatTime(totalDuration)}
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 pb-10">
        {isComplete ? (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={handleComplete}
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-2xl shadow-lg shadow-amber-500/30"
          >
            Meditation Complete +10 Sparks
          </motion.button>
        ) : (
          <div className="flex items-center justify-center gap-6">
            {/* Rewind */}
            <button
              onClick={handleRewind}
              className="p-3 text-white/70 hover:text-white transition-colors"
            >
              <RotateCcw className="w-6 h-6" />
            </button>

            {/* Play/Pause */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handlePlayPause}
              className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg"
            >
              {audioState.isPlaying ? (
                <Pause className="w-8 h-8 text-purple-900" />
              ) : (
                <Play className="w-8 h-8 text-purple-900 ml-1" />
              )}
            </motion.button>

            {/* Audio mixer toggle */}
            <button
              onClick={() => setShowMixer(true)}
              className={`p-3 transition-colors ${
                user?.isSeeker ? 'text-white/70 hover:text-white' : 'text-white/30'
              }`}
              disabled={!user?.isSeeker}
            >
              <Music className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>

      {/* Audio Mixer (Premium) */}
      <AnimatePresence>
        {showMixer && user?.isSeeker && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 bg-gray-900 rounded-t-3xl p-6 pb-10"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Audio Mixer</h3>
              <button
                onClick={() => setShowMixer(false)}
                className="text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Voice volume */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-purple-300">Voice Volume</span>
                <span className="text-sm text-white">{Math.round(audioState.volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={audioState.volume}
                onChange={(e) => setAudioVolume(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer"
              />
            </div>

            {/* Background volume */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-purple-300">Background Volume</span>
                <span className="text-sm text-white">
                  {Math.round(audioState.backgroundVolume * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={audioState.backgroundVolume}
                onChange={(e) => setBackgroundVolume(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer"
              />
            </div>

            {/* Background options */}
            <div>
              <span className="text-sm text-purple-300 mb-3 block">Choose Background</span>
              <div className="grid grid-cols-4 gap-2">
                {BACKGROUND_AUDIO_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSelectedBackground(option.id)}
                    className={`p-3 rounded-xl text-center transition-all ${
                      audioState.selectedBackground === option.id
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <span className="text-xl block mb-1">{option.icon}</span>
                    <span className="text-xs">{option.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
