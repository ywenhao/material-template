import { fileURLToPath, URL } from 'node:url'

import { ConfigEnv, defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { findWorkspacePackages } from '@pnpm/workspace.find-packages'

const getPath = (path: string) => fileURLToPath(new URL(path, import.meta.url))

async function getMainPrefix() {
  const list = await findWorkspacePackages(getPath('./packages'))
  const item = list.find((item) => item.manifest?.name === 'material-template')
  return item?.rootDir.split(/(\/packages\/|\\packages\\)/).pop()
}

// https://vite.dev/config/
export default async (configEnv: ConfigEnv) => {
  const mainPrefix = await getMainPrefix()

  return defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@material-template': getPath('./packages'),
        'material-template': getPath('./packages/main'),
      },
    },
    build: {
      minify: true,
      rollupOptions: {
        input: ['./packages/main/index.ts'],
        // 保持原样import扩展这里
        external: ['vue', '@vueuse/core'],
        preserveEntrySignatures: 'exports-only',
        output: [
          {
            format: 'es',
            // 打包保持目录结构
            preserveModules: true,
            exports: 'named',
            dir: getPath('./dist'),
            entryFileNames: (chunkInfo) => {
              let name = chunkInfo.name
              if (name.startsWith(`${mainPrefix}/`)) {
                name = name.replace(`${mainPrefix}/`, '')
              }
              return name + '.js'
            },
          },
        ],
      },
    },
  })
}
