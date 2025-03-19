import { ConfigEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { getMainPrefix, getPath } from '@material-template/build-utils'

// https://vite.dev/config/
export default async (_configEnv: ConfigEnv) => {
  const mainPrefix = await getMainPrefix()

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
              let name = chunkInfo.names[0]
              if (name.startsWith('components/')) {
                name = name.replace('components/', '')
                name = name.replace('src/style/', '')
              }

              return `style/${name}`
            },
            entryFileNames: (chunkInfo) => {
              let name = chunkInfo.name
              if (name.startsWith(`${mainPrefix}/`)) {
                name = name.replace(`${mainPrefix}/`, '')
              }

              if (!['index', '.vue'].some((v) => name.endsWith(v))) {
                return name
              }

              return name + '.js'
            },
          },
        ],
      },
    },
  })
}
