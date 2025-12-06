import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Sign definitions - random items users can find
const SIGN_CATALOG = [
  { id: 'feather', label: 'White feather', emoji: '🪶' },
  { id: 'coin', label: 'Lucky coin', emoji: '🪙' },
  { id: 'butterfly', label: 'Butterfly', emoji: '🦋' },
  { id: 'rainbow', label: 'Rainbow', emoji: '🌈' },
  { id: 'ladybug', label: 'Ladybug', emoji: '🐞' },
  { id: 'four-leaf-clover', label: 'Four-leaf clover', emoji: '🍀' },
  { id: 'shooting-star', label: 'Shooting star', emoji: '⭐' },
  { id: 'red-door', label: 'Red door', emoji: '🚪' },
  { id: 'umbrella', label: 'Umbrella', emoji: '☂️' },
  { id: 'blue-bird', label: 'Blue bird', emoji: '🐦' },
  { id: 'sunflower', label: 'Sunflower', emoji: '🌻' },
  { id: 'heart-shape', label: 'Heart shape in nature', emoji: '💚' },
  { id: 'double-numbers', label: 'Double numbers (11:11, 22:22)', emoji: '🔢' },
  { id: 'dragonfly', label: 'Dragonfly', emoji: '🪰' },
  { id: 'owl', label: 'Owl', emoji: '🦉' },
];

export interface SignDefinition {
  id: string;
  label: string;
  emoji: string;
}

export interface ActiveSign {
  id: string;
  definitionId: string;
  label: string;
  emoji: string;
  assignedAt: string;
  foundAt?: string;
}

export interface Goal {
  id: string;
  title: string;
  createdAt: string;
  achievedAt?: string;
}

interface SignsGoalsState {
  activeSigns: ActiveSign[];
  foundSigns: ActiveSign[];
  goals: Goal[];
  
  // Sign actions
  assignInitialSigns: () => void;
  markSignFound: (signId: string) => void;
  maybeAssignNewSign: () => void;
  getRandomSign: () => SignDefinition;
  
  // Goal actions
  addGoal: (title: string) => void;
  markGoalAchieved: (goalId: string) => void;
  removeGoal: (goalId: string) => void;
  
  // Stats
  getTotalSignsFound: () => number;
  getActiveGoalsCount: () => number;
  getAchievedGoalsCount: () => number;
}

export const useSignsGoalsStore = create<SignsGoalsState>()(
  persist(
    (set, get) => ({
      activeSigns: [],
      foundSigns: [],
      goals: [],
      
      getRandomSign: () => {
        const { activeSigns, foundSigns } = get();
        const usedIds = [...activeSigns, ...foundSigns].map(s => s.definitionId);
        const available = SIGN_CATALOG.filter(s => !usedIds.includes(s.id));
        
        if (available.length === 0) {
          // If all signs have been used, reset and pick from full catalog
          return SIGN_CATALOG[Math.floor(Math.random() * SIGN_CATALOG.length)];
        }
        
        return available[Math.floor(Math.random() * available.length)];
      },
      
      assignInitialSigns: () => {
        const { activeSigns, getRandomSign } = get();
        
        // Only assign if no active signs
        if (activeSigns.length > 0) return;
        
        // Assign 1 initial sign
        const sign = getRandomSign();
        const newSign: ActiveSign = {
          id: `sign-${Date.now()}`,
          definitionId: sign.id,
          label: sign.label,
          emoji: sign.emoji,
          assignedAt: new Date().toISOString(),
        };
        
        set({ activeSigns: [newSign] });
      },
      
      markSignFound: (signId: string) => {
        const { activeSigns, foundSigns } = get();
        const signIndex = activeSigns.findIndex(s => s.id === signId);
        
        if (signIndex === -1) return;
        
        const foundSign = {
          ...activeSigns[signIndex],
          foundAt: new Date().toISOString(),
        };
        
        const newActiveSigns = activeSigns.filter(s => s.id !== signId);
        const newFoundSigns = [foundSign, ...foundSigns];
        
        set({ activeSigns: newActiveSigns, foundSigns: newFoundSigns });
        
        // Automatically assign a new sign after finding one
        get().maybeAssignNewSign();
      },
      
      maybeAssignNewSign: () => {
        const { activeSigns, getRandomSign } = get();
        
        // Max 3 active signs at a time
        if (activeSigns.length >= 3) return;
        
        const sign = getRandomSign();
        const newSign: ActiveSign = {
          id: `sign-${Date.now()}`,
          definitionId: sign.id,
          label: sign.label,
          emoji: sign.emoji,
          assignedAt: new Date().toISOString(),
        };
        
        set({ activeSigns: [...activeSigns, newSign] });
      },
      
      addGoal: (title: string) => {
        const { goals } = get();
        const newGoal: Goal = {
          id: `goal-${Date.now()}`,
          title,
          createdAt: new Date().toISOString(),
        };
        
        set({ goals: [newGoal, ...goals] });
      },
      
      markGoalAchieved: (goalId: string) => {
        const { goals } = get();
        const updatedGoals = goals.map(g => 
          g.id === goalId 
            ? { ...g, achievedAt: new Date().toISOString() }
            : g
        );
        
        set({ goals: updatedGoals });
      },
      
      removeGoal: (goalId: string) => {
        const { goals } = get();
        set({ goals: goals.filter(g => g.id !== goalId) });
      },
      
      getTotalSignsFound: () => {
        return get().foundSigns.length;
      },
      
      getActiveGoalsCount: () => {
        return get().goals.filter(g => !g.achievedAt).length;
      },
      
      getAchievedGoalsCount: () => {
        return get().goals.filter(g => g.achievedAt).length;
      },
    }),
    {
      name: 'signroad-signs-goals',
    }
  )
);
