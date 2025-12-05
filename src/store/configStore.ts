import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ConfigState {
  freeTrialDays: number;
  setFreeTrialDays: (days: number) => void;
}

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      freeTrialDays: 7, // Default to 7 days, can be changed via admin
      setFreeTrialDays: (days: number) => {
        set({ freeTrialDays: days });
      },
    }),
    {
      name: 'signroad-config',
    }
  )
);
