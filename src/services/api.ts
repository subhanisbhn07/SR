const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    lantern_health: number;
    sparks: number;
    streak_days: number;
    subscription_status: string;
    trial_ends_at: string | null;
  };
  accessToken: string;
  refreshToken: string;
}

interface MoodEntry {
  id: string;
  user_id: string;
  mood: number;
  tags: string[];
  notes: string | null;
  created_at: string;
}

interface JournalEntry {
  id: string;
  user_id: string;
  prompt_id: string | null;
  content: string;
  mood_at_time: number | null;
  created_at: string;
}

interface Sign {
  id: string;
  name: string;
  emoji: string;
  description: string;
  category: string;
  is_active: boolean;
}

interface Goal {
  id: string;
  user_id: string;
  title: string;
  category: string;
  status: string;
  achieved_at: string | null;
  created_at: string;
}

interface DailyMessage {
  id: string;
  content: string;
  category: string;
}

class ApiService {
  private accessToken: string | null = null;

  constructor() {
    this.accessToken = localStorage.getItem('accessToken');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(this.accessToken && { Authorization: `Bearer ${this.accessToken}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      this.logout();
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Request failed');
    }

    return response.json();
  }

  setAccessToken(token: string) {
    this.accessToken = token;
    localStorage.setItem('accessToken', token);
  }

  logout() {
    this.accessToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    this.setAccessToken(response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setAccessToken(response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }

  async getMe(): Promise<AuthResponse['user']> {
    return this.request('/api/auth/me');
  }

  async getProfile(): Promise<{ stats: Record<string, number> } & AuthResponse['user']> {
    return this.request('/api/profile');
  }

  async updateProfile(data: { name?: string }): Promise<{ id: string; name: string }> {
    return this.request('/api/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async getMoods(from?: string, to?: string): Promise<{ entries: MoodEntry[] }> {
    const params = new URLSearchParams();
    if (from) params.append('from', from);
    if (to) params.append('to', to);
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request(`/api/moods${query}`);
  }

  async createMood(mood: number, tags: string[] = [], notes?: string): Promise<{ entry: MoodEntry; rewards: { sparks: number; lantern_health: number } }> {
    return this.request('/api/moods', {
      method: 'POST',
      body: JSON.stringify({ mood, tags, notes }),
    });
  }

  async getMoodStats(): Promise<{ total_entries: number; average_mood: number; mood_distribution: Record<number, number>; most_common_tags: { tag: string; count: number }[] }> {
    return this.request('/api/moods/stats');
  }

  async getJournals(page = 1, limit = 10): Promise<{ entries: JournalEntry[]; pagination: { page: number; limit: number; total: number; total_pages: number } }> {
    return this.request(`/api/journals?page=${page}&limit=${limit}`);
  }

  async createJournal(content: string, promptId?: string, moodAtTime?: number): Promise<{ entry: JournalEntry; rewards: { sparks: number; lantern_health: number } }> {
    return this.request('/api/journals', {
      method: 'POST',
      body: JSON.stringify({ content, prompt_id: promptId, mood_at_time: moodAtTime }),
    });
  }

  async getJournal(id: string): Promise<{ entry: JournalEntry }> {
    return this.request(`/api/journals/${id}`);
  }

  async getSignsCatalog(): Promise<{ signs: Sign[] }> {
    return this.request('/api/signs/catalog');
  }

  async getActiveSigns(): Promise<{ active_signs: Array<{ id: string; sign_id: string; activated_at: string; sign: Sign }> }> {
    return this.request('/api/signs/active');
  }

  async setActiveSigns(signIds: string[]): Promise<{ active_signs: Array<{ id: string; sign_id: string; activated_at: string; sign: Sign }> }> {
    return this.request('/api/signs/active', {
      method: 'POST',
      body: JSON.stringify({ sign_ids: signIds }),
    });
  }

  async logFoundSign(signId: string, context?: string): Promise<{ found_sign: { id: string; sign: Sign }; rewards: { sparks: number; lantern_health: number } }> {
    return this.request('/api/signs/found', {
      method: 'POST',
      body: JSON.stringify({ sign_id: signId, context }),
    });
  }

  async getSignHistory(): Promise<{ found_signs: Array<{ id: string; sign_id: string; context: string | null; found_at: string; sign: Sign }> }> {
    return this.request('/api/signs/history');
  }

  async getGoals(status?: string): Promise<{ goals: Goal[] }> {
    const query = status ? `?status=${status}` : '';
    return this.request(`/api/goals${query}`);
  }

  async createGoal(title: string, category = 'general'): Promise<{ goal: Goal }> {
    return this.request('/api/goals', {
      method: 'POST',
      body: JSON.stringify({ title, category }),
    });
  }

  async updateGoal(id: string, data: { title?: string; category?: string; status?: string }): Promise<{ goal: Goal; rewards?: { sparks: number; lantern_health: number } }> {
    return this.request(`/api/goals/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteGoal(id: string): Promise<{ message: string }> {
    return this.request(`/api/goals/${id}`, { method: 'DELETE' });
  }

  async getReceipts(): Promise<{ receipts: Array<{ id: string; goal_id: string; days_on_road: number; signs_logged: number; sessions_completed: number; best_streak: number; probability_beaten: number; created_at: string; goal: Goal }> }> {
    return this.request('/api/receipts');
  }

  async createReceipt(goalId: string): Promise<{ receipt: { id: string; goal_id: string; days_on_road: number; signs_logged: number; sessions_completed: number; best_streak: number; probability_beaten: number; created_at: string; goal: Goal; user_name: string } }> {
    return this.request('/api/receipts', {
      method: 'POST',
      body: JSON.stringify({ goal_id: goalId }),
    });
  }

  async getReceipt(id: string): Promise<{ receipt: { id: string; goal_id: string; days_on_road: number; signs_logged: number; sessions_completed: number; best_streak: number; probability_beaten: number; created_at: string; goal: Goal; user_name: string } }> {
    return this.request(`/api/receipts/${id}`);
  }

  async getTrialStatus(): Promise<{ is_on_trial: boolean; trial_started_at: string | null; trial_ends_at: string | null; days_remaining: number; is_expired: boolean; subscription_status: string }> {
    return this.request('/api/trial');
  }

  async startTrial(): Promise<{ message: string; trial_started_at: string; trial_ends_at: string; days: number }> {
    return this.request('/api/trial/start', { method: 'POST' });
  }

  async getDailyMessage(): Promise<{ message: DailyMessage | null }> {
    return this.request('/api/content/messages/daily');
  }

  async getPricing(): Promise<{ pricing: { monthly_price: number; annual_price: number; trial_days: number; currency: string } }> {
    return this.request('/api/content/pricing');
  }

  async getPage(slug: string): Promise<{ page: { id: string; slug: string; title: string; content: string } }> {
    return this.request(`/api/content/pages/${slug}`);
  }

  async getAppSettings(): Promise<{ settings: { free_trial_days: number; card_visibility: Record<string, { desktop: boolean; tablet: boolean; mobile: boolean }> } }> {
    return this.request('/api/settings');
  }
}

export const api = new ApiService();
