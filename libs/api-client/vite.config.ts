import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ApiClient',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled into the library
      external: [],
    },
    sourcemap: true,
    // Generate type declarations
    emptyOutDir: true,
  },
});
