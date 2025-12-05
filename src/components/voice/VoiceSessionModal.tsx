import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, X, Volume2, VolumeX, SkipBack, SkipForward, Sparkles } from 'lucide-react';

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
  const isIdle = playerState === 'idle';

  return (
    <button
      onClick={onClick}
      className="relative w-44 h-44 md:w-52 md:h-52 flex items-center justify-center focus:outline-none"
    >
      {/* Outer pulsing rings */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-500/10 via-teal-400/10 to-gold-400/5"
        animate={isActive ? { scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] } : { scale: 1, opacity: 0.3 }}
        transition={{ duration: 2.5, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
      />
      
      <motion.div
        className="absolute inset-4 rounded-full bg-gradient-to-br from-emerald-500/15 via-teal-400/15 to-gold-400/10 blur-sm"
        animate={isActive ? { scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] } : { scale: 1, opacity: 0.4 }}
        transition={{ duration: 2, repeat: isActive ? Infinity : 0, ease: 'easeInOut', delay: 0.3 }}
      />

      {/* Core glowing sphere */}
      <motion.div
        className="relative w-32 h-32 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-400 to-emerald-400 shadow-[0_0_60px_rgba(16,185,129,0.5)] flex items-center justify-center"
        animate={isActive ? { scale: [1, 1.05, 1] } : isIdle ? { scale: [1, 1.02, 1] } : { scale: 1 }}
        transition={{ duration: isActive ? 1.5 : 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Inner glow layer */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/30 via-emerald-300/20 to-transparent" />
        
        {/* Sparkle effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={isActive ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        >
          <Sparkles className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 text-white/60" />
          <Sparkles className="absolute bottom-4 right-4 w-3 h-3 text-gold-300/60" />
          <Sparkles className="absolute top-1/3 left-2 w-3 h-3 text-teal-200/60" />
        </motion.div>

        {/* Center icon */}
        <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          {playerState === 'playing' ? (
            <Pause className="w-8 h-8 md:w-10 md:h-10 text-white" />
          ) : playerState === 'completed' ? (
            <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-gold-300" />
          ) : (
            <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" />
          )}
        </div>
      </motion.div>

      {/* Particle dots around the orb */}
      {isActive && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400/60"
              style={{
                top: '50%',
                left: '50%',
              }}
              animate={{
                x: [0, Math.cos((i * Math.PI * 2) / 8) * 90, 0],
                y: [0, Math.sin((i * Math.PI * 2) / 8) * 90, 0],
                opacity: [0, 0.8, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </>
      )}
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

  const handleSeek = (direction: 'back' | 'forward') => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const seekAmount = 10;
    if (direction === 'back') {
      audio.currentTime = Math.max(0, audio.currentTime - seekAmount);
    } else {
      audio.currentTime = Math.min(duration, audio.currentTime + seekAmount);
    }
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
        {/* Background gradient */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-emerald-950/90 to-neutral-900"
        />

        {/* Ambient glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Content */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ delay: 0.1 }}
          className="relative w-full max-w-md mx-4 flex flex-col items-center text-center"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-0 right-0 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Course info */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{courseTitle}</h2>
            {courseSubtitle && (
              <p className="text-neutral-400 text-sm md:text-base">{courseSubtitle}</p>
            )}
            {durationLabel && (
              <p className="text-emerald-400 text-sm mt-1">{durationLabel}</p>
            )}
          </div>

          {/* Voice Orb */}
          <VoiceOrb playerState={playerState} onClick={handlePlayPause} />

          {/* State label */}
          <motion.p
            key={stateLabel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg text-white/80 mt-6 mb-8"
          >
            {stateLabel}
          </motion.p>

          {/* Progress bar */}
          <div className="w-full max-w-xs mb-4">
            <div
              className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer"
              onClick={handleProgressClick}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-neutral-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration || 0)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleSeek('back')}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <SkipBack className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={handlePlayPause}
              className="p-5 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/30"
            >
              {playerState === 'playing' ? (
                <Pause className="w-7 h-7 text-white" />
              ) : (
                <Play className="w-7 h-7 text-white ml-0.5" />
              )}
            </button>

            <button
              onClick={() => handleSeek('forward')}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <SkipForward className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Mute button */}
          <button
            onClick={handleToggleMute}
            className="mt-6 p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-neutral-400" />
            ) : (
              <Volume2 className="w-5 h-5 text-neutral-400" />
            )}
          </button>

          {/* Completion message */}
          {playerState === 'completed' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-gold-500/20 border border-gold-500/30 rounded-xl"
            >
              <div className="flex items-center gap-2 text-gold-400">
                <Sparkles className="w-5 h-5" />
                <span className="font-medium">+10 Sparks earned!</span>
              </div>
              <p className="text-sm text-neutral-400 mt-1">Your Lantern grows brighter</p>
            </motion.div>
          )}
        </motion.div>

        {/* Hidden audio element */}
        <audio ref={audioRef} src={audioSrc} preload="auto" />
      </motion.div>
    </AnimatePresence>
  );
};
