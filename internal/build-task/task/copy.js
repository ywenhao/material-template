import { dest } from 'gulp'
import { src } from 'gulp'

export function copyPackageJson() {
  return src('../../packages/main/package.json').pipe(dest('../../dist/'))
}
