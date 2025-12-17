import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';

interface VoiceSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  courseSubtitle?: string;
  durationLabel?: string;
  audioSrc?: string;
}

type PlayerState = 'idle' | 'playing' | 'paused' | 'completed';

const VoiceOrb: React.FC<{ playerState: PlayerState; onClick: () => void }> = ({ playerState, onClick }) => {
  const isActive = playerState === 'playing';
  const isCompleted = playerState === 'completed';
  const isPaused = playerState === 'paused';

  // Aria label based on state for accessibility
  const ariaLabel = {
    idle: 'Start session',
    playing: 'Pause session',
    paused: 'Resume session',
    completed: 'Session complete',
  }[playerState];

  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={isActive}
      className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-teal/50 rounded-full cursor-pointer"
    >
      {/* Single soft halo glow - more intense when playing */}
      <motion.div
        className={`absolute inset-0 rounded-full blur-2xl ${
          isCompleted ? 'bg-amber-500/20' : 'bg-brand-teal/20'
        }`}
        animate={isActive 
          ? { scale: [1, 1.2, 1], opacity: [0.25, 0.5, 0.25] } 
          : isCompleted 
            ? { scale: 1.15, opacity: 0.45 }
            : isPaused
              ? { scale: 1.05, opacity: 0.3 }
              : { scale: 1, opacity: 0.2 }
        }
        transition={{ duration: 3, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
      />

      {/* Core orb with teal gradient - Transformative Teal */}
      <motion.div
        className={`relative w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center ${
          isCompleted 
            ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 shadow-[0_0_50px_rgba(251,191,36,0.5)]'
            : isPaused
              ? 'bg-gradient-to-br from-brand-teal via-brand-teal-dark to-brand-teal shadow-[0_0_35px_rgba(14,122,119,0.35)]'
              : 'bg-gradient-to-br from-brand-teal-light via-brand-teal to-brand-teal-dark shadow-[0_0_45px_rgba(14,122,119,0.45)]'
        }`}
        animate={isActive 
          ? { scale: [1, 1.05, 1] } 
          : isCompleted
            ? { scale: [1, 1.08, 1] }
            : { scale: 1 }
        }
        transition={{ 
          duration: isActive ? 2 : 0.6, 
          repeat: isActive || isCompleted ? Infinity : 0, 
          ease: 'easeInOut',
          repeatDelay: isCompleted ? 2 : 0
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Inner highlight */}
        <div className="absolute inset-3 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent" />
        
        {/* Mystical spark core - no play/pause icons */}
        <div className="relative z-10 flex items-center justify-center">
          {/* Outer spark ring */}
          <motion.div
            className={`absolute w-10 h-10 md:w-12 md:h-12 rounded-full ${
              isCompleted ? 'bg-white/25' : 'bg-white/15'
            }`}
            animate={isActive 
              ? { scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }
              : isCompleted
                ? { scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }
                : { scale: 1, opacity: 0.1 }
            }
            transition={{ duration: isActive ? 1.5 : 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          {/* Inner spark diamond */}
          <motion.div
            className={`w-5 h-5 md:w-6 md:h-6 rotate-45 rounded-sm ${
              isCompleted 
                ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]' 
                : 'bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.6)]'
            }`}
            animate={isActive 
              ? { scale: [1, 1.2, 1], rotate: [45, 45, 45], opacity: [0.9, 1, 0.9] }
              : isPaused
                ? { scale: 0.9, rotate: 45, opacity: 0.7 }
                : isCompleted
                  ? { scale: [1, 1.15, 1], rotate: 45, opacity: 1 }
                  : { scale: 1, rotate: 45, opacity: 0.85 }
            }
            transition={{ 
              duration: isActive ? 1.5 : 2, 
              repeat: isActive || isCompleted ? Infinity : 0, 
              ease: 'easeInOut' 
            }}
          />
          
          {/* Center glow dot */}
          <motion.div
            className={`absolute w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${
              isCompleted ? 'bg-amber-200' : 'bg-brand-teal-muted'
            }`}
            animate={isActive 
              ? { scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] }
              : { scale: 1, opacity: isPaused ? 0.5 : 0.7 }
            }
            transition={{ duration: 1, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </button>
  );
};

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const VoiceSessionModal: React.FC<VoiceSessionModalProps> = ({
  isOpen,
  onClose,
  courseTitle,
  courseSubtitle,
  durationLabel,
  audioSrc = '/audio/meditation-sample.mp3',
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState>('idle');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setPlayerState('idle');
      setCurrentTime(0);
    }
  }, [isOpen]);

  // Wire up audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const onEnded = () => setPlayerState('completed');

    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [audioSrc, isOpen]);

  const handlePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playerState === 'playing') {
      audio.pause();
      setPlayerState('paused');
    } else {
      try {
        await audio.play();
        setPlayerState('playing');
      } catch (err) {
        console.log('Audio playback failed:', err);
        // Simulate playback for demo purposes
        setPlayerState('playing');
      }
    }
  };

  const handleToggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !audio.muted;
    }
    setIsMuted(!isMuted);
  };

  const handleClose = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setPlayerState('idle');
    setCurrentTime(0);
    onClose();
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    audio.currentTime = percentage * duration;
  };

  const progress = duration ? currentTime / duration : 0;

  const stateLabel = {
    idle: 'Tap the orb to begin',
    playing: 'Listening...',
    paused: 'Paused — tap to continue',
    completed: 'Session complete',
  }[playerState];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        {/* Clean dark background */}
        <div className="absolute inset-0 bg-neutral-950" />

        {/* Single centered glow behind orb - Transformative Teal */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-teal/15 rounded-full blur-3xl"
            animate={playerState === 'playing' 
              ? { scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] } 
              : { scale: 1, opacity: 0.15 }
            }
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Content */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 30, opacity: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="relative w-full max-w-sm mx-6 flex flex-col items-center text-center py-12"
        >
          {/* Close button - minimal */}
          <button
            onClick={handleClose}
            aria-label="Close session"
            className="absolute top-0 right-0 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-neutral-400" />
          </button>

          {/* Course info - tight and centered */}
          <div className="mb-10 max-w-xs">
            <h2 className="text-xl md:text-2xl font-semibold text-white mb-1">{courseTitle}</h2>
            {courseSubtitle && (
              <p className="text-neutral-400 text-sm">{courseSubtitle}</p>
            )}
            {durationLabel && (
              <span className="inline-block mt-2 px-2.5 py-0.5 bg-brand-teal/10 text-brand-teal-light text-xs rounded-full">
                {durationLabel}
              </span>
            )}
          </div>

          {/* Voice Orb - primary control */}
          <VoiceOrb playerState={playerState} onClick={handlePlayPause} />

          {/* State label */}
          <motion.p
            key={stateLabel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-base text-neutral-300 mt-6 mb-8 font-light"
          >
            {stateLabel}
          </motion.p>

          {/* Progress bar - thin and elegant with Transformative Teal */}
          <div className="w-full max-w-xs">
            <div
              className="w-full h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer"
              onClick={handleProgressClick}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-brand-teal-light to-brand-teal rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            {/* Time display - single line, minimal */}
            <p className="mt-3 text-xs text-neutral-500">
              {formatTime(currentTime)} <span className="mx-1">·</span> {formatTime(duration || 0)}
            </p>
          </div>

          {/* Mute button - subtle, below progress */}
          <button
            onClick={handleToggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            className="mt-6 p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-neutral-500 hover:text-neutral-300" />
            ) : (
              <Volume2 className="w-4 h-4 text-neutral-500 hover:text-neutral-300" />
            )}
          </button>

          {/* Completion message - subtle toast style */}
          {playerState === 'completed' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-sm text-amber-400"
            >
              +10 Sparks earned
            </motion.p>
          )}
        </motion.div>

        {/* Hidden audio element */}
        <audio ref={audioRef} src={audioSrc} preload="auto" />
      </motion.div>
    </AnimatePresence>
  );
};
