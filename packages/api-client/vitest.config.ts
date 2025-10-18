import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      // Use separate projects for unit tests (Node) and integration tests (Browser)
      projects: [
        {
          test: {
            name: 'unit',
            environment: 'node',
            include: ['tests/apiClient.test.ts'],
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
            include: ['tests/**/*.integration.test.ts'],
          },
        },
      ],
    },
  })
);
