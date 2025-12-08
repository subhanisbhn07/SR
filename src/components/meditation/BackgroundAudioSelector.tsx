import React from 'react';
import { motion } from 'framer-motion';
import { Volume2, Lock, Check } from 'lucide-react';
import { useMeditationStore, BACKGROUND_AUDIO_OPTIONS, BackgroundAudio } from '../../store/meditationStore';
import { useThemeStore } from '../../store/themeStore';

interface BackgroundAudioSelectorProps {
  userDay?: number;
  isPremium?: boolean;
  compact?: boolean;
}

const categoryIcons: Record<BackgroundAudio['category'], string> = {
  nature: '🌿',
  ambient: '🌙',
  music: '🎵',
  binaural: '🧠',
};

export const BackgroundAudioSelector: React.FC<BackgroundAudioSelectorProps> = ({
  userDay = 1,
  isPremium = false,
  compact = false,
}) => {
  const { theme } = useThemeStore();
  const { selectedBackgroundAudio, setBackgroundAudio, getAvailableBackgroundAudio } = useMeditationStore();

  const availableAudio = getAvailableBackgroundAudio(userDay, isPremium);
  const allAudio = BACKGROUND_AUDIO_OPTIONS;

  const handleSelect = (audioId: string) => {
    const audio = allAudio.find(a => a.id === audioId);
    if (!audio) return;
    
    // Check if audio is available
    const isAvailable = availableAudio.some(a => a.id === audioId);
    if (!isAvailable) return;
    
    setBackgroundAudio(audioId);
  };

  if (compact) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {allAudio.map((audio) => {
          const isAvailable = availableAudio.some(a => a.id === audio.id);
          const isSelected = selectedBackgroundAudio === audio.id;
          
          return (
            <button
              key={audio.id}
              onClick={() => handleSelect(audio.id)}
              disabled={!isAvailable}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-primary-500 text-white'
                  : isAvailable
                    ? theme === 'dark'
                      ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                    : theme === 'dark'
                      ? 'bg-neutral-800/50 text-neutral-600 cursor-not-allowed'
                      : 'bg-neutral-100/50 text-neutral-400 cursor-not-allowed'
              }`}
            >
              <span>{categoryIcons[audio.category]}</span>
              <span>{audio.name}</span>
              {!isAvailable && <Lock className="w-3 h-3" />}
              {isSelected && <Check className="w-3 h-3" />}
            </button>
          );
        })}
      </div>
    );
  }

  // Group by category
  const groupedAudio = allAudio.reduce((acc, audio) => {
    if (!acc[audio.category]) {
      acc[audio.category] = [];
    }
    acc[audio.category].push(audio);
    return acc;
  }, {} as Record<BackgroundAudio['category'], BackgroundAudio[]>);

  const categoryLabels: Record<BackgroundAudio['category'], string> = {
    nature: 'Nature Sounds',
    ambient: 'Ambient',
    music: 'Music',
    binaural: 'Binaural Beats',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Volume2 className={`w-5 h-5 ${theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'}`} />
        <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-neutral-900'}`}>
          Background Audio
        </h3>
      </div>

      {(Object.keys(groupedAudio) as BackgroundAudio['category'][]).map((category) => (
        <div key={category}>
          <p className={`text-xs font-medium mb-2 ${theme === 'dark' ? 'text-neutral-500' : 'text-neutral-400'}`}>
            {categoryIcons[category]} {categoryLabels[category]}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {groupedAudio[category].map((audio) => {
              const isAvailable = availableAudio.some(a => a.id === audio.id);
              const isSelected = selectedBackgroundAudio === audio.id;
              
              return (
                <motion.button
                  key={audio.id}
                  whileHover={isAvailable ? { scale: 1.02 } : {}}
                  whileTap={isAvailable ? { scale: 0.98 } : {}}
                  onClick={() => handleSelect(audio.id)}
                  disabled={!isAvailable}
                  className={`p-3 rounded-xl text-left transition-all ${
                    isSelected
                      ? 'bg-primary-500 text-white ring-2 ring-primary-500/50'
                      : isAvailable
                        ? theme === 'dark'
                          ? 'bg-neutral-800 hover:bg-neutral-700'
                          : 'bg-neutral-50 hover:bg-neutral-100 border border-neutral-200'
                        : theme === 'dark'
                          ? 'bg-neutral-800/30 cursor-not-allowed'
                          : 'bg-neutral-50/50 cursor-not-allowed border border-neutral-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-medium text-sm ${
                      isSelected 
                        ? 'text-white' 
                        : isAvailable
                          ? theme === 'dark' ? 'text-white' : 'text-neutral-900'
                          : theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'
                    }`}>
                      {audio.name}
                    </span>
                    {!isAvailable && <Lock className="w-3 h-3 text-neutral-400" />}
                    {isSelected && <Check className="w-4 h-4" />}
                  </div>
                  <p className={`text-xs ${
                    isSelected 
                      ? 'text-white/80' 
                      : isAvailable
                        ? theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
                        : theme === 'dark' ? 'text-neutral-600' : 'text-neutral-400'
                  }`}>
                    {audio.description}
                  </p>
                  {!isAvailable && audio.unlockDay > 0 && (
                    <p className="text-xs text-gold-500 mt-1">
                      Unlocks Day {audio.unlockDay}
                    </p>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
