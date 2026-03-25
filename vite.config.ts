import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    checker({
      typescript: true,
      eslint: {
        useFlatConfig: true,
        lintCommand: 'eslint . --ext ts,tsx',
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        hoistTransitiveImports: true,
        manualChunks: {
          tanstack: ['@tanstack/react-virtual', '@tanstack/react-form'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
