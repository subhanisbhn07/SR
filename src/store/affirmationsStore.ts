import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserAffirmation } from '../types';

interface AffirmationsState {
  affirmations: UserAffirmation[];
  
  // Actions
  addAffirmation: (originalText: string, groundedText?: string, transformationRule?: string) => void;
  updateAffirmation: (id: string, updates: Partial<UserAffirmation>) => void;
  archiveAffirmation: (id: string) => void;
  deleteAffirmation: (id: string) => void;
  toggleActive: (id: string) => void;
  incrementShownCount: (id: string) => void;
  
  // Getters
  getActiveAffirmations: () => UserAffirmation[];
  getArchivedAffirmations: () => UserAffirmation[];
  getRandomActiveAffirmation: () => UserAffirmation | null;
}

export const useAffirmationsStore = create<AffirmationsState>()(
  persist(
    (set, get) => ({
      affirmations: [],
      
      addAffirmation: (originalText: string, groundedText?: string, transformationRule?: string) => {
        const newAffirmation: UserAffirmation = {
          id: `affirmation-${Date.now()}`,
          userId: 'current-user',
          originalText: originalText.slice(0, 100), // Max 100 characters
          groundedText: groundedText?.slice(0, 100),
          transformationRuleUsed: transformationRule,
          isActive: true,
          shownCount: 0,
          createdAt: new Date(),
        };
        
        set((state) => ({
          affirmations: [...state.affirmations, newAffirmation],
        }));
      },
      
      updateAffirmation: (id: string, updates: Partial<UserAffirmation>) => {
        set((state) => ({
          affirmations: state.affirmations.map((aff) =>
            aff.id === id ? { ...aff, ...updates } : aff
          ),
        }));
      },
      
      archiveAffirmation: (id: string) => {
        set((state) => ({
          affirmations: state.affirmations.map((aff) =>
            aff.id === id
              ? { ...aff, isActive: false, archivedAt: new Date() }
              : aff
          ),
        }));
      },
      
      deleteAffirmation: (id: string) => {
        set((state) => ({
          affirmations: state.affirmations.filter((aff) => aff.id !== id),
        }));
      },
      
      toggleActive: (id: string) => {
        set((state) => ({
          affirmations: state.affirmations.map((aff) =>
            aff.id === id
              ? {
                  ...aff,
                  isActive: !aff.isActive,
                  archivedAt: aff.isActive ? new Date() : undefined,
                }
              : aff
          ),
        }));
      },
      
      incrementShownCount: (id: string) => {
        set((state) => ({
          affirmations: state.affirmations.map((aff) =>
            aff.id === id ? { ...aff, shownCount: aff.shownCount + 1 } : aff
          ),
        }));
      },
      
      getActiveAffirmations: () => {
        return get().affirmations.filter((aff) => aff.isActive);
      },
      
      getArchivedAffirmations: () => {
        return get().affirmations.filter((aff) => !aff.isActive);
      },
      
      getRandomActiveAffirmation: () => {
        const active = get().getActiveAffirmations();
        if (active.length === 0) return null;
        
        // Weighted random: prefer less-shown affirmations
        const totalShown = active.reduce((sum, aff) => sum + aff.shownCount, 0);
        if (totalShown === 0) {
          return active[Math.floor(Math.random() * active.length)];
        }
        
        // Inverse weight: less shown = higher chance
        const weights = active.map((aff) => 1 / (aff.shownCount + 1));
        const totalWeight = weights.reduce((sum, w) => sum + w, 0);
        
        let random = Math.random() * totalWeight;
        for (let i = 0; i < active.length; i++) {
          random -= weights[i];
          if (random <= 0) return active[i];
        }
        
        return active[active.length - 1];
      },
    }),
    {
      name: 'signroad-affirmations',
      partialize: (state) => ({
        affirmations: state.affirmations,
      }),
    }
  )
);
