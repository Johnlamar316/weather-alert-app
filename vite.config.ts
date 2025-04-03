/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // ✅ required for aliasing paths

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      utils: path.resolve(__dirname, 'src/utils'),
      states: path.resolve(__dirname, 'src/states'),
      pages: path.resolve(__dirname, 'src/pages'),
      components: path.resolve(__dirname, 'src/components'),
      types: path.resolve(__dirname, 'src/types'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setupGlobalTests.ts',
  },
});
