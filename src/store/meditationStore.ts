import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Background audio options - unlocked at Day 15 as premium feature
export interface BackgroundAudio {
  id: string;
  name: string;
  description: string;
  category: 'nature' | 'ambient' | 'music' | 'binaural';
  unlockDay: number; // Day in journey when this unlocks (0 = always available)
  isPremium: boolean;
  audioUrl?: string; // Optional - for demo purposes
}

export const BACKGROUND_AUDIO_OPTIONS: BackgroundAudio[] = [
  // Free options (always available)
  { id: 'silence', name: 'Silence', description: 'Pure focus without background', category: 'ambient', unlockDay: 0, isPremium: false },
  { id: 'rain', name: 'Gentle Rain', description: 'Soft rainfall on leaves', category: 'nature', unlockDay: 0, isPremium: false },
  { id: 'ocean', name: 'Ocean Waves', description: 'Rhythmic waves on shore', category: 'nature', unlockDay: 0, isPremium: false },
  
  // Premium options (unlock at Day 15)
  { id: 'forest', name: 'Forest Morning', description: 'Birds and rustling leaves', category: 'nature', unlockDay: 15, isPremium: true },
  { id: 'thunderstorm', name: 'Distant Thunder', description: 'Rolling thunder and rain', category: 'nature', unlockDay: 15, isPremium: true },
  { id: 'fireplace', name: 'Crackling Fire', description: 'Warm fireplace ambience', category: 'ambient', unlockDay: 15, isPremium: true },
  { id: 'wind', name: 'Mountain Wind', description: 'Gentle breeze through peaks', category: 'nature', unlockDay: 15, isPremium: true },
  { id: 'stream', name: 'Flowing Stream', description: 'Babbling brook in forest', category: 'nature', unlockDay: 15, isPremium: true },
  { id: 'singing_bowls', name: 'Singing Bowls', description: 'Tibetan healing tones', category: 'music', unlockDay: 15, isPremium: true },
  { id: 'alpha_waves', name: 'Alpha Waves', description: '10Hz relaxation frequency', category: 'binaural', unlockDay: 15, isPremium: true },
  { id: 'theta_waves', name: 'Theta Waves', description: '6Hz deep meditation', category: 'binaural', unlockDay: 15, isPremium: true },
  { id: 'cosmic', name: 'Cosmic Drift', description: 'Space ambient soundscape', category: 'ambient', unlockDay: 15, isPremium: true },
];

// Meditation session types
export type SessionLength = 'micro' | 'short' | 'medium' | 'deep';

export interface SessionLengthOption {
  type: SessionLength;
  label: string;
  durationMinutes: number;
  description: string;
  sparksReward: number;
}

export const SESSION_LENGTH_OPTIONS: SessionLengthOption[] = [
  { type: 'micro', label: 'Micro-dose', durationMinutes: 2, description: 'Quick reset', sparksReward: 5 },
  { type: 'short', label: 'Short', durationMinutes: 5, description: 'Brief pause', sparksReward: 10 },
  { type: 'medium', label: 'Medium', durationMinutes: 12, description: 'Full session', sparksReward: 20 },
  { type: 'deep', label: 'Deep Dive', durationMinutes: 25, description: 'Immersive journey', sparksReward: 40 },
];

// Meditation session log
export interface MeditationSession {
  id: string;
  courseId?: number;
  courseName?: string;
  startedAt: Date;
  completedAt?: Date;
  durationMinutes: number;
  sessionLength: SessionLength;
  backgroundAudioId?: string;
  sparksEarned: number;
  completed: boolean;
}

interface MeditationState {
  // Session history
  sessions: MeditationSession[];
  totalMinutesMeditated: number;
  totalSessionsCompleted: number;
  
  // Current session
  currentSession: MeditationSession | null;
  selectedBackgroundAudio: string;
  selectedSessionLength: SessionLength;
  
  // User preferences
  voiceVolume: number; // 0-100
  backgroundVolume: number; // 0-100
  
  // Actions
  startSession: (courseId?: number, courseName?: string) => void;
  completeSession: () => { sparksEarned: number };
  cancelSession: () => void;
  setBackgroundAudio: (audioId: string) => void;
  setSessionLength: (length: SessionLength) => void;
  setVoiceVolume: (volume: number) => void;
  setBackgroundVolume: (volume: number) => void;
  getAvailableBackgroundAudio: (userDay: number, isPremium: boolean) => BackgroundAudio[];
  getSessionStats: () => { totalMinutes: number; totalSessions: number; streak: number };
}

export const useMeditationStore = create<MeditationState>()(
  persist(
    (set, get) => ({
      sessions: [],
      totalMinutesMeditated: 0,
      totalSessionsCompleted: 0,
      currentSession: null,
      selectedBackgroundAudio: 'silence',
      selectedSessionLength: 'short',
      voiceVolume: 80,
      backgroundVolume: 50,

      startSession: (courseId?: number, courseName?: string) => {
        const sessionLength = get().selectedSessionLength;
        const lengthOption = SESSION_LENGTH_OPTIONS.find(o => o.type === sessionLength) || SESSION_LENGTH_OPTIONS[1];
        
        const newSession: MeditationSession = {
          id: `session-${Date.now()}`,
          courseId,
          courseName,
          startedAt: new Date(),
          durationMinutes: lengthOption.durationMinutes,
          sessionLength,
          backgroundAudioId: get().selectedBackgroundAudio,
          sparksEarned: 0,
          completed: false,
        };

        set({ currentSession: newSession });
      },

      completeSession: () => {
        const currentSession = get().currentSession;
        if (!currentSession) return { sparksEarned: 0 };

        const lengthOption = SESSION_LENGTH_OPTIONS.find(o => o.type === currentSession.sessionLength) || SESSION_LENGTH_OPTIONS[1];
        const sparksEarned = lengthOption.sparksReward;

        const completedSession: MeditationSession = {
          ...currentSession,
          completedAt: new Date(),
          sparksEarned,
          completed: true,
        };

        set(state => ({
          sessions: [...state.sessions, completedSession],
          totalMinutesMeditated: state.totalMinutesMeditated + currentSession.durationMinutes,
          totalSessionsCompleted: state.totalSessionsCompleted + 1,
          currentSession: null,
        }));

        return { sparksEarned };
      },

      cancelSession: () => {
        set({ currentSession: null });
      },

      setBackgroundAudio: (audioId: string) => {
        set({ selectedBackgroundAudio: audioId });
      },

      setSessionLength: (length: SessionLength) => {
        set({ selectedSessionLength: length });
      },

      setVoiceVolume: (volume: number) => {
        set({ voiceVolume: Math.max(0, Math.min(100, volume)) });
      },

      setBackgroundVolume: (volume: number) => {
        set({ backgroundVolume: Math.max(0, Math.min(100, volume)) });
      },

      getAvailableBackgroundAudio: (userDay: number, isPremium: boolean) => {
        return BACKGROUND_AUDIO_OPTIONS.filter(audio => {
          if (audio.isPremium && !isPremium) return false;
          if (audio.unlockDay > userDay) return false;
          return true;
        });
      },

      getSessionStats: () => {
        const state = get();
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Calculate meditation streak
        let streak = 0;
        const sortedSessions = [...state.sessions]
          .filter(s => s.completed)
          .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());
        
        if (sortedSessions.length > 0) {
          const checkDate = new Date(today);
          for (let i = 0; i < 365; i++) {
            const hasSessionOnDate = sortedSessions.some(s => {
              const sessionDate = new Date(s.startedAt);
              sessionDate.setHours(0, 0, 0, 0);
              return sessionDate.getTime() === checkDate.getTime();
            });
            
            if (hasSessionOnDate) {
              streak++;
              checkDate.setDate(checkDate.getDate() - 1);
            } else if (i === 0) {
              // No session today, check yesterday
              checkDate.setDate(checkDate.getDate() - 1);
            } else {
              break;
            }
          }
        }

        return {
          totalMinutes: state.totalMinutesMeditated,
          totalSessions: state.totalSessionsCompleted,
          streak,
        };
      },
    }),
    {
      name: 'signroad-meditation',
    }
  )
);
