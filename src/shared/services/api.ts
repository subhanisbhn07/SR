/**
 * API Client for SignRoad Backend
 * Handles all HTTP requests to the FastAPI backend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://app-lnhrftkp.fly.dev';

// Token management
let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    localStorage.setItem('signroad_auth_token', token);
  } else {
    localStorage.removeItem('signroad_auth_token');
  }
};

export const getAuthToken = (): string | null => {
  if (!authToken) {
    authToken = localStorage.getItem('signroad_auth_token');
  }
  return authToken;
};

// Generic API request helper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
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

// ============================================================================
// AUTHENTICATION API
// ============================================================================

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

// ============================================================================
// USER API
// ============================================================================

export interface UserProgress {
  user_id: string;
  completed_days: number[];
  current_day: number;
  streak: number;
  lantern_health: number;
  sparks: number;
  owned_cosmetics: string[];
  equipped_cosmetics: Record<string, string>;
}

export interface ProgressUpdate {
  day_number: number;
  completed: boolean;
}

export const userAPI = {
  getProgress: () => apiRequest<UserProgress>('/api/users/progress'),

  updateProgress: (data: ProgressUpdate) =>
    apiRequest<{ success: boolean; progress: UserProgress }>('/api/users/progress', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateSettings: (settings: Record<string, unknown>) =>
    apiRequest<{ success: boolean; settings: Record<string, unknown> }>('/api/users/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    }),
};

// ============================================================================
// DAY CONTENT API
// ============================================================================

export interface DayContent {
  id: string;
  day_number: number;
  title: string;
  description: string;
  sign_challenge: string;
  sign_description: string;
  meditation_script: string;
  meditation_audio_url: string | null;
  duration_options: number[];
  sparks_reward: number;
  is_premium: boolean;
  special_event: string | null;
}

export const dayAPI = {
  getAllDays: () => apiRequest<DayContent[]>('/api/days'),

  getDay: (dayNumber: number) => apiRequest<DayContent>(`/api/days/${dayNumber}`),
};

// ============================================================================
// SIGN LOG API
// ============================================================================

export interface SignLogCreate {
  day_number: number;
  sign_name: string;
  note?: string;
  photo_base64?: string;
}

export interface SignLog {
  id: string;
  user_id: string;
  day_number: number;
  sign_name: string;
  note: string | null;
  photo_url: string | null;
  logged_at: string;
}

export const signAPI = {
  createSignLog: (data: SignLogCreate) =>
    apiRequest<SignLog>('/api/signs', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getUserSigns: () => apiRequest<SignLog[]>('/api/signs'),
};

// ============================================================================
// JOURNAL API
// ============================================================================

export interface JournalEntryCreate {
  day_number: number;
  content: string;
  prompt: string;
  is_public?: boolean;
}

export interface JournalEntry {
  id: string;
  user_id: string;
  day_number: number;
  content: string;
  prompt: string;
  is_public: boolean;
  created_at: string;
}

export const journalAPI = {
  createEntry: (data: JournalEntryCreate) =>
    apiRequest<JournalEntry>('/api/journal', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getUserJournal: () => apiRequest<JournalEntry[]>('/api/journal'),

  updateEntry: (entryId: string, content: string) =>
    apiRequest<JournalEntry>(`/api/journal/${entryId}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    }),

  deleteEntry: (entryId: string) =>
    apiRequest<{ success: boolean }>(`/api/journal/${entryId}`, {
      method: 'DELETE',
    }),
};

// ============================================================================
// AUDIO API
// ============================================================================

export interface AudioTrack {
  id: string;
  name: string;
  category: string;
  url: string;
  duration: number;
  is_premium: boolean;
}

export const audioAPI = {
  getAllAudio: () => apiRequest<AudioTrack[]>('/api/audio'),
};

// ============================================================================
// COSMETICS API
// ============================================================================

export interface CosmeticItem {
  id: string;
  name: string;
  description: string;
  category: string;
  rarity: string;
  spark_price: number;
  is_premium: boolean;
}

export const cosmeticsAPI = {
  getAllCosmetics: () => apiRequest<CosmeticItem[]>('/api/cosmetics'),

  purchaseCosmetic: (itemId: string) =>
    apiRequest<{ success: boolean; remaining_sparks: number }>(
      `/api/cosmetics/${itemId}/purchase`,
      {
        method: 'POST',
      }
    ),
};

// ============================================================================
// ADMIN API
// ============================================================================

export const adminAPI = {
  getAllUsers: () => apiRequest<AuthResponse['user'][]>('/api/admin/users'),

  getStats: () =>
    apiRequest<{
      total_users: number;
      total_days: number;
      total_signs_logged: number;
      total_journal_entries: number;
      active_subscribers: number;
    }>('/api/admin/stats'),

  // Add more admin endpoints as needed
};
