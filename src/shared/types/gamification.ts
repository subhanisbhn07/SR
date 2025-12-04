export interface LanternState {
  health: number;
  lastUpdated: Date;
  streakDays: number;
  brightestStreak: number;
}

export interface SparkTransaction {
  id: string;
  amount: number;
  reason: 'session_complete' | 'sign_found' | 'streak_bonus' | 'achievement' | 'tribe_bonus';
  description: string;
  createdAt: Date;
}

export interface SparkBalance {
  total: number;
  transactions: SparkTransaction[];
}

export interface SignChallenge {
  id: string;
  day: number;
  title: string;
  description: string;
  hint?: string;
  sparksReward: number;
  isFree: boolean;
}

export interface SignCompletion {
  signId: string;
  completedAt: Date;
  userNote?: string;
}

export interface Tribe {
  id: string;
  name: string;
  memberIds: string[];
  createdAt: Date;
  totalSparksEarned: number;
  collectiveStreak: number;
}

export interface TribeMember {
  id: string;
  name: string;
  avatar?: string;
  lanternHealth: number;
  currentStreak: number;
  role: 'leader' | 'member';
}

export interface Manifestation {
  id: string;
  userId: string;
  intention: string;
  category: 'career' | 'relationships' | 'health' | 'wealth' | 'personal_growth' | 'other';
  createdAt: Date;
  manifestedAt?: Date;
  isPublic: boolean;
  probabilityScore?: number;
}

export interface RoadStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  sessionId?: string;
  signChallengeId?: string;
  isFree: boolean;
  sparksReward: number;
}

export interface JournalEntry {
  id: string;
  userId: string;
  content: string;
  type: 'reflection' | 'gratitude' | 'intention' | 'manifestation';
  mood?: import('./wellness').MoodType;
  createdAt: Date;
  isPrivate: boolean;
}

export interface AudioAmbience {
  id: string;
  name: string;
  description: string;
  audioUrl: string;
  isPremium: boolean;
  unlockDay: number;
}
