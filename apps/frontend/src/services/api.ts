// SignRoad API Service
// This service handles all API calls to the backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      credentials: 'include', // Include cookies for auth
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || {
            code: 'REQUEST_FAILED',
            message: `Request failed with status ${response.status}`,
          },
        };
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: {
          code: 'NETWORK_ERROR',
          message: 'Network error. Please check your connection.',
        },
      };
    }
  }

  // ============================================================================
  // AUTH ENDPOINTS
  // ============================================================================

  async signup(email: string, password: string, fullName: string, timezone?: string) {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullName, timezone }),
    });
  }

  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout() {
    return this.request('/auth/logout', {
      method: 'POST',
    });
  }

  async refreshToken() {
    return this.request('/auth/refresh', {
      method: 'POST',
    });
  }

  async getMe() {
    return this.request('/auth/me');
  }

  async updateProfile(data: {
    fullName?: string;
    manifestationGoal?: string;
    timezone?: string;
    preferredMessageTime?: string;
    selectedRoad?: string;
  }) {
    return this.request('/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async completeOnboarding(data: {
    fullName: string;
    manifestationGoal: string;
    selectedRoad: string;
    intention: string;
    timezone: string;
  }) {
    return this.request('/auth/onboarding/complete', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // ============================================================================
  // SIGNS ENDPOINTS
  // ============================================================================

  async getAllSigns() {
    return this.request('/signs');
  }

  async getSignById(id: string) {
    return this.request(`/signs/${id}`);
  }

  async getActiveSigns() {
    return this.request('/signs/user/active');
  }

  async logSign(signId: string, locationNote?: string) {
    return this.request('/signs/log', {
      method: 'POST',
      body: JSON.stringify({ signId, locationNote }),
    });
  }

  async getUserSignLogs() {
    return this.request('/signs/user/logs');
  }

  // ============================================================================
  // LANTERN ENDPOINTS
  // ============================================================================

  async getLanternStatus() {
    return this.request('/lantern/status');
  }

  async rekindleLantern() {
    return this.request('/lantern/rekindle', {
      method: 'POST',
    });
  }

  async updateLanternBrightness(amount: number, action: 'add' | 'subtract') {
    return this.request('/lantern/brightness', {
      method: 'PATCH',
      body: JSON.stringify({ amount, action }),
    });
  }

  // ============================================================================
  // FUTURE DROP ENDPOINTS
  // ============================================================================

  async createFutureDrop(data: {
    messageText: string;
    triggerContext: string;
    relatedSignId?: string;
    deliverAfterDays?: number;
  }) {
    return this.request('/future-drops', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getPendingDrops() {
    return this.request('/future-drops/pending');
  }

  async getReadyDrops() {
    return this.request('/future-drops/ready');
  }

  async getDeliveredDrops() {
    return this.request('/future-drops/delivered');
  }

  async markDropDelivered(id: string) {
    return this.request(`/future-drops/${id}/deliver`, {
      method: 'PATCH',
    });
  }

  async deleteFutureDrop(id: string) {
    return this.request(`/future-drops/${id}`, {
      method: 'DELETE',
    });
  }

  // ============================================================================
  // DAILY MESSAGE ENDPOINTS
  // ============================================================================

  async getDailyMessage() {
    return this.request('/daily-message/today');
  }

  async getMessageHistory() {
    return this.request('/daily-message/history');
  }

  async markMessageOpened(id: string) {
    return this.request(`/daily-message/${id}/opened`, {
      method: 'PATCH',
    });
  }

  async updateMessageTimeSpent(id: string, timeSpentSeconds: number) {
    return this.request(`/daily-message/${id}/time-spent`, {
      method: 'PATCH',
      body: JSON.stringify({ timeSpentSeconds }),
    });
  }

  // ============================================================================
  // HEALTH CHECK
  // ============================================================================

  async healthCheck() {
    return this.request('/health');
  }
}

// Export singleton instance
export const api = new ApiService(API_BASE_URL);

// Export class for testing
export { ApiService };
