import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Lantern health constants
export const LANTERN_MAX_HEALTH = 100;
export const LANTERN_DIM_THRESHOLD = 50;
export const LANTERN_CRITICAL_THRESHOLD = 25;
export const LANTERN_DAILY_DECAY = 10; // Health lost per missed day
export const LANTERN_MEDITATION_BOOST = 15; // Health gained per meditation
export const LANTERN_SIGN_BOOST = 5; // Health gained per sign logged

// Streak constants
export const STREAK_GRACE_HOURS = 36; // Hours before streak starts dimming (forgiving)

interface GamificationState {
  // Lantern
  lanternHealth: number;
  lastLanternUpdate: string | null;

  // Streak
  streakDays: number;
  lastActivityDate: string | null;
  streakStartDate: string | null;

  // Sparks (currency)
  sparks: number;
  totalSparksEarned: number;

  // Stats
  totalSignsLogged: number;
  totalMeditationsCompleted: number;
  longestStreak: number;

  // Actions
  updateLanternHealth: (change: number) => void;
  checkAndApplyDailyDecay: () => void;
  recordActivity: () => void;
  addSparks: (amount: number, source: string) => void;
  spendSparks: (amount: number) => boolean;
  incrementSignsLogged: () => void;
  incrementMeditationsCompleted: () => void;
  getLanternStatus: () => 'bright' | 'dim' | 'critical' | 'extinguished';
  getStreakStatus: () => 'active' | 'at_risk' | 'broken';
  resetStreak: () => void;
}

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      // Initial state
      lanternHealth: LANTERN_MAX_HEALTH,
      lastLanternUpdate: null,
      streakDays: 0,
      lastActivityDate: null,
      streakStartDate: null,
      sparks: 0,
      totalSparksEarned: 0,
      totalSignsLogged: 0,
      totalMeditationsCompleted: 0,
      longestStreak: 0,

      // Update lantern health (clamped between 0 and 100)
      updateLanternHealth: (change: number) => {
        set(state => ({
          lanternHealth: Math.max(0, Math.min(LANTERN_MAX_HEALTH, state.lanternHealth + change)),
          lastLanternUpdate: new Date().toISOString(),
        }));
      },

      // Check and apply daily decay if user missed a day
      checkAndApplyDailyDecay: () => {
        const { lastActivityDate, lanternHealth } = get();
        
        if (!lastActivityDate) return;

        const lastActivity = new Date(lastActivityDate);
        const now = new Date();
        const hoursSinceActivity = (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60);

        // If more than grace period has passed, apply decay
        if (hoursSinceActivity > STREAK_GRACE_HOURS) {
          const daysMissed = Math.floor((hoursSinceActivity - STREAK_GRACE_HOURS) / 24);
          const decay = daysMissed * LANTERN_DAILY_DECAY;
          
          if (decay > 0 && lanternHealth > 0) {
            set(state => ({
              lanternHealth: Math.max(0, state.lanternHealth - decay),
              lastLanternUpdate: now.toISOString(),
            }));
          }
        }
      },

      // Record user activity (meditation or sign logging)
      recordActivity: () => {
        const { lastActivityDate, streakDays, streakStartDate, longestStreak } = get();
        const now = new Date();
        const today = now.toISOString().split('T')[0];

        // Check if this is a new day
        const lastDate = lastActivityDate ? new Date(lastActivityDate).toISOString().split('T')[0] : null;
        
        if (lastDate === today) {
          // Already recorded activity today, just update timestamp
          set({ lastActivityDate: now.toISOString() });
          return;
        }

        // Check if streak continues or breaks
        let newStreakDays = streakDays;
        let newStreakStartDate = streakStartDate;

        if (lastActivityDate) {
          const lastActivity = new Date(lastActivityDate);
          const hoursSinceActivity = (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60);

          if (hoursSinceActivity <= STREAK_GRACE_HOURS) {
            // Streak continues
            newStreakDays = streakDays + 1;
          } else {
            // Streak broken, start new one
            newStreakDays = 1;
            newStreakStartDate = now.toISOString();
          }
        } else {
          // First activity ever
          newStreakDays = 1;
          newStreakStartDate = now.toISOString();
        }

        // Update longest streak if needed
        const newLongestStreak = Math.max(longestStreak, newStreakDays);

        set({
          lastActivityDate: now.toISOString(),
          streakDays: newStreakDays,
          streakStartDate: newStreakStartDate,
          longestStreak: newLongestStreak,
        });
      },

      // Add sparks (currency)
      addSparks: (amount: number) => {
        set(state => ({
          sparks: state.sparks + amount,
          totalSparksEarned: state.totalSparksEarned + amount,
        }));
      },

      // Spend sparks (returns false if insufficient)
      spendSparks: (amount: number) => {
        const { sparks } = get();
        if (sparks < amount) return false;
        
        set(state => ({
          sparks: state.sparks - amount,
        }));
        return true;
      },

      // Increment signs logged counter
      incrementSignsLogged: () => {
        set(state => ({
          totalSignsLogged: state.totalSignsLogged + 1,
        }));
        // Also boost lantern health
        get().updateLanternHealth(LANTERN_SIGN_BOOST);
        // Record activity for streak
        get().recordActivity();
      },

      // Increment meditations completed counter
      incrementMeditationsCompleted: () => {
        set(state => ({
          totalMeditationsCompleted: state.totalMeditationsCompleted + 1,
        }));
        // Also boost lantern health
        get().updateLanternHealth(LANTERN_MEDITATION_BOOST);
        // Record activity for streak
        get().recordActivity();
      },

      // Get lantern status based on health
      getLanternStatus: () => {
        const { lanternHealth } = get();
        if (lanternHealth <= 0) return 'extinguished';
        if (lanternHealth < LANTERN_CRITICAL_THRESHOLD) return 'critical';
        if (lanternHealth < LANTERN_DIM_THRESHOLD) return 'dim';
        return 'bright';
      },

      // Get streak status
      getStreakStatus: () => {
        const { lastActivityDate, streakDays } = get();
        
        if (streakDays === 0 || !lastActivityDate) return 'broken';

        const lastActivity = new Date(lastActivityDate);
        const now = new Date();
        const hoursSinceActivity = (now.getTime() - lastActivity.getTime()) / (1000 * 60 * 60);

        if (hoursSinceActivity > STREAK_GRACE_HOURS) return 'broken';
        if (hoursSinceActivity > 24) return 'at_risk';
        return 'active';
      },

      // Reset streak (for testing or admin)
      resetStreak: () => {
        set({
          streakDays: 0,
          lastActivityDate: null,
          streakStartDate: null,
        });
      },
    }),
    {
      name: 'signroad-gamification-storage',
    }
  )
);

// Helper function to get lantern color based on health
export const getLanternColor = (health: number): string => {
  if (health <= 0) return '#374151'; // Gray - extinguished
  if (health < LANTERN_CRITICAL_THRESHOLD) return '#ef4444'; // Red - critical
  if (health < LANTERN_DIM_THRESHOLD) return '#f59e0b'; // Amber - dim
  return '#10b981'; // Emerald - bright
};

// Helper function to get lantern glow intensity
export const getLanternGlow = (health: number): number => {
  return Math.max(0, health / 100);
};
