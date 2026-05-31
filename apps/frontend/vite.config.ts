import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'http://localhost:4000',
      '/messages': 'http://localhost:4000',
    },
  },
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../../packages/shared/src'),
    },
  },
});
