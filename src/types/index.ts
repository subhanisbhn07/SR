// Re-export User types from authStore for backward compatibility
export type { User, AppUser } from '../store/authStore';

// Re-export database types
export type {
  Database,
  Sign,
  UserSignLog,
  UserActiveSign,
  MeditationSession,
  SparksTransaction,
  Tribe,
  Manifestation,
  Road,
  RoadStep,
} from './database';

export interface UserPreferences {
  notifications: boolean;
  reminderTime: string;
  focusAreas: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
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
