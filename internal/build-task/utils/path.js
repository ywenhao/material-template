import { join } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

const dirname = fileURLToPath(new URL('.', import.meta.url))

export const distPath = join(dirname, '../../../dist')
export const packagesPath = join(dirname, '../../../packages')
