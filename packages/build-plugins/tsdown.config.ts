import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  clean: true,
  dts: true,
  tsconfig: false,
  external: ['vite'],
  outDir: '../../dist/build-plugins',
  format: ['esm'],
})
