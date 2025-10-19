import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { mockDeep } from 'vitest-mock-extended';
import App from '../src/App';
import { renderWithProviders } from './test-utils';
import type { ApiClient } from '@obm/api-client';

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Loading State', () => {
    it('shows loading spinner when isLoading is true', async () => {
      renderWithProviders(<App />, {
        preloadedState: {
          auth: {
            user: null,
            isLoading: true,
            isInitializing: true,
            error: null,
            isAuthenticated: false,
          },
          counter: { value: 0 },
        },
      });

      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument();
        expect(screen.getByLabelText('Loading')).toBeInTheDocument();
      });
    });

    it('does not show navbar when loading', async () => {
      renderWithProviders(<App />, {
        preloadedState: {
          auth: {
            user: null,
            isLoading: true,
            isInitializing: true,
            error: null,
            isAuthenticated: false,
          },
          counter: { value: 0 },
        },
      });

      await waitFor(() => {
        expect(screen.queryByText('OBM')).not.toBeInTheDocument();
      });
    });

    it('does not show routes when loading', async () => {
      renderWithProviders(<App />, {
        preloadedState: {
          auth: {
            user: null,
            isLoading: true,
            isInitializing: true,
            error: null,
            isAuthenticated: false,
          },
          counter: { value: 0 },
        },
      });

      await waitFor(() => {
        expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/register/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('Authentication Check', () => {
    it('shows loading spinner on initial mount', async () => {
      renderWithProviders(<App />, {
        preloadedState: {
          auth: {
            user: null,
            isLoading: true,
            isInitializing: true,
            error: null,
            isAuthenticated: false,
          },
          counter: { value: 0 },
        },
      });

      await waitFor(() => {
        expect(screen.getByRole('status')).toBeInTheDocument();
      });
    });
  });

  describe('Authenticated State', () => {
    it('shows navbar when not loading', async () => {
      const mockApiClient = mockDeep<ApiClient>();
      mockApiClient.getCurrentUser.mockResolvedValue({
        data: { id: 1, email: 'test@example.com', created_at: '2024-01-01' },
      });

      renderWithProviders(<App />, {
        preloadedState: {
          auth: {
            user: { id: 1, email: 'test@example.com' },
            isLoading: false,
            isInitializing: false,
            error: null,
            isAuthenticated: true,
          },
          counter: { value: 0 },
        },
        services: { apiClient: mockApiClient },
      });

      await waitFor(() => {
        expect(screen.getByText('OBM')).toBeInTheDocument();
      });
    });

    it('shows logout button when authenticated', async () => {
      const mockApiClient = mockDeep<ApiClient>();
      mockApiClient.getCurrentUser.mockResolvedValue({
        data: { id: 1, email: 'test@example.com', created_at: '2024-01-01' },
      });

      renderWithProviders(<App />, {
        preloadedState: {
          auth: {
            user: { id: 1, email: 'test@example.com' },
            isLoading: false,
            isInitializing: false,
            error: null,
            isAuthenticated: true,
          },
          counter: { value: 0 },
        },
        services: { apiClient: mockApiClient },
      });

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
      });
    });

    it('shows theme toggle button', async () => {
      const mockApiClient = mockDeep<ApiClient>();
      mockApiClient.getCurrentUser.mockResolvedValue({
        data: { id: 1, email: 'test@example.com', created_at: '2024-01-01' },
      });

      renderWithProviders(<App />, {
        preloadedState: {
          auth: {
            user: { id: 1, email: 'test@example.com' },
            isLoading: false,
            isInitializing: false,
            error: null,
            isAuthenticated: true,
          },
          counter: { value: 0 },
        },
        services: { apiClient: mockApiClient },
      });

      await waitFor(() => {
        const themeToggle = screen.getByRole('button', { name: /switch to (dark|light) mode/i });
        expect(themeToggle).toBeInTheDocument();
      });
    });
  });

  describe('Unauthenticated State', () => {
    it('does not show logout button when not authenticated', async () => {
      renderWithProviders(<App />, {
        preloadedState: {
          auth: {
            user: null,
            isLoading: false,
            isInitializing: false,
            error: null,
            isAuthenticated: false,
          },
          counter: { value: 0 },
        },
        initialRoutes: ['/login'],
      });

      await waitFor(() => {
        expect(screen.queryByRole('button', { name: /logout/i })).not.toBeInTheDocument();
      });
    });

    it('still shows navbar when not authenticated', async () => {
      renderWithProviders(<App />, {
        preloadedState: {
          auth: {
            user: null,
            isLoading: false,
            isInitializing: false,
            error: null,
            isAuthenticated: false,
          },
          counter: { value: 0 },
        },
        initialRoutes: ['/login'],
      });

      await waitFor(() => {
        expect(screen.getByText('OBM')).toBeInTheDocument();
      });
    });

    it('still shows theme toggle when not authenticated', async () => {
      renderWithProviders(<App />, {
        preloadedState: {
          auth: {
            user: null,
            isLoading: false,
            isInitializing: false,
            error: null,
            isAuthenticated: false,
          },
          counter: { value: 0 },
        },
        initialRoutes: ['/login'],
      });

      await waitFor(() => {
        const themeToggle = screen.getByRole('button', { name: /switch to (dark|light) mode/i });
        expect(themeToggle).toBeInTheDocument();
      });
    });
  });

  describe('Routing', () => {
    it('renders login page on /login route', async () => {
      renderWithProviders(<App />, {
        preloadedState: {
          auth: {
            user: null,
            isLoading: false,
            isInitializing: false,
            error: null,
            isAuthenticated: false,
          },
          counter: { value: 0 },
        },
        initialRoutes: ['/login'],
      });

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
      });
    });

    it('renders register page on /register route', async () => {
      renderWithProviders(<App />, {
        preloadedState: {
          auth: {
            user: null,
            isLoading: false,
            isInitializing: false,
            error: null,
            isAuthenticated: false,
          },
          counter: { value: 0 },
        },
        initialRoutes: ['/register'],
      });

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
      });
    });

    it('renders protected route when authenticated', async () => {
      const mockApiClient = mockDeep<ApiClient>();
      mockApiClient.getCurrentUser.mockResolvedValue({
        data: { id: 1, email: 'test@example.com', created_at: '2024-01-01' },
      });

      renderWithProviders(<App />, {
        preloadedState: {
          auth: {
            user: { id: 1, email: 'test@example.com' },
            isLoading: false,
            isInitializing: false,
            error: null,
            isAuthenticated: true,
          },
          counter: { value: 0 },
        },
        services: { apiClient: mockApiClient },
        initialRoutes: ['/'],
      });

      await waitFor(() => {
        expect(screen.getByText('Vite + React')).toBeInTheDocument();
      });
    });
  });
});
