import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import { LoginPage } from '../../src/pages/LoginPage';
import { renderWithProviders } from '../test-utils';
import * as routerDom from 'react-router-dom';

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('LoginPage', () => {
  let mockNavigate: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockNavigate = vi.fn();
    vi.mocked(routerDom.useNavigate).mockReturnValue(mockNavigate);
  });

  describe('Rendering', () => {
    it('renders the login form with email and password inputs', () => {
      renderWithProviders(<LoginPage />, {
        preloadedState: {
          auth: {
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          },
        },
        initialRoutes: ['/login'],
      });

      expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^login$/i })).toBeInTheDocument();
    });

    it('renders the link to register page', () => {
      renderWithProviders(<LoginPage />, {
        preloadedState: {
          auth: {
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          },
        },
        initialRoutes: ['/login'],
      });

      expect(screen.getByText(/Don't have an account\?/i)).toBeInTheDocument();
      expect(screen.getByText(/Register here/i)).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    it('renders without errors when no error in state', () => {
      renderWithProviders(<LoginPage />, {
        preloadedState: {
          auth: {
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          },
        },
        initialRoutes: ['/login'],
      });

      // Form renders successfully without error display
      expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /^login$/i })).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('shows loading text on submit button when loading', () => {
      renderWithProviders(<LoginPage />, {
        preloadedState: {
          auth: {
            user: null,
            isAuthenticated: false,
            isLoading: true,
            error: null,
          },
        },
        initialRoutes: ['/login'],
      });

      expect(screen.getByRole('button', { name: /logging in/i })).toBeInTheDocument();
    });

    it('shows normal button text when not loading', () => {
      renderWithProviders(<LoginPage />, {
        preloadedState: {
          auth: {
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          },
        },
        initialRoutes: ['/login'],
      });

      expect(screen.getByRole('button', { name: /^login$/i })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /logging in/i })).not.toBeInTheDocument();
    });
  });

  describe('Redirect Behavior', () => {
    it('redirects to home page when user is authenticated', async () => {
      renderWithProviders(<LoginPage />, {
        preloadedState: {
          auth: {
            user: { id: 1, email: 'test@example.com' },
            isAuthenticated: true,
            isLoading: false,
            error: null,
          },
        },
        initialRoutes: ['/login'],
      });

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/');
      });
    });

    it('does not redirect when user is not authenticated', () => {
      renderWithProviders(<LoginPage />, {
        preloadedState: {
          auth: {
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          },
        },
        initialRoutes: ['/login'],
      });

      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
