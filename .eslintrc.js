module.exports = {
  root: true,
  env: {
    "browser": true,
    "es6": true
  },
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "prettier"
  ],
  globals: {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    "@typescript-eslint",
    "prettier"
  ],
  parserOptions: {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  rules: {
    "prettier/prettier": "error",
    'no-tabs': 'off',
    'no-mixed-spaces-and-tabs': 0,
    'eqeqeq': ['error', 'always'],
    '@typescript-eslint/class-name-casing': 'error'
  },
};
