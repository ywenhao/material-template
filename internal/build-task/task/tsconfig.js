import { deleteAsync } from 'del'
import { join } from 'node:path'
import { distPath } from '../utils/path.js'

export async function cleanTsBuildinfo() {
  return deleteAsync(join(distPath, 'tsconfig.*.tsbuildinfo'), { force: true })
}
