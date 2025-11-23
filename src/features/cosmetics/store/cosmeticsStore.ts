import { create } from 'zustand';
import { UserCosmetics } from '../types/cosmetics';

interface CosmeticsState {
  userCosmetics: UserCosmetics;
  purchaseItem: (itemId: string, sparkCost: number) => boolean;
  equipItem: (itemId: string, category: 'avatar' | 'lantern' | 'badge' | 'frame') => void;
  unequipItem: (category: 'avatar' | 'lantern' | 'badge' | 'frame') => void;
  hasItem: (itemId: string) => boolean;
}

export const useCosmeticsStore = create<CosmeticsState>((set, get) => ({
  userCosmetics: {
    ownedItems: [],
    equippedAvatar: null,
    equippedLantern: null,
    equippedBadge: null,
    equippedFrame: null,
  },

  purchaseItem: (itemId) => {
    const { userCosmetics } = get();
    
    if (userCosmetics.ownedItems.includes(itemId)) {
      return false;
    }

    set((state) => ({
      userCosmetics: {
        ...state.userCosmetics,
        ownedItems: [...state.userCosmetics.ownedItems, itemId],
      },
    }));

    return true;
  },

  equipItem: (itemId, category) => {
    const { userCosmetics } = get();
    
    if (!userCosmetics.ownedItems.includes(itemId)) {
      return;
    }

    const equipKey = `equipped${category.charAt(0).toUpperCase() + category.slice(1)}` as keyof UserCosmetics;
    
    set((state) => ({
      userCosmetics: {
        ...state.userCosmetics,
        [equipKey]: itemId,
      },
    }));
  },

  unequipItem: (category) => {
    const equipKey = `equipped${category.charAt(0).toUpperCase() + category.slice(1)}` as keyof UserCosmetics;
    
    set((state) => ({
      userCosmetics: {
        ...state.userCosmetics,
        [equipKey]: null,
      },
    }));
  },

  hasItem: (itemId) => {
    const { userCosmetics } = get();
    return userCosmetics.ownedItems.includes(itemId);
  },
}));
