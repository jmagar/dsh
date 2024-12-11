module.exports = {
  extends: ['../.eslintrc.js'],
  plugins: ['security'],
  settings: {
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  rules: {
    'no-process-env': 'error',
    'security/detect-object-injection': 'warn',
    'security/detect-non-literal-fs-filename': 'warn',
    'security/detect-non-literal-require': 'warn',
    'security/detect-eval-with-expression': 'error',
  },
  overrides: [
    {
      files: ['src/config/**/*.ts'],
      rules: {
        'no-process-env': 'off',
      },
    },
  ],
};
