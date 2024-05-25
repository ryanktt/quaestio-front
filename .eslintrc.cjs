module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  // extends: ['eslint:recommended', 'plugin:react-hooks/recommended'],
  ignorePatterns: ['dist', '*.cjs', '*.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  parserOptions: {
    project: './tsconfig.json', // path of tsconfig file
  },
  rules: {
    'prettier/prettier': 'error', // Ensure Prettier errors are shown
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
  overrides: [
    {
      files: ['*.tsx', '*.ts'],
      extends: [
        // 'plugin:@typescript-eslint/recommended',
        // 'eslint:recommended',
        // 'plugin:react-hooks/recommended',
        'airbnb/hooks',
        'airbnb-typescript',
        'airbnb',
        'plugin:prettier/recommended', // Add Prettier
      ],
      plugins: ['@typescript-eslint', 'prettier'],
      rules: {
        'react/jsx-filename-extension': [0, { extensions: ['.js', '.jsx'] }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/comma-spacing': 'error',
        'import/no-extraneous-dependencies': 'off',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/semi': 'error',
        'react/react-in-jsx-scope': 'off',
        'import/no-unresolved': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'no-shadow': 'off',
      },
    },
  ],
};
