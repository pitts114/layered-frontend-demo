import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  loginUser,
  registerUser,
  logoutUser,
  checkAuth,
  clearError,
  logout,
  login,
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from '../../../src/features/auth/authSlice';
import { setupStore, type AppStore } from '../../../src/store';
import { ApiClient } from '@obm/api-client';
import type { Services } from '../../../src/services';
import { mock } from 'vitest-mock-extended';

const mockApiClient = mock<ApiClient>();

const mockServices: Services = {
  apiClient: mockApiClient,
};

describe('authSlice', () => {
  let store: AppStore;

  beforeEach(() => {
    store = setupStore(mockServices);
    vi.clearAllMocks();
  });

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState().auth;
      expect(state).toEqual({
        user: null,
        isLoading: true,
        isInitializing: true,
        error: null,
        isAuthenticated: false,
      });
    });
  });

  describe('synchronous actions', () => {
    it('should clear error', () => {
      store = setupStore(mockServices, {
        auth: {
          user: null,
          isLoading: false,
          isInitializing: false,
          error: 'Some error',
          isAuthenticated: false,
        },
      });

      store.dispatch(clearError());

      const state = store.getState().auth;
      expect(state.error).toBeNull();
    });

    it('should logout and reset state', () => {
      store = setupStore(mockServices, {
        auth: {
          user: { id: 1, email: 'test@example.com' },
          isLoading: false,
          isInitializing: false,
          error: null,
          isAuthenticated: true,
        },
      });

      store.dispatch(logout());

      const state = store.getState().auth;
      expect(state).toEqual({
        user: null,
        isLoading: false,
          isInitializing: false,
        error: null,
        isAuthenticated: false,
      });
    });

    it('should login and set user state', () => {
      const user = { id: 1, email: 'test@example.com', created_at: '2025-01-01' };

      store.dispatch(login(user));

      const state = store.getState().auth;
      expect(state.user).toEqual(user);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should login and clear any existing errors', () => {
      store = setupStore(mockServices, {
        auth: {
          user: null,
          isLoading: false,
          isInitializing: false,
          error: 'Previous error',
          isAuthenticated: false,
        },
      });

      const user = { id: 1, email: 'test@example.com' };
      store.dispatch(login(user));

      const state = store.getState().auth;
      expect(state.error).toBeNull();
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(user);
    });

    it('should login and clear loading state', () => {
      store = setupStore(mockServices, {
        auth: {
          user: null,
          isLoading: true,
          isInitializing: true,
          error: null,
          isAuthenticated: false,
        },
      });

      const user = { id: 1, email: 'test@example.com' };
      store.dispatch(login(user));

      const state = store.getState().auth;
      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.user).toEqual(user);
    });
  });

  describe('loginUser async thunk', () => {
    it('should handle successful login', async () => {
      const mockResponse = {
        data: {
          message: 'Login successful',
          user: { id: 1, email: 'test@example.com' },
        },
      };

      mockApiClient.login.mockResolvedValue(mockResponse);

      await store.dispatch(loginUser({ email: 'test@example.com', password: 'password123' }));

      const state = store.getState().auth;
      expect(state.user).toEqual({ id: 1, email: 'test@example.com' });
      expect(state.isAuthenticated).toBe(true);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle login failure', async () => {
      const mockResponse = {
        error: 'Invalid credentials',
      };

      mockApiClient.login.mockResolvedValue(mockResponse);

      await store.dispatch(loginUser({ email: 'test@example.com', password: 'wrong' }));

      const state = store.getState().auth;
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Invalid credentials');
    });

    it('should set loading state while login is pending', () => {
      mockApiClient.login.mockReturnValue(new Promise(() => {}));

      store.dispatch(loginUser({ email: 'test@example.com', password: 'password123' }));

      const state = store.getState().auth;
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
  });

  describe('registerUser async thunk', () => {
    it('should handle successful registration', async () => {
      const mockResponse = {
        data: {
          message: 'Registration successful',
          user: { id: 1, email: 'newuser@example.com', created_at: '2025-01-01' },
        },
      };

      mockApiClient.register.mockResolvedValue(mockResponse);

      await store.dispatch(
        registerUser({
          email: 'newuser@example.com',
          password: 'password123',
          passwordConfirmation: 'password123',
        })
      );

      const state = store.getState().auth;
      expect(state.user).toEqual({ id: 1, email: 'newuser@example.com', created_at: '2025-01-01' });
      expect(state.isAuthenticated).toBe(true);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle registration failure', async () => {
      const mockResponse = {
        error: 'Email already exists',
      };

      mockApiClient.register.mockResolvedValue(mockResponse);

      await store.dispatch(
        registerUser({
          email: 'existing@example.com',
          password: 'password123',
          passwordConfirmation: 'password123',
        })
      );

      const state = store.getState().auth;
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Email already exists');
    });

    it('should set loading state while registration is pending', () => {
      mockApiClient.register.mockReturnValue(new Promise(() => {}));

      store.dispatch(
        registerUser({
          email: 'newuser@example.com',
          password: 'password123',
          passwordConfirmation: 'password123',
        })
      );

      const state = store.getState().auth;
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
  });

  describe('logoutUser async thunk', () => {
    it('should handle successful logout', async () => {
      store = setupStore(mockServices, {
        auth: {
          user: { id: 1, email: 'test@example.com' },
          isLoading: false,
          isInitializing: false,
          error: null,
          isAuthenticated: true,
        },
      });

      const mockResponse = {
        data: { message: 'Logged out successfully' },
      };

      mockApiClient.logout.mockResolvedValue(mockResponse);

      await store.dispatch(logoutUser());

      const state = store.getState().auth;
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle logout failure', async () => {
      store = setupStore(mockServices, {
        auth: {
          user: { id: 1, email: 'test@example.com' },
          isLoading: false,
          isInitializing: false,
          error: null,
          isAuthenticated: true,
        },
      });

      const mockResponse = {
        error: 'Logout failed',
      };

      mockApiClient.logout.mockResolvedValue(mockResponse);

      await store.dispatch(logoutUser());

      const state = store.getState().auth;
      expect(state.error).toBe('Logout failed');
      expect(state.isLoading).toBe(false);
    });
  });

  describe('checkAuth async thunk', () => {
    it('should handle successful auth check', async () => {
      const mockResponse = {
        data: {
          id: 1,
          email: 'test@example.com',
          created_at: '2025-01-01',
        },
      };

      mockApiClient.getCurrentUser.mockResolvedValue(mockResponse);

      await store.dispatch(checkAuth());

      const state = store.getState().auth;
      expect(state.user).toEqual({
        id: 1,
        email: 'test@example.com',
        created_at: '2025-01-01',
      });
      expect(state.isAuthenticated).toBe(true);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle failed auth check (not authenticated)', async () => {
      const mockResponse = {
        error: 'Not authenticated',
      };

      mockApiClient.getCurrentUser.mockResolvedValue(mockResponse);

      await store.dispatch(checkAuth());

      const state = store.getState().auth;
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
    });

    it('should set loading state while checking auth', () => {
      mockApiClient.getCurrentUser.mockReturnValue(new Promise(() => {}));

      store.dispatch(checkAuth());

      const state = store.getState().auth;
      expect(state.isLoading).toBe(true);
    });
  });

  describe('selectors', () => {
    it('should select user', () => {
      const testStore = setupStore(mockServices, {
        auth: {
          user: { id: 1, email: 'test@example.com' },
          isLoading: false,
          isInitializing: false,
          error: null,
          isAuthenticated: true,
        },
      });

      expect(selectUser(testStore.getState())).toEqual({ id: 1, email: 'test@example.com' });
    });

    it('should select isAuthenticated', () => {
      const testStore = setupStore(mockServices, {
        auth: {
          user: { id: 1, email: 'test@example.com' },
          isLoading: false,
          isInitializing: false,
          error: null,
          isAuthenticated: true,
        },
      });

      expect(selectIsAuthenticated(testStore.getState())).toBe(true);
    });

    it('should select loading state', () => {
      const testStore = setupStore(mockServices, {
        auth: {
          user: null,
          isLoading: true,
          isInitializing: true,
          error: null,
          isAuthenticated: false,
        },
      });

      expect(selectAuthLoading(testStore.getState())).toBe(true);
    });

    it('should select error', () => {
      const testStore = setupStore(mockServices, {
        auth: {
          user: null,
          isLoading: false,
          isInitializing: false,
          error: 'Some error message',
          isAuthenticated: false,
        },
      });

      expect(selectAuthError(testStore.getState())).toBe('Some error message');
    });
  });
});
