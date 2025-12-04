import { WellnessSession, Achievement, MoodEntry } from '../shared/types/wellness';
import { storage } from './storage';
import { httpClient } from './httpClient';

const SESSIONS_KEY = 'sessions';
const ACHIEVEMENTS_KEY = 'achievements';
const MOOD_ENTRIES_KEY = 'mood_entries';
const COMPLETED_SESSIONS_KEY = 'completed_sessions';

export interface SessionCompletion {
  sessionId: string;
  rating: number;
  completedAt: Date;
}

export interface WellnessRepository {
  getSessions(): Promise<WellnessSession[]>;
  getSession(id: string): Promise<WellnessSession | null>;
  completeSession(sessionId: string, rating: number): Promise<void>;
  getCompletedSessions(): SessionCompletion[];
  getAchievements(): Promise<Achievement[]>;
  unlockAchievement(achievementId: string): Promise<void>;
  getMoodEntries(): MoodEntry[];
  addMoodEntry(entry: MoodEntry): void;
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

export const localWellnessRepository: WellnessRepository = {
  async getSessions(): Promise<WellnessSession[]> {
    const cached = storage.get<WellnessSession[]>(SESSIONS_KEY);
    if (cached) return cached;
    
    storage.set(SESSIONS_KEY, mockSessions);
    return mockSessions;
  },

  async getSession(id: string): Promise<WellnessSession | null> {
    const sessions = await this.getSessions();
    return sessions.find(s => s.id === id) || null;
  },

  async completeSession(sessionId: string, rating: number): Promise<void> {
    const completions = this.getCompletedSessions();
    completions.push({
      sessionId,
      rating,
      completedAt: new Date(),
    });
    storage.set(COMPLETED_SESSIONS_KEY, completions);
  },

  getCompletedSessions(): SessionCompletion[] {
    return storage.get<SessionCompletion[]>(COMPLETED_SESSIONS_KEY) || [];
  },

  async getAchievements(): Promise<Achievement[]> {
    const cached = storage.get<Achievement[]>(ACHIEVEMENTS_KEY);
    if (cached) return cached;
    
    storage.set(ACHIEVEMENTS_KEY, mockAchievements);
    return mockAchievements;
  },

  async unlockAchievement(achievementId: string): Promise<void> {
    const achievements = await this.getAchievements();
    const updated = achievements.map(a =>
      a.id === achievementId ? { ...a, unlockedAt: new Date() } : a
    );
    storage.set(ACHIEVEMENTS_KEY, updated);
  },

  getMoodEntries(): MoodEntry[] {
    return storage.get<MoodEntry[]>(MOOD_ENTRIES_KEY) || [];
  },

  addMoodEntry(entry: MoodEntry): void {
    const entries = this.getMoodEntries();
    entries.unshift(entry);
    storage.set(MOOD_ENTRIES_KEY, entries);
  },
};

export const apiWellnessRepository: WellnessRepository = {
  async getSessions(): Promise<WellnessSession[]> {
    const response = await httpClient.get<WellnessSession[]>('/wellness/sessions');
    if (!response.success) {
      return localWellnessRepository.getSessions();
    }
    return response.data;
  },

  async getSession(id: string): Promise<WellnessSession | null> {
    const response = await httpClient.get<WellnessSession>(`/wellness/sessions/${id}`);
    if (!response.success) {
      return localWellnessRepository.getSession(id);
    }
    return response.data;
  },

  async completeSession(sessionId: string, rating: number): Promise<void> {
    await httpClient.post('/wellness/sessions/complete', { sessionId, rating });
    await localWellnessRepository.completeSession(sessionId, rating);
  },

  getCompletedSessions(): SessionCompletion[] {
    return localWellnessRepository.getCompletedSessions();
  },

  async getAchievements(): Promise<Achievement[]> {
    const response = await httpClient.get<Achievement[]>('/wellness/achievements');
    if (!response.success) {
      return localWellnessRepository.getAchievements();
    }
    return response.data;
  },

  async unlockAchievement(achievementId: string): Promise<void> {
    await httpClient.post(`/wellness/achievements/${achievementId}/unlock`);
    await localWellnessRepository.unlockAchievement(achievementId);
  },

  getMoodEntries(): MoodEntry[] {
    return localWellnessRepository.getMoodEntries();
  },

  addMoodEntry(entry: MoodEntry): void {
    httpClient.post('/wellness/mood', entry);
    localWellnessRepository.addMoodEntry(entry);
  },
};

const USE_API = false;
export const wellnessRepository: WellnessRepository = USE_API ? apiWellnessRepository : localWellnessRepository;
