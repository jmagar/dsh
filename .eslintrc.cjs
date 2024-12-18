const path = require('path');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  ignorePatterns: ['**/dist/**', '**/build/**', '**/node_modules/**', '**/coverage/**'],
  env: {
    node: true,
    es2020: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
      node: true
    },
  },
  rules: {
    'import/no-unresolved': [
      'error',
      {
        ignore: [
          '^@mui/',
          '^@testing-library/',
          '^@reduxjs/',
          '^socket.io-client',
          '^recharts',
          '^react-virtualized-auto-sizer',
          '^react-window',
          '^@monaco-editor/react',
          'dotenv',
          'dotenv/config',
          'express',
          'ws',
          'pg',
          'compression',
          'cors',
          'express-rate-limit',
          'helmet',
          'socket.io',
          '@prisma/client',
          'ioredis',
          'prom-client',
          'winston'
        ]
      }
    ],
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['backend/**/*'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './backend/tsconfig.json',
        sourceType: 'module'
      }
    },
    {
      files: ['frontend/**/*'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './frontend/tsconfig.json',
        sourceType: 'module'
      },
      extends: [
        'plugin:react-hooks/recommended'
      ]
    },
    {
      files: ['shared/**/*'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './shared/tsconfig.json',
        sourceType: 'module'
      }
    }
  ]
};
