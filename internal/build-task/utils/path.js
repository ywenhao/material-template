import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const distPath = join(__dirname, '../../../dist')
export const packagesPath = join(__dirname, '../../../packages')

export const PKG_NAME = 'material-template'
export const At_PKG_NAME = '@material-template'
