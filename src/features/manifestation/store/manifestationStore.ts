import { create } from 'zustand';
import { Goal, SignLog, JournalEntry } from '../types/manifestation';

interface ManifestationState {
  goal: Goal | null;
  signLogs: SignLog[];
  journalEntries: JournalEntry[];
  setGoal: (goal: Goal) => void;
  logSign: (signLog: Omit<SignLog, 'id' | 'loggedAt'>) => void;
  addJournalEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => void;
  updateJournalEntry: (id: string, content: string) => void;
  deleteJournalEntry: (id: string) => void;
}

export const useManifestationStore = create<ManifestationState>((set) => ({
  goal: null,
  signLogs: [],
  journalEntries: [],

  setGoal: (goal: Goal) => {
    set({ goal });
  },

  logSign: (signLog) => {
    const newSignLog: SignLog = {
      ...signLog,
      id: Date.now().toString(),
      loggedAt: new Date(),
    };

    set(state => ({
      signLogs: [...state.signLogs, newSignLog],
    }));
  },

  addJournalEntry: (entry) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString(),
      createdAt: new Date(),
    };

    set(state => ({
      journalEntries: [...state.journalEntries, newEntry],
    }));
  },

  updateJournalEntry: (id, content) => {
    set(state => ({
      journalEntries: state.journalEntries.map(entry =>
        entry.id === id ? { ...entry, content } : entry
      ),
    }));
  },

  deleteJournalEntry: (id) => {
    set(state => ({
      journalEntries: state.journalEntries.filter(entry => entry.id !== id),
    }));
  },
}));
