// SignRoad Journey Types

export interface RoadStep {
  day: number;
  title: string;
  signName: string;
  signEmoji: string;
  theme: string;
  keyLesson: string;
  audioDuration: number; // in minutes
  journalPrompt: string;
  isFree: boolean;
}

export interface Sign {
  name: string;
  emoji: string;
  rarity: 'common' | 'rare' | 'mythic';
  rarityLabel: string;
  probability: number; // 1 in X
}

export interface FoundSign {
  id: string;
  userId: string;
  dayNumber: number;
  signName: string;
  signEmoji: string;
  journalEntry: string;
  foundAt: Date;
  isDigital: boolean;
  location?: string;
  rarity: 'common' | 'rare' | 'mythic';
}

export interface UserProgress {
  currentDay: number;
  completedDays: number[];
  sparks: number;
  lanternHealth: number; // 0-100
  lastMeditationAt: Date | null;
  lastActiveAt: Date | null;
  streakDays: number;
  totalSignsFound: number;
  intention: string | null;
}

export interface Tribe {
  id: string;
  members: TribeMember[];
  createdAt: Date;
}

export interface TribeMember {
  id: string;
  odonym: string; // Anonymous name like "Wanderer #492"
  avatar: 'fox' | 'owl' | 'deer' | 'raven' | 'wolf';
  meditatedToday: boolean;
  currentDay: number;
  lastMeditationAt: Date | null;
}

export interface UniverseReceipt {
  id: string;
  userId: string;
  signName: string;
  signEmoji: string;
  foundAt: Date;
  location: string;
  rarity: 'common' | 'rare' | 'mythic';
  rarityLabel: string;
  probability: number;
  dayNumber: number;
  totalDays: number;
  totalSparks: number;
  message: string;
}

export type UserRole = 'wanderer' | 'seeker' | 'pathfinder' | 'master';

export interface JourneyUser {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  isSeeker: boolean; // Paid status
  role: UserRole;
  createdAt: Date;
  progress: UserProgress;
  tribe?: Tribe;
  foundSigns: FoundSign[];
}

// Onboarding types
export type Intention = 'love' | 'purpose' | 'peace' | 'wealth' | 'health' | 'creativity';

export interface OnboardingState {
  step: 'splash' | 'intention' | 'auth' | 'promise' | 'complete';
  selectedIntention: Intention | null;
}

// Audio player types
export interface AudioState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  backgroundVolume: number;
  selectedBackground: string;
}

// The 14-day journey content
export const ROAD_STEPS: RoadStep[] = [
  // Phase 1: Wanderer's Week (Days 1-7) - FREE
  {
    day: 1,
    title: "The First Step",
    signName: "White Feather",
    signEmoji: "🪶",
    theme: "Breath Awareness",
    keyLesson: "You are lighter than you think. You are held.",
    audioDuration: 5,
    journalPrompt: "Where did you find your feather? What did it feel like to notice it?",
    isFree: true,
  },
  {
    day: 2,
    title: "Abundance Flows",
    signName: "Penny/Coin",
    signEmoji: "🪙",
    theme: "Gratitude",
    keyLesson: "Value is everywhere. You just have to be open to receive.",
    audioDuration: 6,
    journalPrompt: "What unexpected abundance did you notice today?",
    isFree: true,
  },
  {
    day: 3,
    title: "Transformation",
    signName: "Blue Butterfly",
    signEmoji: "🦋",
    theme: "Letting Go",
    keyLesson: "You are in the chrysalis. Dissolving is part of becoming.",
    audioDuration: 6,
    journalPrompt: "What are you ready to release to make room for transformation?",
    isFree: true,
  },
  {
    day: 4,
    title: "Messages Arrive",
    signName: "Red Cardinal",
    signEmoji: "🐦",
    theme: "Intuition",
    keyLesson: "The Universe is trying to reach you. Listen.",
    audioDuration: 7,
    journalPrompt: "What message did the Universe send you today?",
    isFree: true,
  },
  {
    day: 5,
    title: "Patterns Emerge",
    signName: "Repeating Numbers",
    signEmoji: "🔢",
    theme: "Synchronicity",
    keyLesson: "Coincidences are breadcrumbs. You are on the right path.",
    audioDuration: 7,
    journalPrompt: "What patterns or synchronicities did you notice?",
    isFree: true,
  },
  {
    day: 6,
    title: "Full Spectrum",
    signName: "Rainbow",
    signEmoji: "🌈",
    theme: "Wholeness",
    keyLesson: "You contain all colors. You are complete.",
    audioDuration: 7,
    journalPrompt: "What part of yourself did you embrace today?",
    isFree: true,
  },
  {
    day: 7,
    title: "The Threshold",
    signName: "Golden Key",
    signEmoji: "🔑",
    theme: "Choice & Commitment",
    keyLesson: "You hold the key to your own becoming. Will you turn it?",
    audioDuration: 8,
    journalPrompt: "What door are you ready to unlock?",
    isFree: true,
  },
  // Phase 2: Seeker's Initiation (Days 8-14) - PREMIUM
  {
    day: 8,
    title: "Crossing Over",
    signName: "Open Door",
    signEmoji: "🚪",
    theme: "Commitment & Thresholds",
    keyLesson: "You have stepped through. The air is different here.",
    audioDuration: 10,
    journalPrompt: "What door have I been standing in front of, afraid to knock?",
    isFree: false,
  },
  {
    day: 9,
    title: "The Mirror",
    signName: "Reflection",
    signEmoji: "🪞",
    theme: "Projection & Self-Perception",
    keyLesson: "The world is a mirror. What you judge in others is a shadow in yourself.",
    audioDuration: 10,
    journalPrompt: "What did my reflection tell me today?",
    isFree: false,
  },
  {
    day: 10,
    title: "Rooted Strength",
    signName: "Ancient Tree",
    signEmoji: "🌳",
    theme: "Grounding & Ancestry",
    keyLesson: "To reach the sky, you must go down into the dark earth.",
    audioDuration: 11,
    journalPrompt: "Where do I draw my strength from?",
    isFree: false,
  },
  {
    day: 11,
    title: "Fluidity",
    signName: "Running Water",
    signEmoji: "💧",
    theme: "Adaptability & Flow",
    keyLesson: "Water never struggles. It flows around the rock. Be water today.",
    audioDuration: 11,
    journalPrompt: "Where did I resist today? Where did I flow?",
    isFree: false,
  },
  {
    day: 12,
    title: "Inner Fire",
    signName: "Candle Flame",
    signEmoji: "🔥",
    theme: "Passion & Willpower",
    keyLesson: "There is a spark in your belly. It is your 'Yes.' Feed the fire today.",
    audioDuration: 12,
    journalPrompt: "What lights me up?",
    isFree: false,
  },
  {
    day: 13,
    title: "The Wind's Whisper",
    signName: "Falling Leaf",
    signEmoji: "🍃",
    theme: "Trust & Surrender",
    keyLesson: "The leaf does not fear falling. It trusts the wind.",
    audioDuration: 12,
    journalPrompt: "What am I trying to control that I need to let go of?",
    isFree: false,
  },
  {
    day: 14,
    title: "Crystal Clarity",
    signName: "Clear Quartz",
    signEmoji: "💎",
    theme: "Vision & Clarity",
    keyLesson: "The fog has lifted. Look back at how far you've come. Look forward at who you are becoming.",
    audioDuration: 15,
    journalPrompt: "I am becoming...",
    isFree: false,
  },
];

// Background audio options (premium feature)
export const BACKGROUND_AUDIO_OPTIONS = [
  { id: 'theta', name: 'Theta Waves', icon: '🌊' },
  { id: 'rain', name: 'Gentle Rain', icon: '🌧️' },
  { id: 'ocean', name: 'Ocean Waves', icon: '🌊' },
  { id: 'fire', name: 'Crackling Fire', icon: '🔥' },
  { id: 'piano', name: 'Soft Piano', icon: '🎹' },
  { id: 'bowls', name: 'Singing Bowls', icon: '🔔' },
  { id: 'forest', name: 'Forest Sounds', icon: '🌲' },
  { id: 'wind', name: 'Wind Chimes', icon: '🎐' },
  { id: 'silence', name: 'Silence', icon: '🤫' },
  { id: 'binaural', name: 'Binaural Beats', icon: '🎧' },
  { id: '528hz', name: '528Hz Frequency', icon: '✨' },
  { id: 'night', name: 'Night Sounds', icon: '🌙' },
];

// Avatar options for tribes
export const TRIBE_AVATARS: TribeMember['avatar'][] = ['fox', 'owl', 'deer', 'raven', 'wolf'];

export const AVATAR_EMOJIS: Record<TribeMember['avatar'], string> = {
  fox: '🦊',
  owl: '🦉',
  deer: '🦌',
  raven: '🐦‍⬛',
  wolf: '🐺',
};

// Spark rewards
export const SPARK_REWARDS = {
  MEDITATION_COMPLETE: 10,
  SIGN_FOUND: 5,
  TRIBE_BONUS: 5,
  REKINDLING: 20,
  MILESTONE_DAY_10: 25,
  MILESTONE_DAY_30: 50,
};

// Lantern health thresholds
export const LANTERN_LEVELS = {
  RADIANT: { min: 80, label: 'Radiant', color: 'from-amber-400 to-yellow-300' },
  GLOWING: { min: 50, label: 'Glowing', color: 'from-amber-500 to-orange-400' },
  DIM: { min: 20, label: 'Dim', color: 'from-orange-600 to-red-500' },
  FADING: { min: 0, label: 'Fading', color: 'from-red-700 to-gray-600' },
};

// Rarity configuration
export const RARITY_CONFIG = {
  common: { chance: 0.70, label: 'The Universe Whispers', stars: 1 },
  rare: { chance: 0.25, label: 'The Universe Speaks', stars: 3 },
  mythic: { chance: 0.05, label: 'The Universe Shouts', stars: 5 },
};
