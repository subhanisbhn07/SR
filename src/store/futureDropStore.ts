import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { FutureDrop, FutureDropTrigger } from '../types';

interface FutureDropState {
  drops: FutureDrop[];
  pendingDelivery: FutureDrop | null;
  lastPromptDate: Date | null;
  
  // Actions
  addDrop: (messageText: string, triggerContext: FutureDropTrigger, relatedSignId?: string) => void;
  getDeliverableDrops: () => FutureDrop[];
  markDelivered: (dropId: string) => void;
  skipDrop: (dropId: string) => void;
  deleteDrop: (dropId: string) => void;
  setPendingDelivery: (drop: FutureDrop | null) => void;
  setLastPromptDate: (date: Date) => void;
  
  // Helpers
  shouldShowPrompt: (currentDay: number, lanternHealth: number, hasRareSign: boolean, hasRekindled: boolean) => FutureDropTrigger | null;
  getDaysAgo: (date: Date) => number;
}

// Calculate delivery date based on trigger context
const calculateDeliveryDate = (trigger: FutureDropTrigger): Date => {
  const now = new Date();
  let daysToAdd = 21; // Default: 21 days later
  
  switch (trigger) {
    case 'day_7':
      daysToAdd = 23; // Show around day 30
      break;
    case 'day_14':
      daysToAdd = 16; // Show around day 30
      break;
    case 'day_30':
      daysToAdd = 30; // Show around day 60
      break;
    case 'rare_sign':
      daysToAdd = 14; // Show 2 weeks later
      break;
    case 'rekindle':
      daysToAdd = 7; // Show 1 week later (for next potential gap)
      break;
    case 'milestone':
      daysToAdd = 21; // Show 3 weeks later
      break;
    case 'manual':
      daysToAdd = 14; // Show 2 weeks later for manual entries
      break;
  }
  
  const deliveryDate = new Date(now);
  deliveryDate.setDate(deliveryDate.getDate() + daysToAdd);
  return deliveryDate;
};

// Prompt copy based on trigger context
export const getPromptCopy = (trigger: FutureDropTrigger): { title: string; subtitle: string } => {
  switch (trigger) {
    case 'day_7':
      return {
        title: 'Write one sentence for the you walking Day 30.',
        subtitle: 'Your future self will thank you for this moment of clarity.',
      };
    case 'day_14':
      return {
        title: 'Your trial is ending. What do you want to remember?',
        subtitle: 'Capture this feeling before it fades.',
      };
    case 'day_30':
      return {
        title: 'You made it to Day 30. What wisdom would you share?',
        subtitle: 'Write something for the you on Day 60.',
      };
    case 'rare_sign':
      return {
        title: 'This moment matters. What do you want to remember?',
        subtitle: 'Rare signs deserve to be remembered.',
      };
    case 'rekindle':
      return {
        title: 'You came back. Write something for next time you hesitate.',
        subtitle: 'Your future self might need this reminder.',
      };
    case 'milestone':
      return {
        title: 'You reached a milestone. What got you here?',
        subtitle: 'Capture this feeling for when the road gets hard.',
      };
    case 'manual':
      return {
        title: 'Write a message to your future self.',
        subtitle: 'It will arrive in 2 weeks when you need it most.',
      };
    default:
      return {
        title: 'Write a message to your future self.',
        subtitle: 'It will arrive when you need it most.',
      };
  }
};

export const useFutureDropStore = create<FutureDropState>()(
  persist(
    (set, get) => ({
      drops: [],
      pendingDelivery: null,
      lastPromptDate: null,
      
      addDrop: (messageText: string, triggerContext: FutureDropTrigger, relatedSignId?: string) => {
        const newDrop: FutureDrop = {
          id: `drop-${Date.now()}`,
          userId: 'current-user', // Will be replaced with actual user ID
          messageText: messageText.slice(0, 140), // Max 140 characters
          triggerContext,
          relatedSignId,
          writtenAt: new Date(),
          deliverAfter: calculateDeliveryDate(triggerContext),
          delivered: false,
        };
        
        set((state) => ({
          drops: [...state.drops, newDrop],
          lastPromptDate: new Date(),
        }));
      },
      
      getDeliverableDrops: () => {
        const { drops } = get();
        const now = new Date();
        
        return drops.filter(
          (drop) => !drop.delivered && !drop.skipped && new Date(drop.deliverAfter) <= now
        );
      },
      
      markDelivered: (dropId: string) => {
        set((state) => ({
          drops: state.drops.map((drop) =>
            drop.id === dropId
              ? { ...drop, delivered: true, deliveredAt: new Date() }
              : drop
          ),
          pendingDelivery: null,
        }));
      },
      
      skipDrop: (dropId: string) => {
        set((state) => ({
          drops: state.drops.map((drop) =>
            drop.id === dropId ? { ...drop, skipped: true } : drop
          ),
          pendingDelivery: null,
        }));
      },
      
      deleteDrop: (dropId: string) => {
        set((state) => ({
          drops: state.drops.filter((drop) => drop.id !== dropId),
        }));
      },
      
      setPendingDelivery: (drop: FutureDrop | null) => {
        set({ pendingDelivery: drop });
      },
      
      setLastPromptDate: (date: Date) => {
        set({ lastPromptDate: date });
      },
      
      shouldShowPrompt: (currentDay: number, lanternHealth: number, hasRareSign: boolean, hasRekindled: boolean): FutureDropTrigger | null => {
        const { lastPromptDate } = get();
        
        // Max 1 prompt per week
        if (lastPromptDate) {
          const daysSinceLastPrompt = Math.floor(
            (Date.now() - new Date(lastPromptDate).getTime()) / (1000 * 60 * 60 * 24)
          );
          if (daysSinceLastPrompt < 7) return null;
        }
        
        // Priority order for triggers
        if (hasRekindled) return 'rekindle';
        if (hasRareSign) return 'rare_sign';
        if (currentDay === 7) return 'day_7';
        if (currentDay === 14) return 'day_14';
        if (currentDay === 30) return 'day_30';
        if (currentDay % 30 === 0 && currentDay > 30) return 'milestone';
        
        return null;
      },
      
      getDaysAgo: (date: Date): number => {
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
      },
    }),
    {
      name: 'signroad-future-drops',
      partialize: (state) => ({
        drops: state.drops,
        lastPromptDate: state.lastPromptDate,
      }),
    }
  )
);
