import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { ApiClient } from '../src/apiClient';
import { createTestUser, generateEmail, TEST_SERVER_CONFIG } from './testUtils';

describe('ApiClient - Integration Tests', () => {
  let apiClient: ApiClient;

  beforeAll(() => {
    apiClient = new ApiClient(TEST_SERVER_CONFIG);
  });

  afterEach(async () => {
    // Logout after each test to ensure clean state
    await apiClient.logout();
  });

  describe('User Registration', () => {
    it('should successfully register a new user', async () => {
      const email = await generateEmail();
      expect(email).not.toBeNull();

      const password = 'testPassword123';
      const result = await apiClient.register(email!, password);

      expect(result.error).toBeUndefined();
      expect(result.data).toBeDefined();
      expect(result.data?.message).toBe('User registered successfully');
      expect(result.data?.user).toBeDefined();
      expect(result.data?.user.email).toBe(email!.toLowerCase());
      expect(result.data?.user.id).toBeTypeOf('number');
      expect(result.data?.user.created_at).toBeDefined();
    });

    it('should automatically log in user after registration', async () => {
      const email = await generateEmail();
      expect(email).not.toBeNull();

      const password = 'testPassword123';
      await apiClient.register(email!, password);

      // Try to get current user - should work if logged in
      const userResult = await apiClient.getCurrentUser();

      expect(userResult.error).toBeUndefined();
      expect(userResult.data).toBeDefined();
      expect(userResult.data?.email).toBe(email!.toLowerCase());
    });

    it('should fail when email is already taken', async () => {
      const user = await createTestUser();
      expect(user).not.toBeNull();

      const result = await apiClient.register(user!.email, 'password123');

      expect(result.data).toBeUndefined();
      expect(result.error).toBeDefined();
    });

    it('should fail when password is too short', async () => {
      const email = await generateEmail();
      expect(email).not.toBeNull();

      const result = await apiClient.register(email!, '123');

      expect(result.data).toBeUndefined();
      expect(result.error).toBeDefined();
    });

    it('should downcase email before saving', async () => {
      const email = await generateEmail();
      expect(email).not.toBeNull();

      const uppercaseEmail = email!.toUpperCase();
      const password = 'testPassword123';
      const result = await apiClient.register(uppercaseEmail, password);

      expect(result.error).toBeUndefined();
      expect(result.data).toBeDefined();
      expect(result.data?.user.email).toBe(email!.toLowerCase());
    });
  });

  describe('Authentication Flow', () => {
    it('should successfully login with valid credentials', async () => {
      const user = await createTestUser();
      expect(user).not.toBeNull();

      const result = await apiClient.login(user!.email, user!.password);

      expect(result.error).toBeUndefined();
      expect(result.data).toBeDefined();
      expect(result.data?.message).toBe('Logged in successfully');
      expect(result.data?.user).toBeDefined();
      expect(result.data?.user.email).toBe(user!.email);
      expect(result.data?.user.id).toBeTypeOf('number');
    });

    it('should fail login with invalid credentials', async () => {
      const result = await apiClient.login('invalid@example.com', 'wrongpassword');

      expect(result.data).toBeUndefined();
      expect(result.error).toBeDefined();
      expect(result.error).toBe('Invalid email or password');
    });

    it('should successfully logout', async () => {
      const user = await createTestUser();
      expect(user).not.toBeNull();

      // First login
      await apiClient.login(user!.email, user!.password);

      // Then logout
      const result = await apiClient.logout();

      expect(result.data).toBeDefined();
      expect(result.data?.message).toBe('Logged out successfully');
      expect(result.error).toBeUndefined();
    });
  });

  describe('User Information', () => {
    it('should get current user when authenticated', async () => {
      const user = await createTestUser();
      expect(user).not.toBeNull();

      // First login
      const loginResult = await apiClient.login(user!.email, user!.password);
      expect(loginResult.error).toBeUndefined();

      // Get current user
      const result = await apiClient.getCurrentUser();

      expect(result.data).toBeDefined();
      expect(result.data?.id).toBeTypeOf('number');
      expect(result.data?.email).toBe(user!.email);
      expect(result.data?.created_at).toBeDefined();
      expect(result.error).toBeUndefined();
    });

    it('should fail to get current user when not authenticated', async () => {
      // First logout to ensure we're not authenticated
      await apiClient.logout();

      // Try to get current user
      const result = await apiClient.getCurrentUser();

      expect(result.data).toBeUndefined();
      expect(result.error).toBeDefined();
      expect(result.error).toBe('Unauthorized');
    });
  });

  describe('Complete Authentication Workflow', () => {
    it('should handle complete login -> get user -> logout workflow', async () => {
      const user = await createTestUser();
      expect(user).not.toBeNull();

      // Step 1: Login
      const loginResult = await apiClient.login(user!.email, user!.password);
      expect(loginResult.data).toBeDefined();
      expect(loginResult.error).toBeUndefined();

      // Step 2: Get current user
      const userResult = await apiClient.getCurrentUser();
      expect(userResult.data).toBeDefined();
      expect(userResult.data?.email).toBe(user!.email);
      expect(userResult.error).toBeUndefined();

      // Step 3: Logout
      const logoutResult = await apiClient.logout();
      expect(logoutResult.data).toBeDefined();
      expect(logoutResult.error).toBeUndefined();

      // Step 4: Verify user is logged out
      const unauthorizedResult = await apiClient.getCurrentUser();
      expect(unauthorizedResult.data).toBeUndefined();
      expect(unauthorizedResult.error).toBe('Unauthorized');
    });
  });

  describe('Session Persistence', () => {
    it('should maintain session across multiple requests', async () => {
      const user = await createTestUser();
      expect(user).not.toBeNull();

      // Login
      const loginResult = await apiClient.login(user!.email, user!.password);
      expect(loginResult.error).toBeUndefined();

      // Make multiple authenticated requests
      const result1 = await apiClient.getCurrentUser();
      const result2 = await apiClient.getCurrentUser();
      const result3 = await apiClient.getCurrentUser();

      expect(result1.data?.email).toBe(user!.email);
      expect(result2.data?.email).toBe(user!.email);
      expect(result3.data?.email).toBe(user!.email);
    });
  });

  describe('Error Handling', () => {
    it('should handle missing email parameter gracefully', async () => {
      const user = await createTestUser();
      expect(user).not.toBeNull();

      const result = await apiClient.login('', user!.password);

      expect(result.error).toBeDefined();
    });

    it('should handle missing password parameter gracefully', async () => {
      const user = await createTestUser();
      expect(user).not.toBeNull();

      const result = await apiClient.login(user!.email, '');

      expect(result.error).toBeDefined();
    });
  });
});
