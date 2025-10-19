import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    projects: [
      {
        test: {
          name: 'unit',
          environment: 'node',
          include: ['tests/features/**/*.test.ts'],
        },
      },
      {
        test: {
          name: 'integration',
          browser: {
            enabled: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
            headless: true,
          },
          include: ['tests/integration/**/*.integration.test.ts'],
        },
      },
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  envDir: '.',
  envPrefix: 'VITE_',
});
