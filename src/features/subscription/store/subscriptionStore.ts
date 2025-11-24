import { create } from 'zustand';
import { SubscriptionTier } from '../../../shared/types/subscription';

interface SubscriptionState {
  tier: SubscriptionTier;
  isSubscribed: boolean;
  subscriptionStartDate: Date | null;
  subscriptionEndDate: Date | null;
  
  // Actions
  setTier: (tier: SubscriptionTier) => void;
  subscribe: (tier: SubscriptionTier) => void;
  unsubscribe: () => void;
  checkSubscriptionStatus: () => boolean;
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  tier: 'wanderer',
  isSubscribed: false,
  subscriptionStartDate: null,
  subscriptionEndDate: null,
  
  setTier: (tier) => {
    set({ tier, isSubscribed: tier === 'seeker' });
  },
  
  subscribe: (tier) => {
    const now = new Date();
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1); // 1 year subscription
    
    set({
      tier,
      isSubscribed: true,
      subscriptionStartDate: now,
      subscriptionEndDate: endDate,
    });
  },
  
  unsubscribe: () => {
    set({
      tier: 'wanderer',
      isSubscribed: false,
      subscriptionStartDate: null,
      subscriptionEndDate: null,
    });
  },
  
  checkSubscriptionStatus: () => {
    const state = get();
    if (!state.isSubscribed || !state.subscriptionEndDate) {
      return false;
    }
    
    const now = new Date();
    const isActive = now < state.subscriptionEndDate;
    
    if (!isActive) {
      // Subscription expired, unsubscribe
      get().unsubscribe();
      return false;
    }
    
    return true;
  },
}));
