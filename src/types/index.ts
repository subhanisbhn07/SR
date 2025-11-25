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
  audioUrl?: string;
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
