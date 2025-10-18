import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ApiClient } from '../src/apiClient';

describe('ApiClient', () => {
  let apiClient: ApiClient;
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    apiClient = new ApiClient({
      hostname: 'localhost',
      port: 3000,
      protocol: 'http',
      basePath: '',
    });

    // Mock global fetch
    fetchMock = vi.fn();
    global.fetch = fetchMock;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Constructor', () => {
    it('constructs baseUrl with all config options', () => {
      const client = new ApiClient({
        hostname: 'api.example.com',
        port: 8080,
        protocol: 'https',
        basePath: '/v1',
      });

      expect(client).toBeDefined();
    });

    it('constructs baseUrl with default protocol (http)', () => {
      const client = new ApiClient({
        hostname: 'localhost',
        port: 3000,
      });

      expect(client).toBeDefined();
    });

    it('constructs baseUrl without port', () => {
      const client = new ApiClient({
        hostname: 'api.example.com',
        protocol: 'https',
      });

      expect(client).toBeDefined();
    });
  });

  describe('login', () => {
    it('returns success response when login succeeds', async () => {
      const mockResponse = {
        message: 'Logged in successfully',
        user: { id: 1, email: 'test@example.com' },
      };

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await apiClient.login('test@example.com', 'password123');

      expect(result.data).toEqual(mockResponse);
      expect(result.error).toBeUndefined();
      expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
      });
    });

    it('returns error response when login fails with invalid credentials', async () => {
      const mockErrorResponse = {
        error: 'Invalid email or password',
      };

      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => mockErrorResponse,
      });

      const result = await apiClient.login('test@example.com', 'wrongpassword');

      expect(result.data).toBeUndefined();
      expect(result.error).toBe('Invalid email or password');
    });

    it('returns error response when network error occurs', async () => {
      fetchMock.mockRejectedValueOnce(new Error('Network error'));

      const result = await apiClient.login('test@example.com', 'password123');

      expect(result.data).toBeUndefined();
      expect(result.error).toBe('Network error');
    });

    it('handles server error responses', async () => {
      const mockErrorResponse = {
        error: 'Internal server error',
      };

      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => mockErrorResponse,
      });

      const result = await apiClient.login('test@example.com', 'password123');

      expect(result.data).toBeUndefined();
      expect(result.error).toBe('Internal server error');
    });

    it('handles error response without error field', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({}),
      });

      const result = await apiClient.login('test@example.com', 'password123');

      expect(result.data).toBeUndefined();
      expect(result.error).toBe('HTTP error: 404');
    });
  });

  describe('logout', () => {
    it('returns success response when logout succeeds', async () => {
      const mockResponse = {
        message: 'Logged out successfully',
      };

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await apiClient.logout();

      expect(result.data).toEqual(mockResponse);
      expect(result.error).toBeUndefined();
      expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/api/logout', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('returns error response when logout fails', async () => {
      const mockErrorResponse = {
        error: 'Unauthorized',
      };

      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => mockErrorResponse,
      });

      const result = await apiClient.logout();

      expect(result.data).toBeUndefined();
      expect(result.error).toBe('Unauthorized');
    });

    it('handles network error during logout', async () => {
      fetchMock.mockRejectedValueOnce(new Error('Connection refused'));

      const result = await apiClient.logout();

      expect(result.data).toBeUndefined();
      expect(result.error).toBe('Connection refused');
    });
  });

  describe('getCurrentUser', () => {
    it('returns user data when authenticated', async () => {
      const mockResponse = {
        id: 1,
        email: 'test@example.com',
        created_at: '2024-01-01T00:00:00.000Z',
      };

      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await apiClient.getCurrentUser();

      expect(result.data).toEqual(mockResponse);
      expect(result.error).toBeUndefined();
      expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/api/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });

    it('returns error when user is not authenticated', async () => {
      const mockErrorResponse = {
        error: 'Unauthorized',
      };

      fetchMock.mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => mockErrorResponse,
      });

      const result = await apiClient.getCurrentUser();

      expect(result.data).toBeUndefined();
      expect(result.error).toBe('Unauthorized');
    });

    it('handles network error when fetching user', async () => {
      fetchMock.mockRejectedValueOnce(new Error('Timeout'));

      const result = await apiClient.getCurrentUser();

      expect(result.data).toBeUndefined();
      expect(result.error).toBe('Timeout');
    });
  });

  describe('Request Options', () => {
    it('includes credentials for session cookies', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'success' }),
      });

      await apiClient.logout();

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          credentials: 'include',
        })
      );
    });

    it('sets Content-Type header to application/json', async () => {
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'success' }),
      });

      await apiClient.logout();

      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });
  });

  describe('URL Construction', () => {
    it('constructs correct URL with basePath', async () => {
      const client = new ApiClient({
        hostname: 'api.example.com',
        port: 8080,
        protocol: 'https',
        basePath: '/v1',
      });

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'success' }),
      });

      await client.logout();

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com:8080/v1/api/logout',
        expect.any(Object)
      );
    });

    it('constructs correct URL without port', async () => {
      const client = new ApiClient({
        hostname: 'api.example.com',
        protocol: 'https',
      });

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'success' }),
      });

      await client.logout();

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.example.com/api/logout',
        expect.any(Object)
      );
    });
  });
});
