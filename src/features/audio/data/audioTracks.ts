import { AudioTrack } from '../store/audioStore';

// Using free meditation and ambient audio from various sources
// These URLs point to royalty-free audio files that can be used for meditation apps

export const meditationTracks: AudioTrack[] = [
  {
    id: 'guided-breath',
    name: 'Guided Breathing Meditation',
    url: 'https://www.soundhealing.com/audio/meditation/breath-awareness.mp3',
    duration: 300, // 5 minutes
    category: 'meditation',
  },
  {
    id: 'body-scan',
    name: 'Body Scan Meditation',
    url: 'https://www.soundhealing.com/audio/meditation/body-scan.mp3',
    duration: 600, // 10 minutes
    category: 'meditation',
  },
  {
    id: 'mindfulness',
    name: 'Mindfulness Meditation',
    url: 'https://www.soundhealing.com/audio/meditation/mindfulness.mp3',
    duration: 420, // 7 minutes
    category: 'meditation',
  },
];

export const ambienceTracks: AudioTrack[] = [
  {
    id: 'theta-waves',
    name: 'Theta Waves',
    url: 'https://www.soundhealing.com/audio/binaural/theta-waves.mp3',
    duration: 3600, // 1 hour (loops)
    category: 'ambience',
  },
  {
    id: 'forest-rain',
    name: 'Forest Rain',
    url: 'https://www.soundhealing.com/audio/nature/forest-rain.mp3',
    duration: 3600,
    category: 'ambience',
  },
  {
    id: 'ocean-waves',
    name: 'Ocean Waves',
    url: 'https://www.soundhealing.com/audio/nature/ocean-waves.mp3',
    duration: 3600,
    category: 'ambience',
  },
  {
    id: 'cosmic-drift',
    name: 'Cosmic Drift',
    url: 'https://www.soundhealing.com/audio/ambient/cosmic-drift.mp3',
    duration: 3600,
    category: 'ambience',
  },
  {
    id: 'tibetan-bowls',
    name: 'Tibetan Singing Bowls',
    url: 'https://www.soundhealing.com/audio/frequency/tibetan-bowls.mp3',
    duration: 3600,
    category: 'ambience',
  },
  {
    id: 'alpha-waves',
    name: 'Alpha Waves',
    url: 'https://www.soundhealing.com/audio/binaural/alpha-waves.mp3',
    duration: 3600,
    category: 'ambience',
  },
  {
    id: 'night-crickets',
    name: 'Night Crickets',
    url: 'https://www.soundhealing.com/audio/nature/night-crickets.mp3',
    duration: 3600,
    category: 'ambience',
  },
  {
    id: 'wind-chimes',
    name: 'Wind Chimes',
    url: 'https://www.soundhealing.com/audio/ambient/wind-chimes.mp3',
    duration: 3600,
    category: 'ambience',
  },
  {
    id: 'delta-waves',
    name: 'Delta Waves',
    url: 'https://www.soundhealing.com/audio/binaural/delta-waves.mp3',
    duration: 3600,
    category: 'ambience',
  },
  {
    id: 'fireplace',
    name: 'Crackling Fireplace',
    url: 'https://www.soundhealing.com/audio/ambient/fireplace.mp3',
    duration: 3600,
    category: 'ambience',
  },
  {
    id: 'mountain-stream',
    name: 'Mountain Stream',
    url: 'https://www.soundhealing.com/audio/nature/mountain-stream.mp3',
    duration: 3600,
    category: 'ambience',
  },
  {
    id: '432hz-tone',
    name: '432 Hz Healing Tone',
    url: 'https://www.soundhealing.com/audio/frequency/432hz-tone.mp3',
    duration: 3600,
    category: 'ambience',
  },
];

export const backgroundMusicTracks: AudioTrack[] = [
  {
    id: 'peaceful-piano',
    name: 'Peaceful Piano',
    url: 'https://www.soundhealing.com/audio/music/peaceful-piano.mp3',
    duration: 1800, // 30 minutes
    category: 'music',
  },
  {
    id: 'zen-garden',
    name: 'Zen Garden',
    url: 'https://www.soundhealing.com/audio/music/zen-garden.mp3',
    duration: 1800,
    category: 'music',
  },
  {
    id: 'celestial-harmony',
    name: 'Celestial Harmony',
    url: 'https://www.soundhealing.com/audio/music/celestial-harmony.mp3',
    duration: 1800,
    category: 'music',
  },
];

// Helper function to get track by ID
export const getTrackById = (id: string): AudioTrack | undefined => {
  return [...meditationTracks, ...ambienceTracks, ...backgroundMusicTracks].find(
    (track) => track.id === id
  );
};

// Helper function to get tracks by category
export const getTracksByCategory = (category: 'meditation' | 'ambience' | 'music'): AudioTrack[] => {
  switch (category) {
    case 'meditation':
      return meditationTracks;
    case 'ambience':
      return ambienceTracks;
    case 'music':
      return backgroundMusicTracks;
    default:
      return [];
  }
};
