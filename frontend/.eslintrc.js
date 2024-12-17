module.exports = {
  extends: [
    '../.eslintrc.js',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
    project: 'tsconfig.json',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },
  overrides: [
    {
      files: ['vite.config.ts', 'vitest.config.ts', '*.config.ts'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: 'tsconfig.node.json'
      },
      rules: {
        'import/no-default-export': 'off'
      }
    }
  ],
  ignorePatterns: [
    'dist',
    'node_modules',
    '*.config.js',
    '*.config.cjs',
    'coverage'
  ]
};
