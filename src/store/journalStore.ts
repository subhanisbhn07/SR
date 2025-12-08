import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Journal entry interface (Traveler's Log)
export interface JournalEntry {
  id: string;
  content: string;
  prompt?: string;
  mood?: string;
  moodEmoji?: string;
  createdAt: Date;
  updatedAt: Date;
  isPrivate: boolean; // Always true for Traveler's Log (private by default)
  tags?: string[];
  signId?: string; // If entry is related to a sign found
  sparksEarned: number;
}

// Journal prompts for daily reflection
export const JOURNAL_PROMPTS = [
  "What are you grateful for today?",
  "What sign from the universe did you notice?",
  "What intention are you setting for tomorrow?",
  "What made you smile today?",
  "What challenge did you overcome?",
  "What did you learn about yourself today?",
  "What would you tell your past self?",
  "What are you manifesting right now?",
  "What small victory are you celebrating?",
  "What fear did you face today?",
  "What brought you peace today?",
  "What are you releasing to the universe?",
  "What synchronicity did you experience?",
  "What are you calling into your life?",
  "What made you feel alive today?",
];

// Mood options
export interface MoodOption {
  emoji: string;
  label: string;
  value: string;
}

export const MOOD_OPTIONS: MoodOption[] = [
  { emoji: '😊', label: 'Happy', value: 'happy' },
  { emoji: '😌', label: 'Peaceful', value: 'peaceful' },
  { emoji: '🙂', label: 'Content', value: 'content' },
  { emoji: '😐', label: 'Neutral', value: 'neutral' },
  { emoji: '😔', label: 'Sad', value: 'sad' },
  { emoji: '😤', label: 'Frustrated', value: 'frustrated' },
  { emoji: '😰', label: 'Anxious', value: 'anxious' },
  { emoji: '🥱', label: 'Tired', value: 'tired' },
  { emoji: '🤔', label: 'Reflective', value: 'reflective' },
  { emoji: '✨', label: 'Inspired', value: 'inspired' },
  { emoji: '🙏', label: 'Grateful', value: 'grateful' },
  { emoji: '💪', label: 'Motivated', value: 'motivated' },
];

// Sparks earned for journaling
const JOURNAL_SPARKS_REWARD = 10;

interface JournalState {
  // Entries
  entries: JournalEntry[];
  totalEntries: number;
  
  // Current entry being written
  draftContent: string;
  draftMood: string | null;
  
  // Stats
  journalStreak: number;
  lastJournalDate: Date | null;
  
  // Actions
  createEntry: (content: string, mood?: string, prompt?: string, signId?: string) => { entry: JournalEntry; sparksEarned: number };
  updateEntry: (entryId: string, content: string, mood?: string) => void;
  deleteEntry: (entryId: string) => void;
  setDraft: (content: string, mood?: string | null) => void;
  clearDraft: () => void;
  getTodaysPrompt: () => string;
  getEntriesByDate: (date: Date) => JournalEntry[];
  getRecentEntries: (limit?: number) => JournalEntry[];
  hasJournaledToday: () => boolean;
  getJournalStats: () => { totalEntries: number; streak: number; totalSparks: number };
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set, get) => ({
      entries: [],
      totalEntries: 0,
      draftContent: '',
      draftMood: null,
      journalStreak: 0,
      lastJournalDate: null,

      createEntry: (content: string, mood?: string, prompt?: string, signId?: string) => {
        const moodOption = mood ? MOOD_OPTIONS.find(m => m.value === mood) : undefined;
        
        const newEntry: JournalEntry = {
          id: `entry-${Date.now()}`,
          content,
          prompt,
          mood,
          moodEmoji: moodOption?.emoji,
          createdAt: new Date(),
          updatedAt: new Date(),
          isPrivate: true, // Always private for Traveler's Log
          signId,
          sparksEarned: JOURNAL_SPARKS_REWARD,
        };

        // Update streak
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastDate = get().lastJournalDate;
        let newStreak = 1;

        if (lastDate) {
          const lastDateNormalized = new Date(lastDate);
          lastDateNormalized.setHours(0, 0, 0, 0);
          const diffDays = Math.floor((today.getTime() - lastDateNormalized.getTime()) / (1000 * 60 * 60 * 24));
          
          if (diffDays === 0) {
            // Already journaled today, keep current streak
            newStreak = get().journalStreak;
          } else if (diffDays === 1) {
            // Consecutive day, increment streak
            newStreak = get().journalStreak + 1;
          }
          // If diffDays > 1, streak resets to 1
        }

        set(state => ({
          entries: [newEntry, ...state.entries],
          totalEntries: state.totalEntries + 1,
          journalStreak: newStreak,
          lastJournalDate: new Date(),
          draftContent: '',
          draftMood: null,
        }));

        return { entry: newEntry, sparksEarned: JOURNAL_SPARKS_REWARD };
      },

      updateEntry: (entryId: string, content: string, mood?: string) => {
        const moodOption = mood ? MOOD_OPTIONS.find(m => m.value === mood) : undefined;
        
        set(state => ({
          entries: state.entries.map(entry =>
            entry.id === entryId
              ? {
                  ...entry,
                  content,
                  mood,
                  moodEmoji: moodOption?.emoji || entry.moodEmoji,
                  updatedAt: new Date(),
                }
              : entry
          ),
        }));
      },

      deleteEntry: (entryId: string) => {
        set(state => ({
          entries: state.entries.filter(entry => entry.id !== entryId),
          totalEntries: Math.max(0, state.totalEntries - 1),
        }));
      },

      setDraft: (content: string, mood?: string | null) => {
        set({ draftContent: content, draftMood: mood ?? null });
      },

      clearDraft: () => {
        set({ draftContent: '', draftMood: null });
      },

      getTodaysPrompt: () => {
        // Use date-based seed for consistent daily prompt
        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        const index = seed % JOURNAL_PROMPTS.length;
        return JOURNAL_PROMPTS[index];
      },

      getEntriesByDate: (date: Date) => {
        const targetDate = new Date(date);
        targetDate.setHours(0, 0, 0, 0);
        
        return get().entries.filter(entry => {
          const entryDate = new Date(entry.createdAt);
          entryDate.setHours(0, 0, 0, 0);
          return entryDate.getTime() === targetDate.getTime();
        });
      },

      getRecentEntries: (limit = 10) => {
        return get().entries.slice(0, limit);
      },

      hasJournaledToday: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return get().entries.some(entry => {
          const entryDate = new Date(entry.createdAt);
          entryDate.setHours(0, 0, 0, 0);
          return entryDate.getTime() === today.getTime();
        });
      },

      getJournalStats: () => {
        const state = get();
        const totalSparks = state.entries.reduce((sum, entry) => sum + entry.sparksEarned, 0);
        
        return {
          totalEntries: state.totalEntries,
          streak: state.journalStreak,
          totalSparks,
        };
      },
    }),
    {
      name: 'signroad-journal',
    }
  )
);
