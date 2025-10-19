import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ObmDomain',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      // Externalize dependencies that shouldn't be bundled into the library
      external: ['@reduxjs/toolkit'],
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
