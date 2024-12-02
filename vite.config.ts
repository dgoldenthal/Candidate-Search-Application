import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  envDir: './environment',
  plugins: [react()],
  preview: {
    port: 10000,
    host: true
  },
  server: {
    host: true
  }
});