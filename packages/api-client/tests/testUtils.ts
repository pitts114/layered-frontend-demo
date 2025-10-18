/**
 * Test utilities for integration tests
 */

const TEST_SERVER_CONFIG = {
  hostname: import.meta.env.VITE_TEST_API_HOSTNAME || 'localhost',
  port: import.meta.env.VITE_TEST_API_PORT ? parseInt(import.meta.env.VITE_TEST_API_PORT) : 3000,
  protocol: (import.meta.env.VITE_TEST_API_PROTOCOL as 'http' | 'https') || 'http',
};

/**
 * Helper function to create a test user via the factory API
 */
export async function createTestUser(
  email?: string,
  password?: string
): Promise<{
  id: number;
  email: string;
  password: string;
  created_at: string;
} | null> {
  try {
    const baseUrl = `${TEST_SERVER_CONFIG.protocol}://${TEST_SERVER_CONFIG.hostname}:${TEST_SERVER_CONFIG.port}`;
    const body: { email?: string; password?: string } = {};

    if (email) body.email = email;
    if (password) body.password = password;

    const response = await fetch(`${baseUrl}/api/factory/create_user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: Object.keys(body).length > 0 ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      console.error('Failed to create test user via factory:', response.status);
      return null;
    }

    return (await response.json()) as {
      id: number;
      email: string;
      password: string;
      created_at: string;
    };
  } catch (error) {
    console.error('Error creating test user:', error);
    return null;
  }
}

export { TEST_SERVER_CONFIG };
