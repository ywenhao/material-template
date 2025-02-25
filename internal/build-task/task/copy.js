import { dest } from 'gulp'
import { src } from 'gulp'
import { deleteAsync } from 'del'

export function copyDts() {
  return src('../../dist/types/packages/**/*').pipe(dest('../../dist/', { overwrite: true }))
}

export function copyMainDts() {
  return src('../../dist/types/packages/main/*').pipe(dest('../../dist/', { overwrite: true }))
}

export function cleanMainDts() {
  return deleteAsync('../../dist/types/packages/main', { force: true })
}

export function cleanSourceDts() {
  return deleteAsync('../../dist/types', { force: true })
}

export function copyPackageJson() {
  return src('../../packages/main/package.json').pipe(dest('../../dist/', { overwrite: true }))
}
