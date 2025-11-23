import { create } from 'zustand';
import { HallOfFameEntry, HallOfFameStats } from '../../../shared/types/hallOfFame';

interface HallOfFameState {
  entries: HallOfFameEntry[];
  stats: HallOfFameStats;
  isLoading: boolean;
  error: string | null;
  fetchEntries: () => Promise<void>;
}

const mockEntries: HallOfFameEntry[] = [
  {
    id: '1',
    userId: 'user-1',
    userName: 'Sarah Chen',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    daysCompleted: 365,
    joinedDate: new Date('2024-01-01'),
    completionDate: new Date('2024-12-31'),
    totalSparks: 18250,
    totalXP: 36500,
    achievements: ['First Week', 'First Month', 'First Quarter', 'First Year', 'Master'],
    testimonial: 'This journey transformed my life. Every day brought new insights and growth.',
    rank: 1,
  },
  {
    id: '2',
    userId: 'user-2',
    userName: 'Marcus Johnson',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    daysCompleted: 365,
    joinedDate: new Date('2024-02-15'),
    completionDate: new Date('2025-02-14'),
    totalSparks: 17890,
    totalXP: 35780,
    achievements: ['First Week', 'First Month', 'First Quarter', 'First Year', 'Master'],
    testimonial: 'The signs became clearer each day. I found what I was looking for.',
    rank: 2,
  },
  {
    id: '3',
    userId: 'user-3',
    userName: 'Elena Rodriguez',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    daysCompleted: 365,
    joinedDate: new Date('2024-03-01'),
    completionDate: new Date('2025-02-28'),
    totalSparks: 19100,
    totalXP: 38200,
    achievements: ['First Week', 'First Month', 'First Quarter', 'First Year', 'Master', 'Perfect Streak'],
    testimonial: 'A year of daily practice changed everything. The universe truly speaks.',
    rank: 3,
  },
];

const mockStats: HallOfFameStats = {
  totalMasters: 127,
  averageCompletionTime: 372,
  mostPopularGoal: 'Inner Peace',
  totalJourneyDays: 46355,
};

export const useHallOfFameStore = create<HallOfFameState>((set) => ({
  entries: [],
  stats: mockStats,
  isLoading: false,
  error: null,

  fetchEntries: async () => {
    set({ isLoading: true, error: null });
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ entries: mockEntries, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load Hall of Fame',
        isLoading: false 
      });
    }
  },
}));
