import { useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import { useAudioStore } from '../store/audioStore';

interface AudioPlayerProps {
  showControls?: boolean;
  compact?: boolean;
  className?: string;
}

export const AudioPlayer = ({ showControls = true, compact = false, className = '' }: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {
    isPlaying,
    currentTrack,
    currentTime,
    duration,
    volume,
    isMuted,
    setAudioElement,
    play,
    pause,
    setCurrentTime,
    setDuration,
    setVolume,
    toggleMute,
  } = useAudioStore();

  // Initialize audio element
  useEffect(() => {
    if (audioRef.current) {
      setAudioElement(audioRef.current);
    }
    return () => setAudioElement(null);
  }, [setAudioElement]);

  // Update current time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      pause();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [setCurrentTime, setDuration, pause]);

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const handleSkipForward = () => {
    const newTime = Math.min(currentTime + 10, duration);
    setCurrentTime(newTime);
  };

  const handleSkipBackward = () => {
    const newTime = Math.max(currentTime - 10, 0);
    setCurrentTime(newTime);
  };

  if (!currentTrack) {
    return null;
  }

  if (compact) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <audio ref={audioRef} />
        <button
          onClick={isPlaying ? pause : play}
          className="w-10 h-10 rounded-full bg-accent-500 hover:bg-accent-600 flex items-center justify-center transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white" />
          ) : (
            <Play className="w-5 h-5 text-white ml-0.5" />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-white truncate">{currentTrack.name}</div>
          <div className="text-xs text-neutral-400">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-neutral-800/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700 ${className}`}>
      <audio ref={audioRef} />
      
      {/* Track Info */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-1">{currentTrack.name}</h3>
        <p className="text-sm text-neutral-400 capitalize">{currentTrack.category}</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-neutral-700 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-500 
            [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:hover:bg-accent-600
            [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full 
            [&::-moz-range-thumb]:bg-accent-500 [&::-moz-range-thumb]:cursor-pointer 
            [&::-moz-range-thumb]:hover:bg-accent-600 [&::-moz-range-thumb]:border-0"
        />
        <div className="flex justify-between text-xs text-neutral-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {showControls && (
        <>
          {/* Playback Controls */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <button
              onClick={handleSkipBackward}
              className="w-10 h-10 rounded-full bg-neutral-700 hover:bg-neutral-600 flex items-center justify-center transition-colors"
              title="Skip backward 10s"
            >
              <SkipBack className="w-5 h-5 text-white" />
            </button>
            
            <button
              onClick={isPlaying ? pause : play}
              className="w-14 h-14 rounded-full bg-accent-500 hover:bg-accent-600 flex items-center justify-center transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 text-white" />
              ) : (
                <Play className="w-7 h-7 text-white ml-1" />
              )}
            </button>
            
            <button
              onClick={handleSkipForward}
              className="w-10 h-10 rounded-full bg-neutral-700 hover:bg-neutral-600 flex items-center justify-center transition-colors"
              title="Skip forward 10s"
            >
              <SkipForward className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="flex-1 h-2 bg-neutral-700 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white 
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full 
                [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:cursor-pointer 
                [&::-moz-range-thumb]:border-0"
            />
            <span className="text-xs text-neutral-400 w-10 text-right">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>
        </>
      )}
    </div>
  );
};
