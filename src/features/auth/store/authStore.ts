import { create } from 'zustand';
import { User } from '../../../shared/types/user';
import { authRepository } from '../../../services/authRepository';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  mode: 'consumer' | 'enterprise';
  
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchMode: (mode: 'consumer' | 'enterprise') => void;
  updateStreak: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: authRepository.getCurrentUser(),
  isAuthenticated: !!authRepository.getAuthToken(),
  isLoading: false,
  error: null,
  mode: 'consumer',
  
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      const user = await authRepository.login({ email, password });
      set({ 
        user, 
        isAuthenticated: true, 
        isLoading: false,
        mode: user.mode,
      });
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Login failed',
      });
      throw error;
    }
  },
  
  logout: () => {
    authRepository.logout();
    set({ user: null, isAuthenticated: false });
  },
  
  switchMode: (mode) => {
    set({ mode });
    const { user } = get();
    if (user) {
      const updatedUser = { ...user, mode };
      authRepository.saveUser(updatedUser);
      set({ user: updatedUser });
    }
  },
  
  updateStreak: () => {
    const { user } = get();
    if (user) {
      const updatedUser = { ...user, streak: user.streak + 1 };
      authRepository.saveUser(updatedUser);
      set({ user: updatedUser });
    }
  },
  
  clearError: () => {
    set({ error: null });
  },
}));
