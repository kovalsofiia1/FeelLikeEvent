// https://docs.expo.dev/guides/using-eslint/

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'expo',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from @typescript-eslint/eslint-plugin
    'plugin:react/recommended',
    'plugin:react-native/all',
  ],
  plugins: ['@typescript-eslint', 'react', 'react-native'],
  rules: {
    '@typescript-eslint/ban-types': 'warn',
    // add other custom rules if needed
  },
  settings: {
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to resolve imports
    },
  },
};
