import { defineConfig } from 'vite-plus/pack'

export default defineConfig({
  entry: ['./src/index.ts'],
  clean: true,
  dts: true,
  tsconfig: false,
  format: ['esm'],
})
