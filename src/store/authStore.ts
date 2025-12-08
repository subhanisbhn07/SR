import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getSupabase } from '../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

// App-level user type (extends Supabase user with app-specific fields)
export interface AppUser {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  mode: 'consumer' | 'enterprise';
  streak_days: number;
  total_sessions: number;
  lantern_health: number;
  sparks: number;
  current_road_step: number;
  selected_road: string | null;
  tribe_id: string | null;
  subscription_status: 'free' | 'trial' | 'active' | 'cancelled' | 'expired';
  trial_ends_at: string | null;
  last_meditation_at: string | null;
  timezone: string | null;
  created_at: string;
  updated_at: string;
}

// Legacy User type for backward compatibility
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  mode: 'consumer' | 'enterprise';
  streak: number;
  totalSessions: number;
  joinedAt: Date;
  preferences: {
    notifications: boolean;
    reminderTime: string;
    focusAreas: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
  };
  lanternHealth: number;
  sparks: number;
  currentRoadStep: number;
  tribeId?: string;
}

// Convert AppUser to legacy User format for backward compatibility
const toLegacyUser = (appUser: AppUser): User => ({
  id: appUser.id,
  email: appUser.email,
  name: appUser.name || appUser.email.split('@')[0],
  avatar: appUser.avatar_url || undefined,
  mode: appUser.mode,
  streak: appUser.streak_days,
  totalSessions: appUser.total_sessions,
  joinedAt: new Date(appUser.created_at),
  preferences: {
    notifications: true,
    reminderTime: '09:00',
    focusAreas: ['mindfulness', 'productivity'],
    difficulty: 'intermediate',
  },
  lanternHealth: appUser.lantern_health,
  sparks: appUser.sparks,
  currentRoadStep: appUser.current_road_step,
  tribeId: appUser.tribe_id || undefined,
});

interface AuthState {
  user: User | null;
  appUser: AppUser | null;
  supabaseUser: SupabaseUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  mode: 'consumer' | 'enterprise';
  hasCompletedOnboarding: boolean;
  selectedRoad: string | null;
  
  // Auth actions
  signUp: (email: string, password: string, name?: string) => Promise<{ success: boolean; error?: string; needsVerification?: boolean }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password: string) => Promise<void>; // Legacy alias
  signOut: () => Promise<void>;
  logout: () => void; // Legacy alias
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
  
  // Session management
  initializeAuth: () => Promise<void>;
  refreshSession: () => Promise<void>;
  
  // User profile actions
  updateProfile: (updates: Partial<AppUser>) => Promise<{ success: boolean; error?: string }>;
  switchMode: (mode: 'consumer' | 'enterprise') => void;
  completeOnboarding: (roadId: string) => Promise<void>;
  updateStreak: () => void; // Legacy
  
  // Gamification actions
  addSparks: (amount: number, source: string, sourceId?: string) => Promise<void>;
  updateLanternHealth: (health: number) => Promise<void>;
  incrementStreak: () => Promise<void>;
  completeMeditation: () => Promise<void>;
  
  // Utility
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

// Mock user for when Supabase is not configured
const createMockAppUser = (email: string, name?: string): AppUser => ({
  id: 'mock-' + Date.now(),
  email,
  name: name || email.split('@')[0],
  avatar_url: null,
  mode: 'consumer',
  streak_days: 0,
  total_sessions: 0,
  lantern_health: 100,
  sparks: 0,
  current_road_step: 1,
  selected_road: null,
  tribe_id: null,
  subscription_status: 'trial',
  trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  last_meditation_at: null,
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      appUser: null,
      supabaseUser: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      mode: 'consumer',
      hasCompletedOnboarding: false,
      selectedRoad: null,

      signUp: async (email: string, password: string, name?: string) => {
        set({ isLoading: true, error: null });
        
        const supabase = getSupabase();
        
        if (!supabase) {
          // Mock mode - create local user
          const mockAppUser = createMockAppUser(email, name);
          const mockUser = toLegacyUser(mockAppUser);
          set({ 
            appUser: mockAppUser,
            user: mockUser, 
            isAuthenticated: true, 
            isLoading: false,
            hasCompletedOnboarding: false,
          });
          return { success: true, needsVerification: false };
        }

        try {
          // Real Supabase signup
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: { name },
              emailRedirectTo: `${window.location.origin}/auth/callback`,
            },
          });

          if (error) {
            set({ error: error.message, isLoading: false });
            return { success: false, error: error.message };
          }

          if (data.user && !data.user.email_confirmed_at) {
            set({ isLoading: false });
            return { success: true, needsVerification: true };
          }

          // Create user profile in database
          if (data.user) {
            const newAppUser: AppUser = {
              id: data.user.id,
              email: data.user.email || email,
              name: name || null,
              avatar_url: null,
              mode: 'consumer',
              streak_days: 0,
              total_sessions: 0,
              lantern_health: 100,
              sparks: 0,
              current_road_step: 1,
              selected_road: null,
              tribe_id: null,
              subscription_status: 'trial',
              trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
              last_meditation_at: null,
              timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            };

            // Insert user into database
            const { error: insertError } = await supabase
              .from('users')
              .insert(newAppUser);

            if (insertError) {
              console.error('Error creating user profile:', insertError);
            }

            set({ 
              appUser: newAppUser,
              user: toLegacyUser(newAppUser), 
              supabaseUser: data.user,
              isAuthenticated: true, 
              isLoading: false,
              hasCompletedOnboarding: false,
            });
          }

          return { success: true };
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Signup failed';
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      signIn: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        
        const supabase = getSupabase();
        
        if (!supabase) {
          // Mock mode - create local user
          const mockAppUser = createMockAppUser(email);
          const mockUser = toLegacyUser(mockAppUser);
          set({ 
            appUser: mockAppUser,
            user: mockUser, 
            isAuthenticated: true, 
            isLoading: false,
          });
          return { success: true };
        }

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            set({ error: error.message, isLoading: false });
            return { success: false, error: error.message };
          }

          if (data.user) {
            // Fetch user profile from database
            const { data: userData, error: userError } = await supabase
              .from('users')
              .select('*')
              .eq('id', data.user.id)
              .single();

            if (userError || !userData) {
              // User exists in auth but not in database - create profile
              const newAppUser: AppUser = {
                id: data.user.id,
                email: data.user.email || email,
                name: data.user.user_metadata?.name || null,
                avatar_url: null,
                mode: 'consumer',
                streak_days: 0,
                total_sessions: 0,
                lantern_health: 100,
                sparks: 0,
                current_road_step: 1,
                selected_road: null,
                tribe_id: null,
                subscription_status: 'trial',
                trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
                last_meditation_at: null,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              };

              await supabase.from('users').insert(newAppUser);
              
              set({ 
                appUser: newAppUser,
                user: toLegacyUser(newAppUser), 
                supabaseUser: data.user,
                isAuthenticated: true, 
                isLoading: false,
                hasCompletedOnboarding: !!newAppUser.selected_road,
                selectedRoad: newAppUser.selected_road,
              });
            } else {
              const appUser = userData as AppUser;
              set({ 
                appUser,
                user: toLegacyUser(appUser), 
                supabaseUser: data.user,
                isAuthenticated: true, 
                isLoading: false,
                hasCompletedOnboarding: !!appUser.selected_road,
                selectedRoad: appUser.selected_road,
              });
            }
          }

          return { success: true };
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Login failed';
          set({ error: errorMessage, isLoading: false });
          return { success: false, error: errorMessage };
        }
      },

      // Legacy login method - wraps signIn
      login: async (email: string, password: string) => {
        await get().signIn(email, password);
      },

      signOut: async () => {
        set({ isLoading: true });
        
        const supabase = getSupabase();
        
        if (supabase) {
          await supabase.auth.signOut();
        }
        
        set({ 
          user: null,
          appUser: null, 
          supabaseUser: null,
          isAuthenticated: false, 
          isLoading: false,
          hasCompletedOnboarding: false,
          selectedRoad: null,
        });
      },

      // Legacy logout method
      logout: () => {
        get().signOut();
      },

      resetPassword: async (email: string) => {
        const supabase = getSupabase();
        
        if (!supabase) {
          return { success: false, error: 'Supabase not configured. Please configure in Admin Settings.' };
        }

        try {
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
          });

          if (error) {
            return { success: false, error: error.message };
          }

          return { success: true };
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Password reset failed';
          return { success: false, error: errorMessage };
        }
      },

      updatePassword: async (newPassword: string) => {
        const supabase = getSupabase();
        
        if (!supabase) {
          return { success: false, error: 'Supabase not configured' };
        }

        try {
          const { error } = await supabase.auth.updateUser({
            password: newPassword,
          });

          if (error) {
            return { success: false, error: error.message };
          }

          return { success: true };
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Password update failed';
          return { success: false, error: errorMessage };
        }
      },

      initializeAuth: async () => {
        set({ isLoading: true });
        
        const supabase = getSupabase();
        
        if (!supabase) {
          set({ isLoading: false });
          return;
        }

        try {
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session?.user) {
            const { data: userData } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (userData) {
              const appUser = userData as AppUser;
              set({ 
                appUser,
                user: toLegacyUser(appUser), 
                supabaseUser: session.user,
                isAuthenticated: true,
                hasCompletedOnboarding: !!appUser.selected_road,
                selectedRoad: appUser.selected_road,
              });
            }
          }
        } catch (err) {
          console.error('Error initializing auth:', err);
        }
        
        set({ isLoading: false });
      },

      refreshSession: async () => {
        const supabase = getSupabase();
        
        if (!supabase) return;

        try {
          const { data: { session } } = await supabase.auth.refreshSession();
          
          if (session?.user) {
            set({ supabaseUser: session.user });
          }
        } catch (err) {
          console.error('Error refreshing session:', err);
        }
      },

      updateProfile: async (updates: Partial<AppUser>) => {
        const { appUser } = get();
        if (!appUser) return { success: false, error: 'Not authenticated' };

        const supabase = getSupabase();
        
        const updatedAppUser = { ...appUser, ...updates, updated_at: new Date().toISOString() };
        
        if (supabase) {
          try {
            const { error } = await supabase
              .from('users')
              .update(updates)
              .eq('id', appUser.id);

            if (error) {
              return { success: false, error: error.message };
            }
          } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Update failed';
            return { success: false, error: errorMessage };
          }
        }

        set({ appUser: updatedAppUser, user: toLegacyUser(updatedAppUser) });
        return { success: true };
      },

      switchMode: (mode) => {
        set({ mode });
        const { appUser } = get();
        if (appUser) {
          get().updateProfile({ mode });
        }
      },

      // Legacy updateStreak
      updateStreak: () => {
        get().incrementStreak();
      },

      completeOnboarding: async (roadId: string) => {
        const { appUser } = get();
        
        set({ hasCompletedOnboarding: true, selectedRoad: roadId });
        
        if (appUser) {
          await get().updateProfile({ selected_road: roadId });
        }
      },

      addSparks: async (amount: number, source: string, sourceId?: string) => {
        const { appUser } = get();
        if (!appUser) return;

        const newSparks = appUser.sparks + amount;
        const supabase = getSupabase();

        if (supabase) {
          // Log transaction
          await supabase.from('sparks_transactions').insert({
            user_id: appUser.id,
            amount,
            source: source as 'meditation' | 'sign_found' | 'tribe_bonus' | 'milestone' | 'purchase' | 'admin',
            source_id: sourceId || null,
            balance_after: newSparks,
          });
        }

        await get().updateProfile({ sparks: newSparks });
      },

      updateLanternHealth: async (health: number) => {
        const clampedHealth = Math.max(0, Math.min(100, health));
        await get().updateProfile({ lantern_health: clampedHealth });
      },

      incrementStreak: async () => {
        const { appUser } = get();
        if (!appUser) return;

        await get().updateProfile({ 
          streak_days: appUser.streak_days + 1,
          last_meditation_at: new Date().toISOString(),
        });
      },

      completeMeditation: async () => {
        const { appUser } = get();
        if (!appUser) return;

        const supabase = getSupabase();

        // Update user stats
        await get().updateProfile({
          total_sessions: appUser.total_sessions + 1,
          current_road_step: appUser.current_road_step + 1,
          last_meditation_at: new Date().toISOString(),
          lantern_health: Math.min(100, appUser.lantern_health + 5),
        });

        // Add sparks for meditation
        await get().addSparks(10, 'meditation');

        // Log meditation session
        if (supabase) {
          await supabase.from('meditation_sessions').insert({
            user_id: appUser.id,
            road_step: appUser.current_road_step,
            completion_percentage: 100,
            sparks_earned: 10,
            completed_at: new Date().toISOString(),
          });
        }
      },

      clearError: () => set({ error: null }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: 'signroad-auth',
      partialize: (state) => ({
        user: state.user,
        appUser: state.appUser,
        isAuthenticated: state.isAuthenticated,
        mode: state.mode,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        selectedRoad: state.selectedRoad,
      }),
    }
  )
);
