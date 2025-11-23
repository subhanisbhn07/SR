export interface AudioAmbience {
  id: string;
  name: string;
  description: string;
  isPremium: boolean;
  category: 'binaural' | 'nature' | 'ambient' | 'frequency';
}

export const audioAmbienceData: AudioAmbience[] = [
  {
    id: 'theta-waves',
    name: 'Theta Waves',
    description: 'Deep meditation frequency (4-8 Hz)',
    isPremium: false,
    category: 'binaural',
  },
  {
    id: 'forest-rain',
    name: 'Forest Rain',
    description: 'Gentle rainfall in a peaceful forest',
    isPremium: false,
    category: 'nature',
  },
  {
    id: 'ocean-waves',
    name: 'Ocean Waves',
    description: 'Rhythmic waves on a calm beach',
    isPremium: false,
    category: 'nature',
  },
  {
    id: 'cosmic-drift',
    name: 'Cosmic Drift',
    description: 'Ethereal space ambience',
    isPremium: true,
    category: 'ambient',
  },
  {
    id: 'tibetan-bowls',
    name: 'Tibetan Singing Bowls',
    description: 'Resonant healing frequencies',
    isPremium: true,
    category: 'frequency',
  },
  {
    id: 'alpha-waves',
    name: 'Alpha Waves',
    description: 'Relaxed focus frequency (8-12 Hz)',
    isPremium: true,
    category: 'binaural',
  },
  {
    id: 'night-crickets',
    name: 'Night Crickets',
    description: 'Peaceful evening soundscape',
    isPremium: false,
    category: 'nature',
  },
  {
    id: 'wind-chimes',
    name: 'Wind Chimes',
    description: 'Gentle metallic harmonics',
    isPremium: true,
    category: 'ambient',
  },
  {
    id: 'delta-waves',
    name: 'Delta Waves',
    description: 'Deep sleep frequency (0.5-4 Hz)',
    isPremium: true,
    category: 'binaural',
  },
  {
    id: 'fireplace',
    name: 'Crackling Fireplace',
    description: 'Warm, comforting fire sounds',
    isPremium: true,
    category: 'ambient',
  },
  {
    id: 'mountain-stream',
    name: 'Mountain Stream',
    description: 'Flowing water over rocks',
    isPremium: true,
    category: 'nature',
  },
  {
    id: '432hz-tone',
    name: '432 Hz Healing Tone',
    description: 'Universal healing frequency',
    isPremium: true,
    category: 'frequency',
  },
];
