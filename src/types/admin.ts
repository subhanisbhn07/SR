// SignRoad Admin Panel Types

export interface AdminDashboardStats {
  totalUsers: number;
  activeToday: number;
  freeUsers: number;
  paidUsers: number;
  revenueToday: number;
  revenueMonth: number;
  completionRateDay14: number;
  freeToPaidConversion: number;
  avgSessionDuration: number;
  topSignsToday: { signName: string; count: number }[];
  tribeActivity: {
    totalTribes: number;
    activeTribestoday: number;
  };
}

export interface AdminUser {
  id: string;
  email: string;
  username: string;
  subscriptionTier: 'free' | 'seeker_monthly' | 'seeker_annual' | 'master_lifetime';
  currentDay: number;
  totalSparks: number;
  lanternBrightness: number;
  streakCount: number;
  tribeId: string | null;
  createdAt: Date;
}

export interface AdminContentDay {
  dayNumber: number;
  title: string;
  phase: string;
  durationMinutes: number;
  primarySign: string;
  unlockTier: 'free' | 'paid';
  isPublished: boolean;
  meditationAudioUrl: string | null;
  createdAt: Date;
}

export interface AdminSign {
  id: number;
  name: string;
  emoji: string;
  meaning: string;
  rarity: 'common' | 'rare' | 'mythic';
  unlockDay: number;
  category: string;
  isActive: boolean;
  timesLogged: number;
  avgReceiptShares: number;
}

export interface AdminTribe {
  id: string;
  name: string;
  memberCount: number;
  createdAt: Date;
  campfireCompletionRate: number;
  timezone: string;
  members: {
    userId: string;
    username: string;
    currentDay: number;
    lastActive: Date;
  }[];
}

export interface AdminAnalytics {
  retention: {
    cohortMonth: string;
    day1: number;
    day7: number;
    day14: number;
    day30: number;
    day60: number;
    day90: number;
  }[];
  conversion: {
    startedTrial: number;
    completedDay7: number;
    reachedDay14: number;
    convertedToPaid: number;
    conversionRate: number;
  };
  signs: {
    totalSignsLogged: number;
    mostPopularSigns: { signName: string; count: number }[];
    receiptsGenerated: number;
    receiptsShared: number;
    shareRate: number;
  };
}

// Mock data generators for admin panel
export function generateMockDashboardStats(): AdminDashboardStats {
  return {
    totalUsers: 12453,
    activeToday: 3421,
    freeUsers: 8234,
    paidUsers: 4219,
    revenueToday: 1234.56,
    revenueMonth: 45678.90,
    completionRateDay14: 42.5,
    freeToPaidConversion: 23.8,
    avgSessionDuration: 6.5,
    topSignsToday: [
      { signName: 'White Feather', count: 234 },
      { signName: '11:11', count: 189 },
      { signName: 'Blue Butterfly', count: 156 },
      { signName: 'Penny/Coin', count: 143 },
      { signName: 'Rainbow', count: 98 },
    ],
    tribeActivity: {
      totalTribes: 1556,
      activeTribestoday: 892,
    },
  };
}

export function generateMockAnalytics(): AdminAnalytics {
  return {
    retention: [
      { cohortMonth: '2025-01', day1: 100, day7: 42, day14: 35, day30: 28, day60: 22, day90: 18 },
      { cohortMonth: '2025-02', day1: 100, day7: 45, day14: 38, day30: 30, day60: 24, day90: 20 },
      { cohortMonth: '2025-03', day1: 100, day7: 48, day14: 40, day30: 32, day60: 26, day90: 22 },
    ],
    conversion: {
      startedTrial: 10000,
      completedDay7: 4200,
      reachedDay14: 3500,
      convertedToPaid: 835,
      conversionRate: 23.86,
    },
    signs: {
      totalSignsLogged: 156789,
      mostPopularSigns: [
        { signName: '11:11', count: 12345 },
        { signName: 'White Feather', count: 11234 },
        { signName: 'Penny/Coin', count: 9876 },
        { signName: 'Blue Butterfly', count: 8765 },
        { signName: 'Rainbow', count: 7654 },
      ],
      receiptsGenerated: 45678,
      receiptsShared: 12345,
      shareRate: 27.03,
    },
  };
}
