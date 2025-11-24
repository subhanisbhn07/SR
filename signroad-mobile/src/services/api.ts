// API Client for SignRoad Mobile App
// Connects to backend at https://app-lnhrftkp.fly.dev

import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://app-lnhrftkp.fly.dev';

let authToken: string | null = null;

export const setAuthToken = async (token: string | null) => {
  authToken = token;
  if (token) {
    await AsyncStorage.setItem('signroad_auth_token', token);
  } else {
    await AsyncStorage.removeItem('signroad_auth_token');
  }
};

export const getAuthToken = async (): Promise<string | null> => {
  if (!authToken) {
    authToken = await AsyncStorage.getItem('signroad_auth_token');
  }
  return authToken;
};

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = await getAuthToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Request failed' }));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }

  return response.json();
}

// Types
export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    id: string;
    email: string;
    name: string;
    is_admin: boolean;
    subscription_tier: string;
    current_day: number;
    completed_days: number[];
    streak: number;
    lantern_health: number;
    sparks: number;
    settings: Record<string, unknown>;
  };
}

export interface UserProgress {
  current_day: number;
  completed_days: number[];
  lantern_health: number;
  sparks: number;
  streak: number;
}

export interface SignLog {
  id: string;
  day_number: number;
  sign_name: string;
  note: string;
  photo_url?: string;
  logged_at: string;
}

export interface JournalEntry {
  id: string;
  day_number: number;
  content: string;
  created_at: string;
  updated_at: string;
}

// Auth API
export const authAPI = {
  register: (data: RegisterData) =>
    apiRequest<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: LoginData) =>
    apiRequest<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getMe: () => apiRequest<AuthResponse['user']>('/api/auth/me'),
};

// User API
export const userAPI = {
  getProgress: () => apiRequest<UserProgress>('/api/users/progress'),
  
  updateProgress: (data: { day_number: number; completed: boolean }) =>
    apiRequest<UserProgress>('/api/users/progress', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Sign API
export const signAPI = {
  getUserSigns: () => apiRequest<SignLog[]>('/api/signs'),
  
  createSignLog: (data: {
    day_number: number;
    sign_name: string;
    note?: string;
    photo_base64?: string;
  }) =>
    apiRequest<SignLog>('/api/signs', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Journal API
export const journalAPI = {
  getUserEntries: () => apiRequest<JournalEntry[]>('/api/journal'),
  
  createEntry: (data: { day_number: number; content: string }) =>
    apiRequest<JournalEntry>('/api/journal', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  updateEntry: (entryId: string, data: { content: string }) =>
    apiRequest<JournalEntry>(`/api/journal/${entryId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  deleteEntry: (entryId: string) =>
    apiRequest<{ message: string }>(`/api/journal/${entryId}`, {
      method: 'DELETE',
    }),
};
