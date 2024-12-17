// Builtin modules
import { resolve } from 'path';

// External dependencies
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import type { Plugin } from 'vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import type { VitePWAOptions } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

// Constants
const DEFAULT_API_URL = 'http://localhost:8000';
const DEFAULT_WS_URL = 'ws://localhost:8000';

// Helper function to get environment variable with type safety
const getEnvVar = (key: string, defaultValue: string): string => {
  const value = process.env[key];
  return typeof value === 'string' && value.trim() !== '' ? value : defaultValue;
};

// Production mode check
const isProd = process.env.NODE_ENV === 'production';

// Default PWA configuration
const defaultPWAConfig: VitePWAOptions = {
  registerType: 'autoUpdate',
  includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
  manifest: {
    name: 'DSH Application',
    short_name: 'DSH',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  workbox: {
    cleanupOutdatedCaches: true,
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/api\./i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          networkTimeoutSeconds: 10,
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
  // Required properties
  injectRegister: 'auto',
  minify: true,
  injectManifest: {
    injectionPoint: undefined
  },
  includeManifestIcons: true,
  disable: false
};

export default defineConfig(async () => {
  const plugins = [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
      babel: {
        plugins: [['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]],
      },
    }),
    tsconfigPaths(),
    isProd && visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
    VitePWA(defaultPWAConfig),
  ].filter((p): p is Plugin => Boolean(p));

  return {
    plugins,
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@/client': resolve(__dirname, './src/client'),
        '@dsh/shared': resolve(__dirname, '../shared/src'),
      },
    },
    server: {
      port: 3000,
      hmr: {
        overlay: true,
        timeout: 1000,
      },
      open: true,
      proxy: {
        '/api': {
          target: getEnvVar('VITE_API_URL', DEFAULT_API_URL),
          changeOrigin: true,
          secure: false,
        },
        '/ws': {
          target: getEnvVar('VITE_WS_URL', DEFAULT_WS_URL),
          ws: true,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
