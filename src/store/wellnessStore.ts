import { create } from 'zustand';
import { WellnessSession, Achievement, MoodEntry } from '../types';
import { 
  moodStorage, 
  sessionStorage as completedSessionStorage,
  userStorage,
  PersistedMoodEntry,
  PersistedCompletedSession 
} from '../services/storage';

interface WellnessState {
  sessions: WellnessSession[];
  achievements: Achievement[];
  moodEntries: MoodEntry[];
  currentSession: WellnessSession | null;
  addMoodEntry: (mood: MoodEntry['mood'], intensity: number, note?: string) => void;
  startSession: (session: WellnessSession) => void;
  clearCurrentSession: () => void;
  completeSession: (rating: number) => void;
  unlockAchievement: (achievementId: string) => void;
  getSessionById: (id: string) => WellnessSession | undefined;
}

const mockSessions: WellnessSession[] = [
  {
    id: '1',
    title: 'Build Confidence',
    description: 'Transform self-doubt into unshakeable confidence through proven psychological techniques.',
    duration: 15,
    category: 'confidence',
    difficulty: 'beginner',
    isPremium: false,
  },
  {
    id: '2',
    title: 'Focus & Productivity',
    description: 'Master deep work and eliminate distractions for peak performance.',
    duration: 20,
    category: 'productivity',
    difficulty: 'intermediate',
    isPremium: false,
  },
  {
    id: '3',
    title: 'Anxiety Relief',
    description: 'Evidence-based techniques to calm your mind and reduce anxiety.',
    duration: 12,
    category: 'anxiety',
    difficulty: 'beginner',
    isPremium: false,
  },
  {
    id: '4',
    title: 'Leadership Presence',
    description: 'Develop executive presence and inspire confidence in others.',
    duration: 25,
    category: 'leadership',
    difficulty: 'advanced',
    isPremium: true,
  },
];

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first wellness session',
    icon: '🎯',
    progress: 1,
    maxProgress: 1,
    unlockedAt: new Date(),
  },
  {
    id: '2',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    progress: 7,
    maxProgress: 7,
    unlockedAt: new Date(),
  },
  {
    id: '3',
    title: 'Mindful Master',
    description: 'Complete 50 mindfulness sessions',
    icon: '🧘',
    progress: 23,
    maxProgress: 50,
  },
];

export const useWellnessStore = create<WellnessState>((set, get) => ({
  sessions: mockSessions,
  achievements: mockAchievements,
  moodEntries: [],
  currentSession: null,
  
  addMoodEntry: (mood, intensity, note) => {
    const entry: MoodEntry = {
      id: Date.now().toString(),
      mood,
      intensity,
      note,
      createdAt: new Date(),
    };
    
    // Persist to localStorage
    const persistedEntry: PersistedMoodEntry = {
      id: entry.id,
      mood: entry.mood,
      intensity: entry.intensity,
      note: entry.note,
      createdAt: entry.createdAt.toISOString(),
    };
    moodStorage.add(persistedEntry);
    
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
  
  completeSession: (rating) => {
    const { currentSession } = get();
    if (currentSession) {
      const completedSession = {
        ...currentSession,
        completedAt: new Date(),
        rating,
      };
      
      // Persist to localStorage
      const persistedCompletion: PersistedCompletedSession = {
        sessionId: currentSession.id,
        completedAt: new Date().toISOString(),
        rating,
        sparksEarned: 10, // Base sparks for completing a session
      };
      completedSessionStorage.add(persistedCompletion);
      userStorage.incrementTotalSessions();
      
      set(state => ({
        sessions: state.sessions.map(s => 
          s.id === currentSession.id ? completedSession : s
        ),
        currentSession: null,
      }));
    }
  },
  
  unlockAchievement: (achievementId) => {
    set(state => ({
      achievements: state.achievements.map(a =>
        a.id === achievementId
          ? { ...a, unlockedAt: new Date() }
          : a
      ),
    }));
  },
  
  getSessionById: (id: string) => {
    return get().sessions.find(s => s.id === id);
  },
}));
