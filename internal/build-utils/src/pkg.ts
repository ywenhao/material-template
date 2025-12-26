// import { PKG_NAME } from '@material-template/build-constants'
// import { findWorkspacePackages } from '@pnpm/workspace.find-packages'
import { resolve } from 'node:path'

export const getPath = (path: string) => resolve(process.cwd(), path)

// export async function getMainPrefix() {
//   const list = await findWorkspacePackages(getPath('./packages'))
//   const item = list.find((item) => item.manifest?.name === PKG_NAME)
//   return item?.rootDir.split(/(\/packages\/|\\packages\\)/).pop()
// }
