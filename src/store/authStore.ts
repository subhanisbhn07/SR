import { create } from 'zustand';
import { User } from '../types';
import { 
  userStorage, 
  initializeUserFromStorage, 
  PersistedUser 
} from '../services/storage';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  mode: 'consumer' | 'enterprise';
  lanternHealth: number;
  currencySparks: number;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  switchMode: (mode: 'consumer' | 'enterprise') => void;
  updateStreak: () => void;
  updateLanternHealth: (delta: number) => void;
  earnSparks: (amount: number, reason: string) => void;
}

// Helper to convert persisted user to full User type
const createUserFromPersisted = (persisted: PersistedUser, mode: 'consumer' | 'enterprise'): User => ({
  id: persisted.id,
  email: persisted.email,
  name: persisted.name,
  mode,
  streak: persisted.streak,
  totalSessions: persisted.totalSessions,
  joinedAt: new Date(),
  preferences: {
    notifications: true,
    reminderTime: '09:00',
    focusAreas: ['mindfulness', 'productivity'],
    difficulty: 'intermediate',
  },
});

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  mode: 'consumer',
  lanternHealth: 100,
  currencySparks: 0,
  
    login: async (email: string, password: string) => {
      // Simulate API call - password will be used when backend is integrated
      void password;
      await new Promise(resolve => setTimeout(resolve, 1000));
    
      // Initialize or retrieve user from localStorage
    const persistedUser = initializeUserFromStorage(email, email.split('@')[0]);
    const user = createUserFromPersisted(persistedUser, get().mode);
    
    set({ 
      user, 
      isAuthenticated: true,
      lanternHealth: persistedUser.lanternHealth,
      currencySparks: persistedUser.currencySparks,
    });
  },
  
  logout: () => {
    // Note: We don't clear storage on logout to preserve progress
    // Use clearAllStorage() if you want to reset everything
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
    const { user, lanternHealth } = get();
    if (user) {
      const newStreak = user.streak + 1;
      // Brighten lantern when maintaining streak (gain 5 health per session, max 100)
      const newLanternHealth = Math.min(100, lanternHealth + 5);
      
      set({ 
        user: { ...user, streak: newStreak },
        lanternHealth: newLanternHealth,
      });
      
      // Persist to localStorage
      userStorage.updateStreak(newStreak);
      userStorage.updateLanternHealth(newLanternHealth);
    }
  },
  
  updateLanternHealth: (delta: number) => {
    const { lanternHealth } = get();
    const newHealth = Math.max(0, Math.min(100, lanternHealth + delta));
    set({ lanternHealth: newHealth });
    userStorage.updateLanternHealth(newHealth);
  },
  
  earnSparks: (amount: number, reason: string) => {
    const { currencySparks } = get();
    const newTotal = currencySparks + amount;
    set({ currencySparks: newTotal });
    userStorage.addSparks(amount);
    console.log(`Earned ${amount} Sparks: ${reason}. Total: ${newTotal}`);
  },
}));
