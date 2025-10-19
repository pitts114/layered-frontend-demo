import { ApiClient } from '@obm/api-client';

export const apiClient = new ApiClient({
  hostname: import.meta.env.VITE_API_HOSTNAME || 'localhost',
  port: import.meta.env.VITE_API_PORT ? parseInt(import.meta.env.VITE_API_PORT, 10) : 3000,
  protocol: (import.meta.env.VITE_API_PROTOCOL as 'http' | 'https') || 'http',
});
