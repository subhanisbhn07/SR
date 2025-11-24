import { create } from 'zustand';
import { User } from '../types';
import { SubscriptionTier } from '../shared/types/subscription';
import { authAPI, setAuthToken, getAuthToken } from '../shared/services/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  mode: 'consumer' | 'enterprise';
  subscriptionTier: SubscriptionTier;
  isLoading: boolean;
  isInitializingAuth: boolean;
  error: string | null;
  sessionExpired: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  switchMode: (mode: 'consumer' | 'enterprise') => void;
  updateStreak: () => void;
  updateSubscriptionTier: (tier: SubscriptionTier) => void;
  initializeAuth: () => Promise<void>;
  clearSessionExpired: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  mode: 'consumer',
  subscriptionTier: SubscriptionTier.WANDERER,
  isLoading: false,
  isInitializingAuth: false,
  error: null,
  sessionExpired: false,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await authAPI.login({ email, password });
      
      // Store the JWT token
      setAuthToken(response.access_token);
      
      // Map backend user to frontend User type
      const user: User = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        mode: get().mode,
        streak: response.user.streak,
        totalSessions: response.user.completed_days.length,
        joinedAt: new Date(),
        preferences: {
          notifications: response.user.settings.notifications ?? true,
          reminderTime: response.user.settings.reminderTime ?? '09:00',
          focusAreas: response.user.settings.focusAreas ?? ['mindfulness'],
          difficulty: response.user.settings.difficulty ?? 'intermediate',
        },
      };
      
      // Map subscription tier
      const tierMap: Record<string, SubscriptionTier> = {
        'wanderer': SubscriptionTier.WANDERER,
        'seeker': SubscriptionTier.SEEKER,
        'master': SubscriptionTier.MASTER,
      };
      
      set({ 
        user, 
        isAuthenticated: true,
        subscriptionTier: tierMap[response.user.subscription_tier] || SubscriptionTier.WANDERER,
        isLoading: false,
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false,
      });
      throw error;
    }
  },
  
  register: async (email: string, password: string, name: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await authAPI.register({ email, password, name });
      
      // Store the JWT token
      setAuthToken(response.access_token);
      
      // Map backend user to frontend User type
      const user: User = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        mode: get().mode,
        streak: response.user.streak,
        totalSessions: response.user.completed_days.length,
        joinedAt: new Date(),
        preferences: {
          notifications: true,
          reminderTime: '09:00',
          focusAreas: ['mindfulness'],
          difficulty: 'intermediate',
        },
      };
      
      set({ 
        user, 
        isAuthenticated: true,
        subscriptionTier: SubscriptionTier.WANDERER,
        isLoading: false,
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Registration failed',
        isLoading: false,
      });
      throw error;
    }
  },
  
  logout: () => {
    setAuthToken(null);
    set({ user: null, isAuthenticated: false, subscriptionTier: SubscriptionTier.WANDERER });
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
  
  updateSubscriptionTier: (tier: SubscriptionTier) => {
    set({ subscriptionTier: tier });
  },
  
  initializeAuth: async () => {
    const token = getAuthToken();
    
    if (!token) {
      set({ isInitializingAuth: false });
      return;
    }
    
    set({ isInitializingAuth: true, sessionExpired: false });
    
    try {
      const backendUser = await authAPI.getMe();
      
      const user: User = {
        id: backendUser.id,
        email: backendUser.email,
        name: backendUser.name,
        mode: get().mode,
        streak: backendUser.streak,
        totalSessions: backendUser.completed_days.length,
        joinedAt: new Date(),
        preferences: {
          notifications: backendUser.settings.notifications ?? true,
          reminderTime: backendUser.settings.reminderTime ?? '09:00',
          focusAreas: backendUser.settings.focusAreas ?? ['mindfulness'],
          difficulty: backendUser.settings.difficulty ?? 'intermediate',
        },
      };
      
      const tierMap: Record<string, SubscriptionTier> = {
        'wanderer': SubscriptionTier.WANDERER,
        'seeker': SubscriptionTier.SEEKER,
        'master': SubscriptionTier.MASTER,
      };
      
      set({ 
        user, 
        isAuthenticated: true,
        subscriptionTier: tierMap[backendUser.subscription_tier] || SubscriptionTier.WANDERER,
        isInitializingAuth: false,
      });
    } catch {
      // Token is invalid or expired, clear it and show message
      setAuthToken(null);
      set({ 
        user: null, 
        isAuthenticated: false,
        isInitializingAuth: false,
        sessionExpired: true,
      });
    }
  },
  
  clearSessionExpired: () => {
    set({ sessionExpired: false });
  },
}));
