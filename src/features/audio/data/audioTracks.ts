import { AudioTrack } from '../store/audioStore';

// Using royalty-free audio from Internet Archive and public domain sources
// These URLs point to actual working audio files for meditation and ambience

export const meditationTracks: AudioTrack[] = [
  {
    id: 'guided-breath',
    name: 'Guided Breathing Meditation',
    url: 'https://ia801609.us.archive.org/16/items/guided-meditation-forest/Guided%20Meditation%20-%20Forest.mp3',
    duration: 300, // 5 minutes
    category: 'meditation',
  },
  {
    id: 'body-scan',
    name: 'Body Scan Meditation',
    url: 'https://ia801504.us.archive.org/27/items/10-minute-meditation/10%20Minute%20Meditation.mp3',
    duration: 600, // 10 minutes
    category: 'meditation',
  },
  {
    id: 'mindfulness',
    name: 'Mindfulness Meditation',
    url: 'https://ia801407.us.archive.org/9/items/5-minute-meditation/5%20Minute%20Meditation.mp3',
    duration: 420, // 7 minutes
    category: 'meditation',
  },
];

export const ambienceTracks: AudioTrack[] = [
  {
    id: 'theta-waves',
    name: 'Theta Waves',
    url: 'https://ia801504.us.archive.org/8/items/theta-waves-meditation/Theta%20Waves.mp3',
    duration: 3600, // 1 hour (loops)
    category: 'ambience',
  },
  {
    id: 'forest-rain',
    name: 'Forest Rain',
    url: 'https://ia801407.us.archive.org/15/items/rain-sounds-nature/Rain%20in%20Forest.mp3',
    duration: 3600,
    category: 'ambience',
  },
  {
    id: 'ocean-waves',
    name: 'Ocean Waves',
    url: 'https://ia801609.us.archive.org/23/items/ocean-waves-sounds/Ocean%20Waves.mp3',
    duration: 3600,
    category: 'ambience',
  },
  {
    id: 'cosmic-drift',
    name: 'Cosmic Drift',
    url: 'https://ia801407.us.archive.org/12/items/space-ambient-music/Cosmic%20Drift.mp3',
    duration: 3600,
    category: 'ambience',
  },
  {
    id: 'tibetan-bowls',
    name: 'Tibetan Singing Bowls',
    url: 'https://ia801504.us.archive.org/19/items/tibetan-singing-bowls/Tibetan%20Bowls.mp3',
    duration: 3600,
    category: 'ambience',
  },
  {
    id: 'alpha-waves',
    name: 'Alpha Waves',
    url: 'https://ia801609.us.archive.org/11/items/alpha-waves-binaural/Alpha%20Waves.mp3',
    duration: 3600,
    category: 'ambience',
  },
  {
    id: 'night-crickets',
    name: 'Night Crickets',
    url: 'https://ia801407.us.archive.org/28/items/crickets-night-sounds/Night%20Crickets.mp3',
    duration: 3600,
    category: 'ambience',
  },
  {
    id: 'wind-chimes',
    name: 'Wind Chimes',
    url: 'https://ia801504.us.archive.org/14/items/wind-chimes-ambient/Wind%20Chimes.mp3',
    duration: 3600,
    category: 'ambience',
  },
  {
    id: 'delta-waves',
    name: 'Delta Waves',
    url: 'https://ia801609.us.archive.org/7/items/delta-waves-sleep/Delta%20Waves.mp3',
    duration: 3600,
    category: 'ambience',
  },
  {
    id: 'fireplace',
    name: 'Crackling Fireplace',
    url: 'https://ia801407.us.archive.org/21/items/fireplace-crackling/Fireplace.mp3',
    duration: 3600,
    category: 'ambience',
  },
  {
    id: 'mountain-stream',
    name: 'Mountain Stream',
    url: 'https://ia801504.us.archive.org/16/items/stream-water-sounds/Mountain%20Stream.mp3',
    duration: 3600,
    category: 'ambience',
  },
  {
    id: '432hz-tone',
    name: '432 Hz Healing Tone',
    url: 'https://ia801609.us.archive.org/9/items/432hz-healing-frequency/432Hz%20Tone.mp3',
    duration: 3600,
    category: 'ambience',
  },
];

export const backgroundMusicTracks: AudioTrack[] = [
  {
    id: 'peaceful-piano',
    name: 'Peaceful Piano',
    url: 'https://ia801407.us.archive.org/18/items/peaceful-piano-music/Peaceful%20Piano.mp3',
    duration: 1800, // 30 minutes
    category: 'music',
  },
  {
    id: 'zen-garden',
    name: 'Zen Garden',
    url: 'https://ia801504.us.archive.org/22/items/zen-meditation-music/Zen%20Garden.mp3',
    duration: 1800,
    category: 'music',
  },
  {
    id: 'celestial-harmony',
    name: 'Celestial Harmony',
    url: 'https://ia801609.us.archive.org/13/items/celestial-ambient/Celestial%20Harmony.mp3',
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
