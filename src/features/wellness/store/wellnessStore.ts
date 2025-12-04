import { create } from 'zustand';
import { WellnessSession, Achievement, MoodEntry, MoodType } from '../../../shared/types/wellness';
import { wellnessRepository } from '../../../services/wellnessRepository';

interface WellnessState {
  sessions: WellnessSession[];
  achievements: Achievement[];
  moodEntries: MoodEntry[];
  currentSession: WellnessSession | null;
  isLoading: boolean;
  
  loadSessions: () => Promise<void>;
  loadAchievements: () => Promise<void>;
  addMoodEntry: (mood: MoodType, intensity: number, note?: string) => void;
  startSession: (session: WellnessSession) => void;
  clearCurrentSession: () => void;
  completeSession: (rating: number) => void;
  unlockAchievement: (achievementId: string) => void;
}

export const useWellnessStore = create<WellnessState>((set, get) => ({
  sessions: [],
  achievements: [],
  moodEntries: wellnessRepository.getMoodEntries(),
  currentSession: null,
  isLoading: false,
  
  loadSessions: async () => {
    set({ isLoading: true });
    const sessions = await wellnessRepository.getSessions();
    set({ sessions, isLoading: false });
  },
  
  loadAchievements: async () => {
    const achievements = await wellnessRepository.getAchievements();
    set({ achievements });
  },
  
  addMoodEntry: (mood, intensity, note) => {
    const entry: MoodEntry = {
      id: Date.now().toString(),
      mood,
      intensity,
      note,
      createdAt: new Date(),
    };
    
    wellnessRepository.addMoodEntry(entry);
    set(state => ({
      moodEntries: [entry, ...state.moodEntries],
    }));
  },
  
  startSession: (session) => {
    set({ currentSession: session });
  },
  
  clearCurrentSession: () => {
    set({ currentSession: null });
  },
  
  completeSession: async (rating) => {
    const { currentSession } = get();
    if (currentSession) {
      await wellnessRepository.completeSession(currentSession.id, rating);
      
      const completedSession = {
        ...currentSession,
        completedAt: new Date(),
        rating,
      };
      
      set(state => ({
        sessions: state.sessions.map(s => 
          s.id === currentSession.id ? completedSession : s
        ),
        currentSession: null,
      }));
    }
  },
  
  unlockAchievement: async (achievementId) => {
    await wellnessRepository.unlockAchievement(achievementId);
    
    set(state => ({
      achievements: state.achievements.map(a =>
        a.id === achievementId
          ? { ...a, unlockedAt: new Date() }
          : a
      ),
    }));
  },
}));
