import { dest } from 'gulp'
import { src } from 'gulp'
import { deleteAsync } from 'del'
import { join } from 'node:path'
import { distPath, packagesPath } from '../utils/path.js'

export function copyDts() {
  return src(join(distPath, 'types/packages/**/*')).pipe(dest(distPath, { overwrite: true }))
}

export function copyMainDts() {
  return src(join(distPath, 'types/packages/main/*')).pipe(dest(distPath, { overwrite: true }))
}

export function cleanMainDts() {
  return deleteAsync(join(distPath, 'types/packages/main'), { force: true })
}

export function cleanSourceDts() {
  return deleteAsync(join(distPath, 'types'), { force: true })
}

export function copyPackageJson() {
  return src(join(packagesPath, 'main/package.json')).pipe(dest(distPath, { overwrite: true }))
}
