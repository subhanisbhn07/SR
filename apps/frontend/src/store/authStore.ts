import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, SubscriptionTier, SubscriptionStatus } from '../types';
import { api } from '../services/api';

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
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  fetchCurrentUser: () => Promise<void>;
  
  // User actions
  switchMode: (mode: 'consumer' | 'enterprise') => void;
  updateStreak: () => void;
  completeOnboarding: (roadId: string) => Promise<{ success: boolean; error?: string }>;
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

// Helper to convert API user to frontend User type
const mapApiUserToUser = (apiUser: any, mode: 'consumer' | 'enterprise' = 'consumer'): User => {
  return {
    id: apiUser.id,
    email: apiUser.email,
    name: apiUser.fullName || apiUser.email.split('@')[0],
    mode,
    streak: apiUser.streak || 0,
    totalSessions: apiUser.totalMeditationSessions || 0,
    joinedAt: new Date(apiUser.createdAt),
    preferences: {
      notifications: true,
      reminderTime: '09:00',
      focusAreas: ['mindfulness'],
      difficulty: 'beginner',
      preferredMessageTime: apiUser.preferredMessageTime || '08:00',
    },
    lanternHealth: apiUser.lanternBrightness || 100,
    sparks: apiUser.sparks || 0,
    currentRoadStep: apiUser.currentDay || 1,
    currentDay: apiUser.currentDay || 1,
    subscriptionTier: apiUser.subscriptionTier || 'free',
    subscriptionStatus: apiUser.subscriptionStatus || 'trial',
    trialEndsAt: apiUser.trialEndsAt ? new Date(apiUser.trialEndsAt) : undefined,
    timezone: apiUser.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
    onboardingCompleted: apiUser.onboardingCompleted || false,
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
        
        if (!email || !password) {
          set({ isLoading: false, error: 'Email and password required' });
          return { success: false, error: 'Email and password required' };
        }
        
        try {
          const response = await api.login(email, password);
          
          if (!response.success || !response.data) {
            const errorMsg = response.error?.message || 'Login failed';
            set({ isLoading: false, error: errorMsg });
            return { success: false, error: errorMsg };
          }
          
          const user = mapApiUserToUser(response.data.user, get().mode);
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false,
            hasCompletedOnboarding: user.onboardingCompleted,
          });
          
          return { success: true };
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Login failed';
          set({ isLoading: false, error: errorMsg });
          return { success: false, error: errorMsg };
        }
      },
      
      signUp: async (email: string, password: string, name?: string) => {
        set({ isLoading: true, error: null });
        
        if (!email || !password) {
          set({ isLoading: false, error: 'Email and password required' });
          return { success: false, error: 'Email and password required' };
        }
        
        if (password.length < 6) {
          set({ isLoading: false, error: 'Password must be at least 6 characters' });
          return { success: false, error: 'Password must be at least 6 characters' };
        }
        
        try {
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          const response = await api.signup(email, password, name || email.split('@')[0], timezone);
          
          if (!response.success || !response.data) {
            const errorMsg = response.error?.message || 'Signup failed';
            set({ isLoading: false, error: errorMsg });
            return { success: false, error: errorMsg };
          }
          
          const user = mapApiUserToUser(response.data.user, get().mode);
          
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false,
            hasCompletedOnboarding: false,
          });
          
          return { success: true };
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : 'Signup failed';
          set({ isLoading: false, error: errorMsg });
          return { success: false, error: errorMsg };
        }
      },
      
      logout: async () => {
        try {
          await api.logout();
        } catch (error) {
          console.error('Logout error:', error);
        }
        set({ 
          user: null, 
          isAuthenticated: false, 
          hasCompletedOnboarding: false,
          selectedRoad: null,
        });
      },
      
      resetPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        
        if (!email) {
          set({ isLoading: false, error: 'Email required' });
          return { success: false, error: 'Email required' };
        }
        
        // Password reset will be handled externally per user's request
        // For now, just simulate success
        set({ isLoading: false });
        return { success: true };
      },
      
      fetchCurrentUser: async () => {
        try {
          const response = await api.getMe();
          
          if (response.success && response.data) {
            const user = mapApiUserToUser(response.data.user, get().mode);
            set({ 
              user, 
              isAuthenticated: true,
              hasCompletedOnboarding: user.onboardingCompleted,
            });
          }
        } catch (error) {
          console.error('Failed to fetch current user:', error);
        }
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
      
      completeOnboarding: async (roadId: string) => {
        const { user } = get();
        
        if (!user) {
          return { success: false, error: 'Not authenticated' };
        }
        
        try {
          const response = await api.completeOnboarding({
            fullName: user.name,
            manifestationGoal: '',
            selectedRoad: roadId,
            intention: '',
            timezone: user.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
          });
          
          if (!response.success) {
            const errorMsg = response.error?.message || 'Failed to complete onboarding';
            return { success: false, error: errorMsg };
          }
          
          set({ 
            hasCompletedOnboarding: true, 
            selectedRoad: roadId,
            user: { ...user, onboardingCompleted: true },
          });
          
          return { success: true };
        } catch (error) {
          // Still update local state even if API fails
          set({ 
            hasCompletedOnboarding: true, 
            selectedRoad: roadId,
            user: { ...user, onboardingCompleted: true },
          });
          return { success: true };
        }
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
