import { create } from 'zustand';
import { User } from '../types';
import { api } from '../services/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  mode: 'consumer' | 'enterprise';
  hasCompletedOnboarding: boolean;
  selectedRoad: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  switchMode: (mode: 'consumer' | 'enterprise') => void;
  updateStreak: () => void;
  completeOnboarding: (roadId: string) => void;
  checkAuth: () => Promise<void>;
  updateUserStats: (sparks: number, lanternHealth: number) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  mode: 'consumer',
  hasCompletedOnboarding: false,
  selectedRoad: null,
  isLoading: true,
  
  login: async (email: string, password: string) => {
    try {
      const response = await api.login(email, password);
      const backendUser = response.user;
      
      const user: User = {
        id: backendUser.id,
        email: backendUser.email,
        name: backendUser.name,
        mode: get().mode,
        streak: backendUser.streak_days,
        totalSessions: 0,
        joinedAt: new Date(),
        preferences: {
          notifications: true,
          reminderTime: '09:00',
          focusAreas: ['mindfulness', 'productivity'],
          difficulty: 'intermediate',
        },
        lanternHealth: backendUser.lantern_health,
        sparks: backendUser.sparks,
        currentRoadStep: 1,
        subscriptionStatus: backendUser.subscription_status,
        trialEndsAt: backendUser.trial_ends_at,
      };
      
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (email: string, password: string, name: string) => {
    try {
      const response = await api.register(email, password, name);
      const backendUser = response.user;
      
      const user: User = {
        id: backendUser.id,
        email: backendUser.email,
        name: backendUser.name,
        mode: get().mode,
        streak: backendUser.streak_days,
        totalSessions: 0,
        joinedAt: new Date(),
        preferences: {
          notifications: true,
          reminderTime: '09:00',
          focusAreas: ['mindfulness', 'productivity'],
          difficulty: 'intermediate',
        },
        lanternHealth: backendUser.lantern_health,
        sparks: backendUser.sparks,
        currentRoadStep: 1,
        subscriptionStatus: backendUser.subscription_status,
        trialEndsAt: backendUser.trial_ends_at,
      };
      
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  
  logout: () => {
    api.logout();
    set({ user: null, isAuthenticated: false });
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
    set({ hasCompletedOnboarding: true, selectedRoad: roadId });
  },

  checkAuth: async () => {
    if (!api.isAuthenticated()) {
      set({ isLoading: false });
      return;
    }
    
    try {
      const backendUser = await api.getMe();
      
      const user: User = {
        id: backendUser.id,
        email: backendUser.email,
        name: backendUser.name,
        mode: get().mode,
        streak: backendUser.streak_days,
        totalSessions: 0,
        joinedAt: new Date(),
        preferences: {
          notifications: true,
          reminderTime: '09:00',
          focusAreas: ['mindfulness', 'productivity'],
          difficulty: 'intermediate',
        },
        lanternHealth: backendUser.lantern_health,
        sparks: backendUser.sparks,
        currentRoadStep: 1,
        subscriptionStatus: backendUser.subscription_status,
        trialEndsAt: backendUser.trial_ends_at,
      };
      
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      api.logout();
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  updateUserStats: (sparks: number, lanternHealth: number) => {
    const { user } = get();
    if (user) {
      set({ 
        user: { 
          ...user, 
          sparks: user.sparks + sparks, 
          lanternHealth: Math.min(100, user.lanternHealth + lanternHealth) 
        } 
      });
    }
  },
}));
