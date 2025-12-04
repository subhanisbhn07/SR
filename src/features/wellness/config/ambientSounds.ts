export interface AmbientSound {
  id: string;
  name: string;
  icon: string;
  description: string;
  audioUrl: string;
  defaultVolume: number;
}

export const AMBIENT_SOUNDS: AmbientSound[] = [
  {
    id: 'rain',
    name: 'Rain',
    icon: '🌧️',
    description: 'Gentle rainfall',
    audioUrl: '/audio/ambience/rain.mp3',
    defaultVolume: 0.3,
  },
  {
    id: 'ocean',
    name: 'Ocean',
    icon: '🌊',
    description: 'Ocean waves',
    audioUrl: '/audio/ambience/ocean.mp3',
    defaultVolume: 0.3,
  },
  {
    id: 'forest',
    name: 'Forest',
    icon: '🌲',
    description: 'Forest sounds',
    audioUrl: '/audio/ambience/forest.mp3',
    defaultVolume: 0.25,
  },
  {
    id: 'fire',
    name: 'Fireplace',
    icon: '🔥',
    description: 'Crackling fire',
    audioUrl: '/audio/ambience/fire.mp3',
    defaultVolume: 0.25,
  },
  {
    id: 'wind',
    name: 'Wind',
    icon: '💨',
    description: 'Soft breeze',
    audioUrl: '/audio/ambience/wind.mp3',
    defaultVolume: 0.2,
  },
  {
    id: 'thunder',
    name: 'Thunder',
    icon: '⛈️',
    description: 'Distant thunder',
    audioUrl: '/audio/ambience/thunder.mp3',
    defaultVolume: 0.2,
  },
  {
    id: 'birds',
    name: 'Birds',
    icon: '🐦',
    description: 'Bird songs',
    audioUrl: '/audio/ambience/birds.mp3',
    defaultVolume: 0.25,
  },
  {
    id: 'night',
    name: 'Night',
    icon: '🌙',
    description: 'Night crickets',
    audioUrl: '/audio/ambience/night.mp3',
    defaultVolume: 0.2,
  },
  {
    id: 'cafe',
    name: 'Cafe',
    icon: '☕',
    description: 'Cafe murmurs',
    audioUrl: '/audio/ambience/cafe.mp3',
    defaultVolume: 0.15,
  },
  {
    id: 'stream',
    name: 'Stream',
    icon: '💧',
    description: 'Flowing stream',
    audioUrl: '/audio/ambience/stream.mp3',
    defaultVolume: 0.3,
  },
  {
    id: 'singing-bowls',
    name: 'Bowls',
    icon: '🔔',
    description: 'Singing bowls',
    audioUrl: '/audio/ambience/singing-bowls.mp3',
    defaultVolume: 0.2,
  },
  {
    id: 'white-noise',
    name: 'White Noise',
    icon: '📻',
    description: 'Soft static',
    audioUrl: '/audio/ambience/white-noise.mp3',
    defaultVolume: 0.15,
  },
];
