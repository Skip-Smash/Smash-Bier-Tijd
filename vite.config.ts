import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: './', // Crucial for GitHub Pages to load assets correctly with relative paths
    plugins: [react()],
    define: {
      // Dit zorgt ervoor dat process.env.API_KEY werkt in de browser na de build
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      'process.env': process.env
    }
  };
});