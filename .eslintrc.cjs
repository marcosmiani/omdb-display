module.exports = {
  // files: ['./src/**/*.tsx', './src/**/*.ts', , './src/**/*.js'],
  ignorePatterns: ['node_modules', '.yarn', 'src/vite-env.d.ts'],
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: [
    'react'
  ],
  rules: {
  }
}
