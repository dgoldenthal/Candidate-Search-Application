module.exports = {
  root: true,
  env: { 
    browser: true, 
    es2020: true 
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',  // Changed from recommended
    'plugin:@typescript-eslint/stylistic-type-checked', // Added stylistic rules
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',  // Added React recommended rules
    'plugin:react/jsx-runtime'   // Added React JSX runtime rules
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {  // Added parser options as specified
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh', '@typescript-eslint', 'react'],  // Added React plugin
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  settings: {  // Added React settings
    react: {
      version: 'detect'
    }
  }
};