import { useCallback } from 'react';

// Sound effect URLs (using free sound effects)
const SOUND_EFFECTS = {
  click: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  success: 'https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3',
  complete: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
  notification: 'https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3',
  unlock: 'https://assets.mixkit.co/active_storage/sfx/1434/1434-preview.mp3',
  error: 'https://assets.mixkit.co/active_storage/sfx/2955/2955-preview.mp3',
};

export type SoundEffect = keyof typeof SOUND_EFFECTS;

export const useSoundEffects = () => {
  const playSound = useCallback((effect: SoundEffect, volume: number = 0.3) => {
    try {
      const audio = new Audio(SOUND_EFFECTS[effect]);
      audio.volume = volume;
      audio.play().catch((error) => {
        // Silently fail if audio playback is blocked
        console.debug('Sound effect playback blocked:', error);
      });
    } catch (error) {
      console.debug('Error playing sound effect:', error);
    }
  }, []);

  return { playSound };
};
