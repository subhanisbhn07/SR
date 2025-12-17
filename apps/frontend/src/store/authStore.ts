import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, SubscriptionTier, SubscriptionStatus } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  mode: 'consumer' | 'enterprise';
  hasCompletedOnboarding: boolean;
  selectedRoad: string | null;
  
  // Auth actions
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, name?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  
  // User actions
  switchMode: (mode: 'consumer' | 'enterprise') => void;
  updateStreak: () => void;
  completeOnboarding: (roadId: string) => void;
  updateUser: (updates: Partial<User>) => void;
  
  // Gamification actions
  addSparks: (amount: number) => void;
  updateLanternHealth: (health: number) => void;
  completeMeditation: () => void;
  
  // Subscription actions
  updateSubscription: (tier: SubscriptionTier, status: SubscriptionStatus) => void;
  startTrial: () => void;
  
  // Utility
  clearError: () => void;
}

// Create mock user with PRD-compliant fields
const createMockUser = (email: string, name?: string, mode: 'consumer' | 'enterprise' = 'consumer'): User => {
  const trialEnd = new Date();
  trialEnd.setDate(trialEnd.getDate() + 14); // PRD: 14-day free trial
  
  return {
    id: 'user-' + Date.now(),
    email,
    name: name || email.split('@')[0],
    mode,
    streak: 0,
    totalSessions: 0,
    joinedAt: new Date(),
    preferences: {
      notifications: true,
      reminderTime: '09:00',
      focusAreas: ['mindfulness'],
      difficulty: 'beginner',
      preferredMessageTime: '08:00',
    },
    lanternHealth: 100, // PRD: Start at 100%
    sparks: 0,
    currentRoadStep: 1,
    currentDay: 1,
    subscriptionTier: 'free',
    subscriptionStatus: 'trial',
    trialEndsAt: trialEnd,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    onboardingCompleted: false,
  };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      mode: 'consumer',
      hasCompletedOnboarding: false,
      selectedRoad: null,
      
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // For demo: accept any email/password
        if (!email || !password) {
          set({ isLoading: false, error: 'Email and password required' });
          return { success: false, error: 'Email and password required' };
        }
        
        const mockUser = createMockUser(email, undefined, get().mode);
        // Simulate returning user with some progress
        mockUser.streak = 7;
        mockUser.totalSessions = 42;
        mockUser.sparks = 245;
        mockUser.lanternHealth = 82;
        mockUser.currentRoadStep = 12;
        mockUser.currentDay = 12;
        mockUser.onboardingCompleted = true;
        
        set({ 
          user: mockUser, 
          isAuthenticated: true, 
          isLoading: false,
          hasCompletedOnboarding: true,
        });
        
        return { success: true };
      },
      
      signUp: async (email: string, password: string, name?: string) => {
        set({ isLoading: true, error: null });
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (!email || !password) {
          set({ isLoading: false, error: 'Email and password required' });
          return { success: false, error: 'Email and password required' };
        }
        
        if (password.length < 6) {
          set({ isLoading: false, error: 'Password must be at least 6 characters' });
          return { success: false, error: 'Password must be at least 6 characters' };
        }
        
        const newUser = createMockUser(email, name, get().mode);
        
        set({ 
          user: newUser, 
          isAuthenticated: true, 
          isLoading: false,
          hasCompletedOnboarding: false,
        });
        
        return { success: true };
      },
      
      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false, 
          hasCompletedOnboarding: false,
          selectedRoad: null,
        });
      },
      
      resetPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (!email) {
          set({ isLoading: false, error: 'Email required' });
          return { success: false, error: 'Email required' };
        }
        
        set({ isLoading: false });
        return { success: true };
      },
      
      switchMode: (mode) => {
        set({ mode });
        const { user } = get();
        if (user) {
          set({ user: { ...user, mode } });
        }
      },
      
      updateStreak: () => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, streak: user.streak + 1 } });
        }
      },
      
      completeOnboarding: (roadId: string) => {
        const { user } = get();
        set({ 
          hasCompletedOnboarding: true, 
          selectedRoad: roadId,
          user: user ? { ...user, onboardingCompleted: true } : null,
        });
      },
      
      updateUser: (updates: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },
      
      addSparks: (amount: number) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, sparks: user.sparks + amount } });
        }
      },
      
      updateLanternHealth: (health: number) => {
        const { user } = get();
        if (user) {
          const clampedHealth = Math.max(0, Math.min(100, health));
          set({ user: { ...user, lanternHealth: clampedHealth } });
        }
      },
      
      completeMeditation: () => {
        const { user } = get();
        if (user) {
          set({ 
            user: { 
              ...user, 
              totalSessions: user.totalSessions + 1,
              currentRoadStep: user.currentRoadStep + 1,
              currentDay: user.currentDay + 1,
              sparks: user.sparks + 10, // PRD: +10 sparks per meditation
              lanternHealth: Math.min(100, user.lanternHealth + 5),
              lastMeditationDate: new Date(),
            } 
          });
        }
      },
      
      updateSubscription: (tier: SubscriptionTier, status: SubscriptionStatus) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, subscriptionTier: tier, subscriptionStatus: status } });
        }
      },
      
      startTrial: () => {
        const { user } = get();
        if (user) {
          const trialEnd = new Date();
          trialEnd.setDate(trialEnd.getDate() + 14); // PRD: 14-day free trial
          set({ 
            user: { 
              ...user, 
              subscriptionStatus: 'trial',
              trialEndsAt: trialEnd,
            } 
          });
        }
      },
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'signroad-auth',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        mode: state.mode,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        selectedRoad: state.selectedRoad,
      }),
    }
  )
);
