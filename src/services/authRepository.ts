import { User } from '../shared/types/user';
import { storage } from './storage';
import { httpClient } from './httpClient';

const AUTH_TOKEN_KEY = 'auth_token';
const USER_KEY = 'user';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): User | null;
  saveUser(user: User): void;
  getAuthToken(): string | null;
  setAuthToken(token: string): void;
  clearAuth(): void;
}

const createMockUser = (email: string, mode: 'consumer' | 'enterprise'): User => ({
  id: '1',
  email,
  name: email.split('@')[0],
  mode,
  streak: 7,
  totalSessions: 42,
  joinedAt: new Date('2024-01-15'),
  preferences: {
    notifications: true,
    reminderTime: '09:00',
    focusAreas: ['mindfulness', 'productivity'],
    difficulty: 'intermediate',
  },
});

export const localAuthRepository: AuthRepository = {
  async login(credentials: LoginCredentials): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = createMockUser(credentials.email, 'consumer');
    this.saveUser(user);
    this.setAuthToken('mock_token_' + Date.now());
    
    return user;
  },

  async logout(): Promise<void> {
    this.clearAuth();
  },

  getCurrentUser(): User | null {
    return storage.get<User>(USER_KEY);
  },

  saveUser(user: User): void {
    storage.set(USER_KEY, user);
  },

  getAuthToken(): string | null {
    return storage.get<string>(AUTH_TOKEN_KEY);
  },

  setAuthToken(token: string): void {
    storage.set(AUTH_TOKEN_KEY, token);
  },

  clearAuth(): void {
    storage.remove(USER_KEY);
    storage.remove(AUTH_TOKEN_KEY);
  },
};

export const apiAuthRepository: AuthRepository = {
  async login(credentials: LoginCredentials): Promise<User> {
    const response = await httpClient.post<{ user: User; token: string }>('/auth/login', credentials);
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Login failed');
    }
    
    this.saveUser(response.data.user);
    this.setAuthToken(response.data.token);
    
    return response.data.user;
  },

  async logout(): Promise<void> {
    await httpClient.post('/auth/logout');
    this.clearAuth();
  },

  getCurrentUser(): User | null {
    return storage.get<User>(USER_KEY);
  },

  saveUser(user: User): void {
    storage.set(USER_KEY, user);
  },

  getAuthToken(): string | null {
    return storage.get<string>(AUTH_TOKEN_KEY);
  },

  setAuthToken(token: string): void {
    storage.set(AUTH_TOKEN_KEY, token);
  },

  clearAuth(): void {
    storage.remove(USER_KEY);
    storage.remove(AUTH_TOKEN_KEY);
  },
};

const USE_API = false;
export const authRepository: AuthRepository = USE_API ? apiAuthRepository : localAuthRepository;
