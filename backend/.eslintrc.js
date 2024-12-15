module.exports = {
  extends: [
    '../.eslintrc.js', 
    'plugin:security/recommended-legacy'
  ],
  plugins: ['security'],
  rules: {
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
    {
      files: ['tests/**/*.ts'],
      rules: {
        'no-process-env': 'off',
      },
    },
  ],
};
