import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Volume2, X } from 'lucide-react';
import { useAudioStore } from '../store/audioStore';
import { ambienceTracks } from '../data/audioTracks';
import { audioAmbienceData } from '../../journey/data/audioAmbience';

interface AmbiencePlayerProps {
  isSubscribed?: boolean;
  className?: string;
}

export const AmbiencePlayer = ({ isSubscribed = false, className = '' }: AmbiencePlayerProps) => {
  const ambienceRef = useRef<HTMLAudioElement>(null);
  const {
    ambienceTrack,
    ambienceVolume,
    isAmbiencePlaying,
    setAmbienceElement,
    playAmbience,
    stopAmbience,
    setAmbienceVolume,
  } = useAudioStore();

  const [showSelector, setShowSelector] = useState(false);

  // Initialize ambience element
  useEffect(() => {
    if (ambienceRef.current) {
      setAmbienceElement(ambienceRef.current);
    }
    return () => setAmbienceElement(null);
  }, [setAmbienceElement]);

  const availableAmbience = audioAmbienceData.filter(a => !a.isPremium || isSubscribed);

  const handleSelectAmbience = (ambienceId: string) => {
    const track = ambienceTracks.find(t => t.id === ambienceId);
    if (track) {
      playAmbience(track);
      setShowSelector(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setAmbienceVolume(newVolume);
  };

  return (
    <div className={className}>
      <audio ref={ambienceRef} />
      
      {/* Ambience Control Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowSelector(!showSelector)}
          className="flex items-center gap-2 px-4 py-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors"
        >
          <Music className="w-4 h-4 text-accent-500" />
          <span className="text-sm text-white">
            {ambienceTrack ? ambienceTrack.name : 'Select Background'}
          </span>
        </button>

        {/* Volume Control (shown when playing) */}
        {isAmbiencePlaying && ambienceTrack && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="flex items-center gap-2"
          >
            <Volume2 className="w-4 h-4 text-neutral-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={ambienceVolume}
              onChange={handleVolumeChange}
              className="w-24 h-2 bg-neutral-700 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-500 
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full 
                [&::-moz-range-thumb]:bg-accent-500 [&::-moz-range-thumb]:cursor-pointer 
                [&::-moz-range-thumb]:border-0"
            />
            <button
              onClick={stopAmbience}
              className="p-1 hover:bg-neutral-700 rounded transition-colors"
              title="Stop ambience"
            >
              <X className="w-4 h-4 text-neutral-400" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Ambience Selector */}
      <AnimatePresence>
        {showSelector && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2">
              {availableAmbience.map((ambience) => {
                const isSelected = ambienceTrack?.id === ambience.id;
                return (
                  <button
                    key={ambience.id}
                    onClick={() => handleSelectAmbience(ambience.id)}
                    className={`
                      p-3 rounded-lg text-left transition-colors text-sm
                      ${isSelected
                        ? 'bg-accent-500 text-white'
                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                      }
                    `}
                  >
                    <div className="font-medium">{ambience.name}</div>
                    <div className="text-xs opacity-75">{ambience.description}</div>
                  </button>
                );
              })}
              
              {/* Premium Upsell */}
              {!isSubscribed && audioAmbienceData.some(a => a.isPremium) && (
                <div className="col-span-2 p-3 bg-accent-500/10 border border-accent-500/30 rounded-lg text-center">
                  <p className="text-xs text-accent-400">
                    Unlock {audioAmbienceData.filter(a => a.isPremium).length} more tracks with Seeker subscription
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
