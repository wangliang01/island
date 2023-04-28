module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 11,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: ['prettier', '@typescript-eslint'],

  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],

  rules: {
    'prettier/prettier': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off'
  }
}
