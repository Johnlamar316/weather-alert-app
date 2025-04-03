import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import * as path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setupGlobalTests.ts',
  },
  //path aliases
  resolve: {
    alias: {
      utils: path.resolve(__dirname, 'src/utils'),
      pages: path.resolve(__dirname, 'src/pages'),
      components: path.resolve(__dirname, 'src/components'),
      states: path.resolve(__dirname, 'src/states'),
      types: path.resolve(__dirname, 'src/types'),
    },
  },
});
