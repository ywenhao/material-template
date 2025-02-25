import { deleteAsync } from 'del'

export async function cleanTsBuildinfo() {
  return deleteAsync('../../../dist/tsconfig.*.tsbuildinfo', { force: true })
}
