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
// Onboarding & Life Path Personalization
// ============================================

export type LifePath = 
  | 'student'
  | 'salaried'
  | 'entrepreneur'
  | 'parent'
  | 'career_transition'
  | 'retired';

export type PrimaryStruggle = 
  | 'work_stress'
  | 'money_worries'
  | 'sleep_issues'
  | 'loneliness'
  | 'healing'
  | 'seeking_meaning';

export type TimeAvailable = '2-5min' | '10-15min' | '20+min';

export type PreferredMode = 'solo_audio' | 'journaling' | 'group_support';

export type GenderIdentity = 'male' | 'female' | 'non_binary' | 'prefer_not_to_say';

export type ContentTone = 'science_based' | 'mystical' | 'balanced';

export type ExperienceLevel = 'new' | 'some_experience' | 'regular_practice';

export type GoalTimeframe = 'quick_relief' | 'building_habit' | 'long_term_transformation';

export interface OnboardingAnswers {
  lifePath: LifePath;
  primaryStruggle: PrimaryStruggle;
  timeAvailable: TimeAvailable;
  preferredMode: PreferredMode;
  genderIdentity?: GenderIdentity;
  contentTone: ContentTone;
  experienceLevel: ExperienceLevel;
  goalTimeframe: GoalTimeframe;
}

export interface UserProfile extends OnboardingAnswers {
  hasCompletedOnboarding: boolean;
  onboardingCompletedAt?: Date;
}

// ============================================
// Roadmap Features - Gamification System
// ============================================

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
  mood?: MoodEntry['mood'];
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

export interface SessionAudioConfig {
  voiceTrackUrl?: string;
  backgroundAmbienceId?: string;
  voiceVolume: number;
  backgroundVolume: number;
}
