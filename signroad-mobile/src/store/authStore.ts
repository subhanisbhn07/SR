import { create } from 'zustand';
import { authAPI, setAuthToken, getAuthToken, AuthResponse } from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  subscriptionTier: string;
  currentDay: number;
  completedDays: number[];
  streak: number;
  lanternHealth: number;
  sparks: number;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const response = await authAPI.login({ email, password });
      
      // Store the JWT token
      await setAuthToken(response.access_token);
      
      // Map backend user to frontend User type
      const user: User = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        isAdmin: response.user.is_admin,
        subscriptionTier: response.user.subscription_tier,
        currentDay: response.user.current_day,
        completedDays: response.user.completed_days,
        streak: response.user.streak,
        lanternHealth: response.user.lantern_health,
        sparks: response.user.sparks,
      };
      
      set({ 
        user, 
        isAuthenticated: true,
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
      await setAuthToken(response.access_token);
      
      // Map backend user to frontend User type
      const user: User = {
        id: response.user.id,
        email: response.user.email,
        name: response.user.name,
        isAdmin: response.user.is_admin,
        subscriptionTier: response.user.subscription_tier,
        currentDay: response.user.current_day,
        completedDays: response.user.completed_days,
        streak: response.user.streak,
        lanternHealth: response.user.lantern_health,
        sparks: response.user.sparks,
      };
      
      set({ 
        user, 
        isAuthenticated: true,
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

  logout: async () => {
    await setAuthToken(null);
    set({ user: null, isAuthenticated: false });
  },

  initializeAuth: async () => {
    const token = await getAuthToken();
    
    if (!token) {
      return;
    }
    
    try {
      const backendUser = await authAPI.getMe();
      
      const user: User = {
        id: backendUser.id,
        email: backendUser.email,
        name: backendUser.name,
        isAdmin: backendUser.is_admin,
        subscriptionTier: backendUser.subscription_tier,
        currentDay: backendUser.current_day,
        completedDays: backendUser.completed_days,
        streak: backendUser.streak,
        lanternHealth: backendUser.lantern_health,
        sparks: backendUser.sparks,
      };
      
      set({ 
        user, 
        isAuthenticated: true,
      });
    } catch {
      // Token is invalid, clear it
      await setAuthToken(null);
      set({ user: null, isAuthenticated: false });
    }
  },
}));
