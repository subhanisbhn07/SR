import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, Download, CheckCircle } from 'lucide-react';
import { useContentStore, COMPLETION_THRESHOLD } from '../../store/contentStore';
import { useGamificationStore } from '../../store/gamificationStore';

interface VoiceSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  courseSubtitle?: string;
  durationLabel?: string;
  audioSrc?: string;
  roadSlug?: string;
  dayNumber?: number;
  onComplete?: (sparksEarned: number, dayAdvanced: boolean) => void;
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
      className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-400/50 rounded-full cursor-pointer"
    >
      {/* Single soft halo glow - more intense when playing */}
      <motion.div
        className={`absolute inset-0 rounded-full blur-2xl ${
          isCompleted ? 'bg-gold-500/20' : 'bg-emerald-500/20'
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

      {/* Core orb with emerald/teal gradient */}
      <motion.div
        className={`relative w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center ${
          isCompleted 
            ? 'bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 shadow-[0_0_50px_rgba(251,191,36,0.5)]'
            : isPaused
              ? 'bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 shadow-[0_0_35px_rgba(16,185,129,0.35)]'
              : 'bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 shadow-[0_0_45px_rgba(16,185,129,0.45)]'
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
              isCompleted ? 'bg-white/20' : 'bg-white/15'
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
              isCompleted ? 'bg-gold-200' : 'bg-emerald-200'
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
  roadSlug,
  dayNumber,
  onComplete,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState>('idle');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [hasReachedThreshold, setHasReachedThreshold] = useState(false);

  // Store hooks
  const { startMeditation, updatePlaybackPosition, completeMeditation, downloadMeditation, downloadedMeditations } = useContentStore();
  const { addSparks, incrementMeditationsCompleted } = useGamificationStore();

  // Check if this meditation is downloaded for offline use
  const isDownloaded = downloadedMeditations.some(
    d => d.roadSlug === roadSlug && d.day === dayNumber
  );

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setPlayerState('idle');
      setCurrentTime(0);
      setCompletionPercentage(0);
      setHasReachedThreshold(false);
      
      // Start meditation tracking if we have road/day info
      if (roadSlug && dayNumber) {
        startMeditation(roadSlug, dayNumber);
      }
    }
  }, [isOpen, roadSlug, dayNumber, startMeditation]);

  // Track completion percentage
  useEffect(() => {
    if (duration > 0) {
      const percentage = currentTime / duration;
      setCompletionPercentage(percentage);
      updatePlaybackPosition(currentTime);
      
      // Check if we've reached the 90% threshold
      if (percentage >= COMPLETION_THRESHOLD && !hasReachedThreshold) {
        setHasReachedThreshold(true);
      }
    }
  }, [currentTime, duration, hasReachedThreshold, updatePlaybackPosition]);

  // Wire up audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onLoaded = () => setDuration(audio.duration || 0);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const onEnded = () => {
      setPlayerState('completed');
      handleSessionComplete();
    };

    audio.addEventListener('loadedmetadata', onLoaded);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [audioSrc, isOpen]);

  // Handle session completion with sparks and day progression
  const handleSessionComplete = useCallback(() => {
    const finalPercentage = duration > 0 ? currentTime / duration : 0;
    const { sparksEarned, dayAdvanced } = completeMeditation(finalPercentage);
    
    if (sparksEarned > 0) {
      addSparks(sparksEarned, 'meditation');
      incrementMeditationsCompleted();
    }
    
    // Notify parent component
    if (onComplete) {
      onComplete(sparksEarned, dayAdvanced);
    }
  }, [currentTime, duration, completeMeditation, addSparks, incrementMeditationsCompleted, onComplete]);

  // Handle download for offline use
  const handleDownload = useCallback(() => {
    if (roadSlug && dayNumber) {
      const success = downloadMeditation(roadSlug, dayNumber);
      if (!success) {
        console.log('Download limit reached (max 3 meditations)');
      }
    }
  }, [roadSlug, dayNumber, downloadMeditation]);

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

        {/* Single centered glow behind orb */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl"
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
              <span className="inline-block mt-2 px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 text-xs rounded-full">
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

          {/* Progress bar - thin and elegant */}
          <div className="w-full max-w-xs">
            <div
              className="w-full h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer"
              onClick={handleProgressClick}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            {/* Time display - single line, minimal */}
            <p className="mt-3 text-xs text-neutral-500">
              {formatTime(currentTime)} <span className="mx-1">·</span> {formatTime(duration || 0)}
            </p>
          </div>

          {/* Controls row - mute and download */}
          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handleToggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="p-2 rounded-full hover:bg-white/5 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-neutral-500 hover:text-neutral-300" />
              ) : (
                <Volume2 className="w-4 h-4 text-neutral-500 hover:text-neutral-300" />
              )}
            </button>

            {/* Download button for offline use */}
            {roadSlug && dayNumber && (
              <button
                onClick={handleDownload}
                aria-label={isDownloaded ? 'Downloaded' : 'Download for offline'}
                className="p-2 rounded-full hover:bg-white/5 transition-colors"
                disabled={isDownloaded}
              >
                {isDownloaded ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Download className="w-4 h-4 text-neutral-500 hover:text-neutral-300" />
                )}
              </button>
            )}
          </div>

          {/* 90% completion indicator */}
          {hasReachedThreshold && playerState !== 'completed' && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-xs text-emerald-400"
            >
              90% reached - day will be marked complete
            </motion.p>
          )}

          {/* Completion message - subtle toast style */}
          {playerState === 'completed' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-gold-400 mb-1">
                +{completionPercentage >= COMPLETION_THRESHOLD ? '10' : completionPercentage >= 0.5 ? '5' : '0'} Sparks earned
              </p>
              {completionPercentage >= COMPLETION_THRESHOLD && (
                <p className="text-xs text-emerald-400">Day completed - next day unlocked!</p>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Hidden audio element */}
        <audio ref={audioRef} src={audioSrc} preload="auto" />
      </motion.div>
    </AnimatePresence>
  );
};
