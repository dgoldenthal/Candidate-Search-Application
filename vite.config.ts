import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
      host: true
    },
    preview: {
      port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
      host: true
    },
    define: {
      'process.env.VITE_GITHUB_TOKEN': JSON.stringify(env.VITE_GITHUB_TOKEN)
    }
  };
});