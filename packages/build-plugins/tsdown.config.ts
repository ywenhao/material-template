import { defineConfig } from 'vite-plus/pack'

export default defineConfig({
  entry: ['./src/index.ts'],
  clean: true,
  dts: true,
  tsconfig: false,
  deps: {
    neverBundle: ['vite'],
  },
  outDir: '../../dist/build-plugins',
  format: ['esm'],
})
