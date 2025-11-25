/**
 * Storage Service - Clean abstraction layer for data persistence
 * 
 * This service provides a unified interface for storing and retrieving data.
 * Currently uses localStorage, but can be swapped for an API backend later
 * without changing the interface used by components.
 */

const STORAGE_KEYS = {
  USER: 'signroad_user',
  MOOD_ENTRIES: 'signroad_mood_entries',
  COMPLETED_SESSIONS: 'signroad_completed_sessions',
  LANTERN_STATE: 'signroad_lantern_state',
  SPARKS: 'signroad_sparks',
  SIGN_COMPLETIONS: 'signroad_sign_completions',
  JOURNAL_ENTRIES: 'signroad_journal_entries',
} as const;

// Helper functions for localStorage operations
const getItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch {
    console.warn(`Failed to parse localStorage item: ${key}`);
    return defaultValue;
  }
};

const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to save to localStorage: ${key}`, error);
  }
};

const removeItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove from localStorage: ${key}`, error);
  }
};

// User persistence
export interface PersistedUser {
  id: string;
  email: string;
  name: string;
  streak: number;
  totalSessions: number;
  lanternHealth: number;
  currencySparks: number;
  lastActiveDate: string;
}

export const userStorage = {
  get: (): PersistedUser | null => {
    return getItem<PersistedUser | null>(STORAGE_KEYS.USER, null);
  },
  
  save: (user: PersistedUser): void => {
    setItem(STORAGE_KEYS.USER, user);
  },
  
  clear: (): void => {
    removeItem(STORAGE_KEYS.USER);
  },
  
  updateStreak: (streak: number): void => {
    const user = userStorage.get();
    if (user) {
      userStorage.save({ ...user, streak, lastActiveDate: new Date().toISOString().split('T')[0] });
    }
  },
  
  updateLanternHealth: (health: number): void => {
    const user = userStorage.get();
    if (user) {
      userStorage.save({ ...user, lanternHealth: Math.max(0, Math.min(100, health)) });
    }
  },
  
  addSparks: (amount: number): void => {
    const user = userStorage.get();
    if (user) {
      userStorage.save({ ...user, currencySparks: user.currencySparks + amount });
    }
  },
  
  incrementTotalSessions: (): void => {
    const user = userStorage.get();
    if (user) {
      userStorage.save({ ...user, totalSessions: user.totalSessions + 1 });
    }
  },
};

// Mood entries persistence
export interface PersistedMoodEntry {
  id: string;
  mood: string;
  intensity: number;
  note?: string;
  createdAt: string;
}

export const moodStorage = {
  getAll: (): PersistedMoodEntry[] => {
    return getItem<PersistedMoodEntry[]>(STORAGE_KEYS.MOOD_ENTRIES, []);
  },
  
  add: (entry: PersistedMoodEntry): void => {
    const entries = moodStorage.getAll();
    setItem(STORAGE_KEYS.MOOD_ENTRIES, [entry, ...entries]);
  },
  
  clear: (): void => {
    removeItem(STORAGE_KEYS.MOOD_ENTRIES);
  },
};

// Completed sessions persistence
export interface PersistedCompletedSession {
  sessionId: string;
  completedAt: string;
  rating: number;
  sparksEarned: number;
}

export const sessionStorage = {
  getAll: (): PersistedCompletedSession[] => {
    return getItem<PersistedCompletedSession[]>(STORAGE_KEYS.COMPLETED_SESSIONS, []);
  },
  
  add: (session: PersistedCompletedSession): void => {
    const sessions = sessionStorage.getAll();
    setItem(STORAGE_KEYS.COMPLETED_SESSIONS, [session, ...sessions]);
  },
  
  isCompleted: (sessionId: string): boolean => {
    return sessionStorage.getAll().some(s => s.sessionId === sessionId);
  },
  
  clear: (): void => {
    removeItem(STORAGE_KEYS.COMPLETED_SESSIONS);
  },
};

// Sign challenge completions persistence
export interface PersistedSignCompletion {
  signId: string;
  completedAt: string;
  description: string;
}

export const signStorage = {
  getAll: (): PersistedSignCompletion[] => {
    return getItem<PersistedSignCompletion[]>(STORAGE_KEYS.SIGN_COMPLETIONS, []);
  },
  
  add: (completion: PersistedSignCompletion): void => {
    const completions = signStorage.getAll();
    setItem(STORAGE_KEYS.SIGN_COMPLETIONS, [completion, ...completions]);
  },
  
  isCompleted: (signId: string): boolean => {
    return signStorage.getAll().some(s => s.signId === signId);
  },
  
  clear: (): void => {
    removeItem(STORAGE_KEYS.SIGN_COMPLETIONS);
  },
};

// Journal entries persistence
export interface PersistedJournalEntry {
  id: string;
  content: string;
  createdAt: string;
  type: 'reflection' | 'gratitude' | 'intention' | 'manifestation';
}

export const journalStorage = {
  getAll: (): PersistedJournalEntry[] => {
    return getItem<PersistedJournalEntry[]>(STORAGE_KEYS.JOURNAL_ENTRIES, []);
  },
  
  add: (entry: PersistedJournalEntry): void => {
    const entries = journalStorage.getAll();
    setItem(STORAGE_KEYS.JOURNAL_ENTRIES, [entry, ...entries]);
  },
  
  clear: (): void => {
    removeItem(STORAGE_KEYS.JOURNAL_ENTRIES);
  },
};

// Clear all stored data (for logout)
export const clearAllStorage = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    removeItem(key);
  });
};

// Initialize user from storage or create new
export const initializeUserFromStorage = (email: string, name: string): PersistedUser => {
  const existingUser = userStorage.get();
  
  // If user exists with same email, return existing data
  if (existingUser && existingUser.email === email) {
    // Check if we need to update streak based on last active date
    const today = new Date().toISOString().split('T')[0];
    const lastActive = existingUser.lastActiveDate;
    
    if (lastActive !== today) {
      const lastDate = new Date(lastActive);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // Consecutive day - maintain streak
        existingUser.lastActiveDate = today;
      } else if (diffDays > 1) {
        // Missed days - dim lantern instead of resetting streak
        const healthLoss = Math.min(diffDays * 10, 50); // Lose 10 health per missed day, max 50
        existingUser.lanternHealth = Math.max(0, existingUser.lanternHealth - healthLoss);
        existingUser.lastActiveDate = today;
      }
      
      userStorage.save(existingUser);
    }
    
    return existingUser;
  }
  
  // Create new user
  const newUser: PersistedUser = {
    id: Date.now().toString(),
    email,
    name,
    streak: 0,
    totalSessions: 0,
    lanternHealth: 100, // Start with full lantern
    currencySparks: 0,
    lastActiveDate: new Date().toISOString().split('T')[0],
  };
  
  userStorage.save(newUser);
  return newUser;
};
