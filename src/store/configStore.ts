import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../services/api';

// Card visibility settings per device type
export interface CardVisibility {
  desktop: boolean;
  tablet: boolean;
  mobile: boolean;
}

// All homepage cards that can be toggled
export interface CardVisibilitySettings {
  heroCarousel: CardVisibility;
  todayCard: CardVisibility;
  sparksRewards: CardVisibility;
  tribesCard: CardVisibility;
  latestWin: CardVisibility;
  manifestedWins: CardVisibility;
  personalGreeting: CardVisibility;
  exploreByIntention: CardVisibility;
  startYourJourney: CardVisibility;
  whatOthersLove: CardVisibility;
  editorsPicks: CardVisibility;
  userStories: CardVisibility;
  blogSection: CardVisibility;
  newsletterSignup: CardVisibility;
}

interface ConfigState {
  freeTrialDays: number;
  setFreeTrialDays: (days: number) => void;
  cardVisibility: CardVisibilitySettings;
  setCardVisibility: (cardId: keyof CardVisibilitySettings, device: keyof CardVisibility, visible: boolean) => void;
  resetCardVisibility: () => void;
  isLoading: boolean;
  loadedFromBackend: boolean;
  loadFromBackend: () => Promise<void>;
}

// Default: all cards visible on all devices
const defaultCardVisibility: CardVisibilitySettings = {
  heroCarousel: { desktop: true, tablet: true, mobile: true },
  todayCard: { desktop: true, tablet: true, mobile: true },
  sparksRewards: { desktop: true, tablet: true, mobile: true },
  tribesCard: { desktop: true, tablet: true, mobile: true },
  latestWin: { desktop: true, tablet: true, mobile: true },
  manifestedWins: { desktop: true, tablet: true, mobile: true },
  personalGreeting: { desktop: true, tablet: true, mobile: true },
  exploreByIntention: { desktop: true, tablet: true, mobile: true },
  startYourJourney: { desktop: true, tablet: true, mobile: true },
  whatOthersLove: { desktop: true, tablet: true, mobile: true },
  editorsPicks: { desktop: true, tablet: true, mobile: true },
  userStories: { desktop: true, tablet: true, mobile: true },
  blogSection: { desktop: true, tablet: true, mobile: true },
  newsletterSignup: { desktop: true, tablet: true, mobile: true },
};

export const useConfigStore = create<ConfigState>()(
  persist(
    (set) => ({
      freeTrialDays: 7, // Default to 7 days, can be changed via admin
      setFreeTrialDays: (days: number) => {
        set({ freeTrialDays: days });
      },
      cardVisibility: defaultCardVisibility,
      setCardVisibility: (cardId: keyof CardVisibilitySettings, device: keyof CardVisibility, visible: boolean) => {
        set((state) => ({
          cardVisibility: {
            ...state.cardVisibility,
            [cardId]: {
              ...state.cardVisibility[cardId],
              [device]: visible,
            },
          },
        }));
      },
      resetCardVisibility: () => {
        set({ cardVisibility: defaultCardVisibility });
      },
      isLoading: false,
      loadedFromBackend: false,
      loadFromBackend: async () => {
        set({ isLoading: true });
        try {
          const response = await api.getAppSettings();
          const { free_trial_days, card_visibility } = response.settings;
          set({
            freeTrialDays: free_trial_days,
            cardVisibility: card_visibility as CardVisibilitySettings,
            loadedFromBackend: true,
            isLoading: false,
          });
        } catch (error) {
          console.error('Failed to load settings from backend, using defaults:', error);
          // Keep existing/default values if backend fails
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'signroad-config',
    }
  )
);
