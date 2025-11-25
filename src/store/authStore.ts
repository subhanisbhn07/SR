import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  mode: 'consumer' | 'enterprise';
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchMode: (mode: 'consumer' | 'enterprise') => void;
  updateStreak: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  mode: 'consumer',
  
  login: async (email: string, password: string) => {
    void password;
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      mode: get().mode,
      streak: 7,
      totalSessions: 42,
      joinedAt: new Date('2024-01-15'),
      preferences: {
        notifications: true,
        reminderTime: '09:00',
        focusAreas: ['mindfulness', 'productivity'],
        difficulty: 'intermediate',
      },
    };
    
    set({ user: mockUser, isAuthenticated: true });
  },
  
  logout: () => {
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
}));
