import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/index'],
  clean: true,
  declaration: true,
  externals: ['vite'],
  outDir: '../../dist/build-plugins',
  rollup: {
    emitCJS: false,
  },
})
