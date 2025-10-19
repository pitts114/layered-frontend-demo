import { ApiClient } from '@obm/api-client';
import { setupStore, type AppStore } from '../../src/store';
import type { Services } from '../../src/services';

/**
 * Creates a Services object with a real ApiClient configured from environment variables.
 * Used for integration tests that communicate with a real API server.
 */
export function createIntegrationServices(): Services {
  const apiClient = new ApiClient({
    hostname: import.meta.env.VITE_API_HOSTNAME || 'localhost',
    port: import.meta.env.VITE_API_PORT ? parseInt(import.meta.env.VITE_API_PORT, 10) : 3000,
    protocol: (import.meta.env.VITE_API_PROTOCOL as 'http' | 'https') || 'http',
  });

  return {
    apiClient,
  };
}

/**
 * Creates a Redux store with real services for integration testing.
 * If no services provided, creates default services from environment variables.
 */
export function createIntegrationStore(services?: Services): AppStore {
  const testServices = services || createIntegrationServices();
  return setupStore(testServices);
}

/**
 * Generates unique test user credentials using the server's factory endpoint.
 * This ensures emails are unique and match the server's validation rules.
 * Returns email and password for registration/login tests.
 */
export async function generateTestUser(): Promise<{
  email: string;
  password: string;
  passwordConfirmation: string;
}> {
  const apiHostname = import.meta.env.VITE_API_HOSTNAME || 'localhost';
  const apiPort = import.meta.env.VITE_API_PORT
    ? parseInt(import.meta.env.VITE_API_PORT, 10)
    : 3000;
  const apiProtocol = (import.meta.env.VITE_API_PROTOCOL as 'http' | 'https') || 'http';

  const response = await fetch(
    `${apiProtocol}://${apiHostname}:${apiPort}/api/factory/generate_email`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to generate test email: ${response.statusText}`);
  }

  const data = (await response.json()) as { email: string };

  return {
    email: data.email,
    password: 'TestPassword123!',
    passwordConfirmation: 'TestPassword123!',
  };
}
