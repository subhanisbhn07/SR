import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, Volume2, VolumeX } from 'lucide-react';

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

  return (
    <button
      onClick={onClick}
      aria-label={playerState === 'playing' ? 'Pause session' : 'Play session'}
      className="relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-400/50 rounded-full"
    >
      {/* Single soft halo glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl"
        animate={isActive 
          ? { scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] } 
          : isCompleted 
            ? { scale: 1.1, opacity: 0.4 }
            : { scale: 1, opacity: 0.25 }
        }
        transition={{ duration: 3, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
      />

      {/* Core orb with emerald/teal gradient */}
      <motion.div
        className={`relative w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center ${
          isCompleted 
            ? 'bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 shadow-[0_0_40px_rgba(251,191,36,0.4)]'
            : 'bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-600 shadow-[0_0_40px_rgba(16,185,129,0.4)]'
        }`}
        animate={isActive 
          ? { scale: [1, 1.04, 1] } 
          : { scale: 1 }
        }
        transition={{ duration: 2, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
      >
        {/* Inner highlight */}
        <div className="absolute inset-3 rounded-full bg-gradient-to-br from-white/25 via-transparent to-transparent" />
        
        {/* Center icon */}
        <div className="relative z-10">
          {playerState === 'playing' ? (
            <Pause className="w-10 h-10 md:w-12 md:h-12 text-white drop-shadow-sm" />
          ) : playerState === 'completed' ? (
            <svg className="w-10 h-10 md:w-12 md:h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <Play className="w-10 h-10 md:w-12 md:h-12 text-white ml-1 drop-shadow-sm" />
          )}
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
    idle: 'Tap to begin',
    playing: 'Listening...',
    paused: 'Paused',
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
              className="mt-6 text-sm text-gold-400"
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
