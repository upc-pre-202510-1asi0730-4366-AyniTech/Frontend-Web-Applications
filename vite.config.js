import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@iam': path.resolve(__dirname, './src/app/iam'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      'axios',
      'vue3-google-login'
    ],
    exclude: []
  },
  server: {
    port: 5175,
    strictPort: false,
    hmr: {
      overlay: true
    }
  },
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'pinia', 'vue-router'],
          'google-auth': ['vue3-google-login']
        }
      }
    }
  }
});
