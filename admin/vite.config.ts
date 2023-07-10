import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@darkforest_eth/procedural', '@darkforest_eth/constants'],
    // 👈 optimizedeps
    esbuildOptions: {
      target: 'esnext',
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      supported: {
        bigint: true,
      },
    },
  },

  build: {
    target: ['esnext'], // 👈 build.target
    commonjsOptions: {
      include: [/packages/, /node_modules/],
    },
  },
});
