export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface HttpClientConfig {
  baseUrl: string;
  headers?: Record<string, string>;
}

const DEFAULT_CONFIG: HttpClientConfig = {
  baseUrl: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
};

let config: HttpClientConfig = { ...DEFAULT_CONFIG };

export const configureHttpClient = (newConfig: Partial<HttpClientConfig>): void => {
  config = { ...config, ...newConfig };
};

export const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async <T>(response: Response): Promise<ApiResponse<T>> => {
  if (!response.ok) {
    const errorText = await response.text();
    return {
      data: null as T,
      success: false,
      error: errorText || `HTTP ${response.status}: ${response.statusText}`,
    };
  }
  
  const data = await response.json();
  return { data, success: true };
};

export const httpClient = {
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${config.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: { ...config.headers, ...getAuthHeaders() },
      });
      return handleResponse<T>(response);
    } catch (error) {
      return {
        data: null as T,
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  },

  async post<T, B = unknown>(endpoint: string, body?: B): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${config.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: { ...config.headers, ...getAuthHeaders() },
        body: body ? JSON.stringify(body) : undefined,
      });
      return handleResponse<T>(response);
    } catch (error) {
      return {
        data: null as T,
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  },

  async put<T, B = unknown>(endpoint: string, body?: B): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${config.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: { ...config.headers, ...getAuthHeaders() },
        body: body ? JSON.stringify(body) : undefined,
      });
      return handleResponse<T>(response);
    } catch (error) {
      return {
        data: null as T,
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  },

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${config.baseUrl}${endpoint}`, {
        method: 'DELETE',
        headers: { ...config.headers, ...getAuthHeaders() },
      });
      return handleResponse<T>(response);
    } catch (error) {
      return {
        data: null as T,
        success: false,
        error: error instanceof Error ? error.message : 'Network error',
      };
    }
  },
};
