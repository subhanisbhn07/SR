export interface HallOfFameEntry {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  daysCompleted: number;
  joinedDate: Date;
  completionDate: Date;
  totalSparks: number;
  totalXP: number;
  achievements: string[];
  testimonial?: string;
  rank: number;
}

export interface HallOfFameStats {
  totalMasters: number;
  averageCompletionTime: number;
  mostPopularGoal: string;
  totalJourneyDays: number;
}
