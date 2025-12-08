import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Manifested Win interface for global feed
export interface ManifestedWin {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  description: string;
  category: 'career' | 'health' | 'relationships' | 'wealth' | 'personal' | 'spiritual' | 'other';
  manifestedAt: Date;
  daysOnRoad: number; // How many days they were on the road before manifesting
  likes: number;
  isLikedByUser: boolean;
  isCurrentUser: boolean;
  isHallOfFame: boolean; // Hall of Fame Master status
}

// Category labels and colors
export const WIN_CATEGORIES: Record<ManifestedWin['category'], { label: string; emoji: string; color: string }> = {
  career: { label: 'Career', emoji: '💼', color: 'text-blue-500' },
  health: { label: 'Health', emoji: '💪', color: 'text-green-500' },
  relationships: { label: 'Relationships', emoji: '❤️', color: 'text-pink-500' },
  wealth: { label: 'Wealth', emoji: '💰', color: 'text-yellow-500' },
  personal: { label: 'Personal Growth', emoji: '🌱', color: 'text-emerald-500' },
  spiritual: { label: 'Spiritual', emoji: '✨', color: 'text-purple-500' },
  other: { label: 'Other', emoji: '🎯', color: 'text-neutral-500' },
};

// Mock data for global feed
const createMockWins = (): ManifestedWin[] => [
  {
    id: 'win-1',
    userId: 'user-a',
    userName: 'Jessica M.',
    title: 'Got my dream job!',
    description: 'After 45 days on the road, I manifested my dream position at a tech company. The signs were everywhere - I kept seeing 11:11 and finding feathers on my walks.',
    category: 'career',
    manifestedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    daysOnRoad: 45,
    likes: 127,
    isLikedByUser: false,
    isCurrentUser: false,
    isHallOfFame: true,
  },
  {
    id: 'win-2',
    userId: 'user-b',
    userName: 'Michael R.',
    title: 'Reconnected with my father',
    description: 'We hadn\'t spoken in 3 years. On day 21, I found the courage to reach out. He called me back the same day.',
    category: 'relationships',
    manifestedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    daysOnRoad: 21,
    likes: 89,
    isLikedByUser: true,
    isCurrentUser: false,
    isHallOfFame: false,
  },
  {
    id: 'win-3',
    userId: 'user-c',
    userName: 'Sarah K.',
    title: 'Paid off all my debt',
    description: 'Started the road with $15k in debt. Through manifestation and aligned action, I received an unexpected inheritance and freelance opportunities.',
    category: 'wealth',
    manifestedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    daysOnRoad: 90,
    likes: 234,
    isLikedByUser: false,
    isCurrentUser: false,
    isHallOfFame: true,
  },
  {
    id: 'win-4',
    userId: 'user-d',
    userName: 'David L.',
    title: 'Lost 30 pounds naturally',
    description: 'No crash diets, just aligned intentions and listening to my body. The meditation sessions helped me understand my relationship with food.',
    category: 'health',
    manifestedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    daysOnRoad: 60,
    likes: 156,
    isLikedByUser: false,
    isCurrentUser: false,
    isHallOfFame: false,
  },
  {
    id: 'win-5',
    userId: 'user-e',
    userName: 'Emma T.',
    title: 'Found inner peace after anxiety',
    description: 'Struggled with anxiety for years. The daily signs and meditation practice transformed my mindset. I finally feel at peace.',
    category: 'spiritual',
    manifestedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    daysOnRoad: 30,
    likes: 198,
    isLikedByUser: true,
    isCurrentUser: false,
    isHallOfFame: true,
  },
];

interface ManifestedWinsState {
  // Global feed
  wins: ManifestedWin[];
  
  // User's own wins
  userWins: ManifestedWin[];
  
  // Filter state
  selectedCategory: ManifestedWin['category'] | 'all';
  
  // Actions
  addWin: (title: string, description: string, category: ManifestedWin['category']) => ManifestedWin;
  likeWin: (winId: string) => void;
  unlikeWin: (winId: string) => void;
  deleteWin: (winId: string) => void;
  setCategory: (category: ManifestedWin['category'] | 'all') => void;
  getFilteredWins: () => ManifestedWin[];
  getHallOfFameWins: () => ManifestedWin[];
  getUserWins: () => ManifestedWin[];
  getTotalLikes: () => number;
}

export const useManifestedWinsStore = create<ManifestedWinsState>()(
  persist(
    (set, get) => ({
      wins: createMockWins(),
      userWins: [],
      selectedCategory: 'all',

      addWin: (title: string, description: string, category: ManifestedWin['category']) => {
        const newWin: ManifestedWin = {
          id: `win-${Date.now()}`,
          userId: 'current-user',
          userName: 'You',
          title,
          description,
          category,
          manifestedAt: new Date(),
          daysOnRoad: 0, // Would be calculated from user's journey start date
          likes: 0,
          isLikedByUser: false,
          isCurrentUser: true,
          isHallOfFame: false,
        };

        set(state => ({
          wins: [newWin, ...state.wins],
          userWins: [newWin, ...state.userWins],
        }));

        return newWin;
      },

      likeWin: (winId: string) => {
        set(state => ({
          wins: state.wins.map(win =>
            win.id === winId
              ? { ...win, likes: win.likes + 1, isLikedByUser: true }
              : win
          ),
        }));
      },

      unlikeWin: (winId: string) => {
        set(state => ({
          wins: state.wins.map(win =>
            win.id === winId && win.isLikedByUser
              ? { ...win, likes: Math.max(0, win.likes - 1), isLikedByUser: false }
              : win
          ),
        }));
      },

      deleteWin: (winId: string) => {
        set(state => ({
          wins: state.wins.filter(win => win.id !== winId || !win.isCurrentUser),
          userWins: state.userWins.filter(win => win.id !== winId),
        }));
      },

      setCategory: (category: ManifestedWin['category'] | 'all') => {
        set({ selectedCategory: category });
      },

      getFilteredWins: () => {
        const state = get();
        if (state.selectedCategory === 'all') {
          return state.wins;
        }
        return state.wins.filter(win => win.category === state.selectedCategory);
      },

      getHallOfFameWins: () => {
        return get().wins.filter(win => win.isHallOfFame);
      },

      getUserWins: () => {
        return get().userWins;
      },

      getTotalLikes: () => {
        return get().userWins.reduce((sum, win) => sum + win.likes, 0);
      },
    }),
    {
      name: 'signroad-manifested-wins',
    }
  )
);
