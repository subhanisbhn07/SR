export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  mode: 'consumer' | 'enterprise';
  streak: number;
  totalSessions: number;
  joinedAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications: boolean;
  reminderTime: string;
  focusAreas: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface WellnessSession {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: 'mindfulness' | 'productivity' | 'confidence' | 'anxiety' | 'focus' | 'leadership';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completedAt?: Date;
  rating?: number;
  isPremium: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
}

export interface MoodEntry {
  id: string;
  mood: 'love' | 'happy' | 'sad' | 'depressed' | 'worried' | 'confused';
  intensity: number;
  note?: string;
  createdAt: Date;
}

export interface EnterpriseTeam {
  id: string;
  name: string;
  members: User[];
  wellnessScore: number;
  activePrograms: string[];
  analytics: TeamAnalytics;
}

export interface TeamAnalytics {
  engagement: number;
  productivity: number;
  satisfaction: number;
  retention: number;
  trends: {
    period: string;
    value: number;
  }[];
}

// ============================================
// Roadmap Features - Gamification System
// ============================================

/**
 * Lantern Health System
 * - 100 = bright, fully lit lantern
 * - <50 = dim lantern (warning state)
 * - 0 = needs rekindling (critical state)
 * - Dims rather than resets on missed days (forgiving streak system)
 */
export interface LanternState {
  health: number; // 0-100
  lastUpdated: Date;
  streakDays: number;
  brightestStreak: number; // Personal best streak
}

/**
 * Sparks Currency System
 * - Earned only (no real money purchases for avatar items)
 * - Used for unlocking avatar customizations, backgrounds, etc.
 */
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

/**
 * Sign Challenge System
 * - Daily challenges (e.g., "look for a white feather")
 * - Manually logged by user (trust-based, no image recognition for MVP)
 * - Signs escalate in complexity over the 7-day free period
 */
export interface SignChallenge {
  id: string;
  day: number; // Day 1-7 for free tier, then premium
  title: string;
  description: string;
  hint?: string;
  sparksReward: number;
  isFree: boolean; // First 7 days are free
}

export interface SignCompletion {
  signId: string;
  completedAt: Date;
  userNote?: string; // Optional note about how they found the sign
}

/**
 * Tribes System
 * - 5-user groups for accountability (D&D party style)
 * - Members support each other on their manifestation journey
 */
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

/**
 * Manifestation System
 * - Users set intentions and track their manifestation journey
 * - "Hall of Fame Master" status when goals are achieved
 * - "Universe Receipt" sharing mechanic with probability calculations
 */
export interface Manifestation {
  id: string;
  userId: string;
  intention: string;
  category: 'career' | 'relationships' | 'health' | 'wealth' | 'personal_growth' | 'other';
  createdAt: Date;
  manifestedAt?: Date;
  isPublic: boolean; // For "Manifested Wins" feed
  probabilityScore?: number; // For "Universe Receipt" feature
}

/**
 * Road Step System
 * - 31 steps initially, expanding to 90 → 180 → 365 → 1000
 * - First 7 steps are free
 */
export interface RoadStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  sessionId?: string; // Links to a WellnessSession
  signChallengeId?: string; // Links to a SignChallenge
  isFree: boolean;
  sparksReward: number;
}

/**
 * Journal Entry for Traveler's Log
 * - Private by default
 * - Different types: reflection, gratitude, intention, manifestation
 */
export interface JournalEntry {
  id: string;
  userId: string;
  content: string;
  type: 'reflection' | 'gratitude' | 'intention' | 'manifestation';
  mood?: MoodEntry['mood'];
  createdAt: Date;
  isPrivate: boolean;
}

/**
 * Audio Configuration
 * - AI-generated voices (not human voice actors)
 * - 12 background audio options (unlocked at Day 15 as premium feature)
 * - Voice and background music are separate and mixable
 */
export interface AudioAmbience {
  id: string;
  name: string;
  description: string;
  audioUrl: string;
  isPremium: boolean;
  unlockDay: number; // Day when this becomes available (15 for premium backgrounds)
}

export interface SessionAudioConfig {
  voiceTrackUrl?: string;
  backgroundAmbienceId?: string;
  voiceVolume: number; // 0-1
  backgroundVolume: number; // 0-1
}
