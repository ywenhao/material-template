import { ConfigEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { getPath } from '@material-template/build-utils'

// https://vite.dev/config/
export default async (_configEnv: ConfigEnv) => {
  return defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@material-template': getPath('./packages'),
      },
    },
    build: {
      minify: true,
      emptyOutDir: false,
      rollupOptions: {
        // 入口
        input: ['./packages/components/index.scss'],
        // 保持原样import扩展这里
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
          },
        ],
      },
    },
  })
}
