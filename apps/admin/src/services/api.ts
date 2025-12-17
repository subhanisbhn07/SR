// SignRoad Admin API Service
// This service handles all API calls from the admin panel to the backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

class AdminApiService {
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
      credentials: 'include',
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
  // USER MANAGEMENT
  // ============================================================================

  async getUsers(page: number = 1, limit: number = 20, search?: string) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (search) params.append('search', search);
    return this.request(`/admin/users?${params}`);
  }

  async getUserById(id: string) {
    return this.request(`/admin/users/${id}`);
  }

  async updateUser(id: string, data: Record<string, any>) {
    return this.request(`/admin/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id: string) {
    return this.request(`/admin/users/${id}`, {
      method: 'DELETE',
    });
  }

  // ============================================================================
  // SIGNS MANAGEMENT
  // ============================================================================

  async getSigns(page: number = 1, limit: number = 50) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    return this.request(`/signs?${params}`);
  }

  async getSignById(id: string) {
    return this.request(`/signs/${id}`);
  }

  async createSign(data: Record<string, any>) {
    return this.request('/admin/signs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateSign(id: string, data: Record<string, any>) {
    return this.request(`/admin/signs/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteSign(id: string) {
    return this.request(`/admin/signs/${id}`, {
      method: 'DELETE',
    });
  }

  // ============================================================================
  // CONTENT MANAGEMENT (Daily Messages, Meditations)
  // ============================================================================

  async getDailyMessageTemplates() {
    return this.request('/admin/content/daily-messages');
  }

  async getMeditations() {
    return this.request('/admin/content/meditations');
  }

  async updateDailyMessageTemplate(id: string, data: Record<string, any>) {
    return this.request(`/admin/content/daily-messages/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async updateMeditation(id: string, data: Record<string, any>) {
    return this.request(`/admin/content/meditations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // ============================================================================
  // TRIBES MANAGEMENT
  // ============================================================================

  async getTribes(page: number = 1, limit: number = 20) {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    return this.request(`/admin/tribes?${params}`);
  }

  async getTribeById(id: string) {
    return this.request(`/admin/tribes/${id}`);
  }

  async rebalanceTribe(id: string) {
    return this.request(`/admin/tribes/${id}/rebalance`, {
      method: 'POST',
    });
  }

  // ============================================================================
  // ANALYTICS
  // ============================================================================

  async getAnalytics(period: 'day' | 'week' | 'month' | 'year' = 'week') {
    return this.request(`/admin/analytics?period=${period}`);
  }

  async getUserStats() {
    return this.request('/admin/analytics/users');
  }

  async getSignStats() {
    return this.request('/admin/analytics/signs');
  }

  async getMeditationStats() {
    return this.request('/admin/analytics/meditations');
  }

  // ============================================================================
  // HEALTH CHECK
  // ============================================================================

  async healthCheck() {
    return this.request('/health');
  }
}

// Export singleton instance
export const adminApi = new AdminApiService(API_BASE_URL);

// Export class for testing
export { AdminApiService };
