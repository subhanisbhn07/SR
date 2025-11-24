import { create } from 'zustand';
import { Goal, SignLog, JournalEntry } from '../types/manifestation';
import { signAPI, journalAPI } from '../../../shared/services/api';

interface ManifestationState {
  goal: Goal | null;
  signLogs: SignLog[];
  journalEntries: JournalEntry[];
  isLoading: boolean;
  setGoal: (goal: Goal) => void;
  logSign: (signLog: Omit<SignLog, 'id' | 'loggedAt'>) => Promise<void>;
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => Promise<void>;
  updateJournalEntry: (id: string, content: string) => Promise<void>;
  deleteJournalEntry: (id: string) => Promise<void>;
  syncSignLogs: () => Promise<void>;
  syncJournalEntries: () => Promise<void>;
}

export const useManifestationStore = create<ManifestationState>((set) => ({
  goal: null,
  signLogs: [],
  journalEntries: [],
  isLoading: false,

  setGoal: (goal: Goal) => {
    set({ goal });
    // Store goal in localStorage for now (could be synced to backend later)
    localStorage.setItem('signroad_goal', JSON.stringify(goal));
  },

  logSign: async (signLog) => {
    // Create optimistic local entry
    const newSignLog: SignLog = {
      ...signLog,
      id: Date.now().toString(),
      loggedAt: new Date(),
    };

    set(state => ({
      signLogs: [...state.signLogs, newSignLog],
    }));

    // Sync with backend
    try {
      const backendSign = await signAPI.createSignLog({
        day_number: signLog.dayNumber,
        sign_name: signLog.signName,
        note: signLog.note,
        photo_base64: signLog.photoUrl, // Assuming photoUrl contains base64 data
      });

      // Update with backend ID
      set(state => ({
        signLogs: state.signLogs.map(log =>
          log.id === newSignLog.id
            ? { ...log, id: backendSign.id }
            : log
        ),
      }));
    } catch (error) {
      console.error('Failed to sync sign log with backend:', error);
      // Keep local entry even if sync fails
    }
  },

  addJournalEntry: async (entry) => {
    // Create optimistic local entry
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    set(state => ({
      journalEntries: [...state.journalEntries, newEntry],
    }));

    // Sync with backend
    try {
      const backendEntry = await journalAPI.createEntry({
        day_number: entry.dayNumber,
        content: entry.content,
        prompt: entry.prompt,
        is_public: entry.isPublic,
      });

      // Update with backend ID
      set(state => ({
        journalEntries: state.journalEntries.map(e =>
          e.id === newEntry.id
            ? { ...e, id: backendEntry.id }
            : e
        ),
      }));
    } catch (error) {
      console.error('Failed to sync journal entry with backend:', error);
      // Keep local entry even if sync fails
    }
  },

  updateJournalEntry: async (id, content) => {
    // Update local state first
    set(state => ({
      journalEntries: state.journalEntries.map(entry =>
        entry.id === id ? { ...entry, content } : entry
      ),
    }));

    // Sync with backend
    try {
      await journalAPI.updateEntry(id, content);
    } catch (error) {
      console.error('Failed to update journal entry on backend:', error);
      // Local update is preserved
    }
  },

  deleteJournalEntry: async (id) => {
    // Remove from local state first
    set(state => ({
      journalEntries: state.journalEntries.filter(entry => entry.id !== id),
    }));

    // Sync with backend
    try {
      await journalAPI.deleteEntry(id);
    } catch (error) {
      console.error('Failed to delete journal entry on backend:', error);
      // Local deletion is preserved
    }
  },

  syncSignLogs: async () => {
    set({ isLoading: true });
    try {
      const backendSigns = await signAPI.getUserSigns();
      
      // Map backend signs to frontend SignLog format
      const signs: SignLog[] = backendSigns.map(sign => ({
        id: sign.id,
        dayNumber: sign.day_number,
        signName: sign.sign_name,
        note: sign.note || '',
        photoUrl: sign.photo_url || undefined,
        loggedAt: new Date(sign.logged_at),
      }));
      
      set({ signLogs: signs, isLoading: false });
    } catch (error) {
      console.error('Failed to sync sign logs:', error);
      set({ isLoading: false });
    }
  },

  syncJournalEntries: async () => {
    set({ isLoading: true });
    try {
      const backendEntries = await journalAPI.getUserJournal();
      
      // Map backend entries to frontend JournalEntry format
      const entries: JournalEntry[] = backendEntries.map(entry => ({
        id: entry.id,
        dayNumber: entry.day_number,
        content: entry.content,
        prompt: entry.prompt,
        isPublic: entry.is_public,
        createdAt: new Date(entry.created_at),
      }));
      
      set({ journalEntries: entries, isLoading: false });
    } catch (error) {
      console.error('Failed to sync journal entries:', error);
      set({ isLoading: false });
    }
  },
}));
