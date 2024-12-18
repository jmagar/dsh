module.exports = {
  extends: ['../.eslintrc.cjs', 'plugin:security/recommended-legacy'],
  plugins: ['security'],
  rules: {
    'security/detect-object-injection': 'warn',
    'security/detect-non-literal-fs-filename': 'warn',
    'security/detect-non-literal-require': 'warn',
    'security/detect-eval-with-expression': 'error'
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
      }
    },
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
