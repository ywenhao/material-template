import { ConfigEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { getPath } from '@material-template/build-utils'

// https://vite.dev/config/
export default async (_configEnv: ConfigEnv) => {
  // const mainPrefix = await getMainPrefix()

  return defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@material-template': getPath('./packages'),
        // 'material-template': getPath('./packages/main'),
      },
    },
    build: {
      minify: true,
      rollupOptions: {
        // 入口
        input: ['./packages/main/index.ts'],
        // 保持原样import扩展这里
        external: ['vue', '@vueuse/core'],
        preserveEntrySignatures: 'exports-only',
        output: [
          {
            format: 'esm',
            // 打包保持目录结构
            preserveModules: true,
            exports: 'named',
            dir: getPath('./dist'),
            assetFileNames: (chunkInfo) => {
              let originalFileName = chunkInfo.originalFileNames[0]
              if (originalFileName) {
                originalFileName = originalFileName
                  .replace('packages/', '')
                  .replace('components/', '')
                  .replace('src/style/', '')
                  .replace('.scss', '.css')
              }

              return `style/${originalFileName}`
            },
            entryFileNames: (chunkInfo) => {
              const name = chunkInfo.name
              let facadeModuleId = chunkInfo.facadeModuleId
              // main入口
              if (facadeModuleId?.includes('/packages/main')) {
                facadeModuleId = facadeModuleId.replace('/packages/main', '/packages')
              }

              if (facadeModuleId) {
                facadeModuleId = facadeModuleId.split('/packages/')[1]
              }

              const dirs = (facadeModuleId ?? '').split('/')
              dirs.pop()
              const dir = dirs.join('/')
              return `${dir ? dir + '/' : ''}${name}.js`
            },
          },
        ],
      },
    },
  })
}
