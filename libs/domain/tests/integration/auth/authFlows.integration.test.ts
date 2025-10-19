import { describe, it, expect } from 'vitest';
import {
  registerUser,
  loginUser,
  logoutUser,
  checkAuth,
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from '../../../src/features/auth/authSlice';
import { createIntegrationStore, generateTestUser } from '../helpers';

describe('Auth Integration Tests', () => {
  describe('Registration Flow', () => {
    it('should register a new user successfully', async () => {
      const store = createIntegrationStore();
      const testUser = await generateTestUser();

      await store.dispatch(registerUser(testUser));

      expect(selectIsAuthenticated(store.getState())).toBe(true);
      expect(selectAuthLoading(store.getState())).toBe(false);
      expect(selectAuthError(store.getState())).toBeNull();
      expect(selectUser(store.getState())).toBeTruthy();
      expect(selectUser(store.getState())?.email).toBe(testUser.email);
    });

    it('should fail registration with mismatched passwords', async () => {
      const store = createIntegrationStore();
      const testUser = await generateTestUser();

      await store.dispatch(
        registerUser({
          ...testUser,
          passwordConfirmation: 'DifferentPassword123!',
        })
      );

      expect(selectIsAuthenticated(store.getState())).toBe(false);
      expect(selectAuthError(store.getState())).toBeTruthy();
      expect(selectUser(store.getState())).toBeNull();
    });
  });

  describe('Login Flow', () => {
    it('should login with valid credentials', async () => {
      const store = createIntegrationStore();
      const testUser = await generateTestUser();

      await store.dispatch(registerUser(testUser));

      await store.dispatch(logoutUser());

      await store.dispatch(
        loginUser({
          email: testUser.email,
          password: testUser.password,
        })
      );

      expect(selectIsAuthenticated(store.getState())).toBe(true);
      expect(selectAuthLoading(store.getState())).toBe(false);
      expect(selectAuthError(store.getState())).toBeNull();
      expect(selectUser(store.getState())?.email).toBe(testUser.email);
    });

    it('should fail login with invalid credentials', async () => {
      const store = createIntegrationStore();

      await store.dispatch(
        loginUser({
          email: 'nonexistent@example.com',
          password: 'WrongPassword123!',
        })
      );

      expect(selectIsAuthenticated(store.getState())).toBe(false);
      expect(selectAuthError(store.getState())).toBeTruthy();
      expect(selectUser(store.getState())).toBeNull();
    });
  });

  describe('Check Auth Flow', () => {
    it('should verify authenticated session with checkAuth', async () => {
      const store = createIntegrationStore();
      const testUser = await generateTestUser();

      await store.dispatch(registerUser(testUser));

      await store.dispatch(checkAuth());

      expect(selectIsAuthenticated(store.getState())).toBe(true);
      expect(selectUser(store.getState())?.email).toBe(testUser.email);
    });

    it('should fail checkAuth when not authenticated', async () => {
      const store = createIntegrationStore();

      await store.dispatch(logoutUser());

      await store.dispatch(checkAuth());

      expect(selectIsAuthenticated(store.getState())).toBe(false);
      expect(selectUser(store.getState())).toBeNull();
    });
  });

  describe('Logout Flow', () => {
    it('should logout successfully and clear session', async () => {
      const store = createIntegrationStore();
      const testUser = await generateTestUser();

      await store.dispatch(registerUser(testUser));
      expect(selectIsAuthenticated(store.getState())).toBe(true);

      await store.dispatch(logoutUser());

      expect(selectIsAuthenticated(store.getState())).toBe(false);
      expect(selectUser(store.getState())).toBeNull();
      expect(selectAuthError(store.getState())).toBeNull();
    });
  });

  describe('Complete Auth Flow', () => {
    it('should complete full authentication lifecycle', async () => {
      const store = createIntegrationStore();
      const testUser = await generateTestUser();

      await store.dispatch(registerUser(testUser));
      expect(selectIsAuthenticated(store.getState())).toBe(true);
      const registeredUserId = selectUser(store.getState())?.id;
      expect(registeredUserId).toBeTruthy();

      await store.dispatch(checkAuth());
      expect(selectIsAuthenticated(store.getState())).toBe(true);
      expect(selectUser(store.getState())?.id).toBe(registeredUserId);

      await store.dispatch(logoutUser());
      expect(selectIsAuthenticated(store.getState())).toBe(false);
      expect(selectUser(store.getState())).toBeNull();

      await store.dispatch(
        loginUser({
          email: testUser.email,
          password: testUser.password,
        })
      );
      expect(selectIsAuthenticated(store.getState())).toBe(true);
      expect(selectUser(store.getState())?.id).toBe(registeredUserId);

      await store.dispatch(checkAuth());
      expect(selectIsAuthenticated(store.getState())).toBe(true);

      await store.dispatch(logoutUser());
      expect(selectIsAuthenticated(store.getState())).toBe(false);
    });
  });
});
