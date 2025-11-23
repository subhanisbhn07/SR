export type CosmeticCategory = 'avatar' | 'lantern' | 'badge' | 'frame';

export interface CosmeticItem {
  id: string;
  name: string;
  description: string;
  category: CosmeticCategory;
  sparkPrice: number;
  isPremium: boolean;
  imageUrl: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface UserCosmetics {
  ownedItems: string[];
  equippedAvatar: string | null;
  equippedLantern: string | null;
  equippedBadge: string | null;
  equippedFrame: string | null;
}
