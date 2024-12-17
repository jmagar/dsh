import { defineConfig } from 'vitest/config';
import type { UserConfigExport } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', 'build'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/setupTests.ts',
        '**/*.d.ts',
        '**/*.test.{ts,tsx}',
        '**/__mocks__/**'
      ]
    }
  },
  plugins: [
    {
      ...react({
        jsxRuntime: 'automatic',
        jsxImportSource: 'react',
        babel: {
          plugins: [['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]],
        },
      }),
      name: 'vite:react'
    },
    {
      ...tsconfigPaths(),
      name: 'vite:tsconfig-paths'
    }
  ]
} as UserConfigExport); 