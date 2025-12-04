export interface WellnessSession {
  id: string;
  title: string;
  description: string;
  duration: number;
  category: SessionCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completedAt?: Date;
  rating?: number;
  isPremium: boolean;
  audioUrl?: string;
}

export type SessionCategory = 'mindfulness' | 'productivity' | 'confidence' | 'anxiety' | 'focus' | 'leadership';

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
  mood: MoodType;
  intensity: number;
  note?: string;
  createdAt: Date;
}

export type MoodType = 'love' | 'happy' | 'sad' | 'depressed' | 'worried' | 'confused';

export interface EnterpriseTeam {
  id: string;
  name: string;
  members: import('./user').User[];
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

export interface SessionAudioConfig {
  voiceTrackUrl?: string;
  backgroundAmbienceId?: string;
  voiceVolume: number;
  backgroundVolume: number;
}
