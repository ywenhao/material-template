import { deleteAsync } from 'del'

export function cleanTsBuildinfo() {
  return deleteAsync('../../dist/tsconfig.*.tsbuildinfo', { force: false })
}
