import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const API_TARGET = process.env.VITE_API_PROXY || 'http://127.0.0.1:5001';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, 'src'),
      // The invoice calculation engine + canonical template live outside the
      // client so the API and the UI can never drift apart.
      '@shared': path.resolve(rootDir, '../shared'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    // Allow the sandbox/preview proxy host to reach the dev server.
    allowedHosts: true,
    proxy: {
      // The browser always talks to the frontend origin; Vite forwards to the API.
      '/api': { target: API_TARGET, changeOrigin: true },
    },
  },
  preview: { host: '0.0.0.0', port: 4173, allowedHosts: true },
  build: { outDir: 'dist', sourcemap: false },
});
