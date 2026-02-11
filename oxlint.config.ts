import { defineConfig } from 'oxlint'

export default defineConfig({
  plugins: ['eslint', 'typescript', 'unicorn', 'oxc', 'vue'],
  ignorePatterns: ['dist', 'node_modules', '.vscode/extensions.json', 'pnpm-workspace.yaml'],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'no-var': 'error',
    'prefer-const': 'error',
  },
})
