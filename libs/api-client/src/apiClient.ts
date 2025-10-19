export interface ApiClientConfig {
  hostname: string;
  port?: number;
  protocol?: 'http' | 'https';
  basePath?: string;
}

export interface ApiResult<T> {
  data?: T;
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: {
    id: number;
    email: string;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  password_confirmation?: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: number;
    email: string;
    created_at: string;
  };
}

export interface UserResponse {
  id: number;
  email: string;
  created_at: string;
}

export interface LogoutResponse {
  message: string;
}

export class ApiClient {
  private baseUrl: string;

  constructor(config: ApiClientConfig) {
    const protocol = config.protocol || 'http';
    const port = config.port ? `:${config.port}` : '';
    const basePath = config.basePath || '';
    this.baseUrl = `${protocol}://${config.hostname}${port}${basePath}`;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResult<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;

      const response = await fetch(url, {
        ...options,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = (await response.json()) as T;

      if (!response.ok) {
        return {
          error: (data as { error?: string }).error || `HTTP error: ${response.status}`,
        };
      }

      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  register(
    email: string,
    password: string,
    passwordConfirmation?: string
  ): Promise<ApiResult<RegisterResponse>> {
    return this.request<RegisterResponse>('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        user: {
          email,
          password,
          password_confirmation: passwordConfirmation || password,
        },
      }),
    });
  }

  login(email: string, password: string): Promise<ApiResult<LoginResponse>> {
    return this.request<LoginResponse>('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  logout(): Promise<ApiResult<LogoutResponse>> {
    return this.request<LogoutResponse>('/api/logout', {
      method: 'DELETE',
    });
  }

  getCurrentUser(): Promise<ApiResult<UserResponse>> {
    return this.request<UserResponse>('/api/me', {
      method: 'GET',
    });
  }
}
