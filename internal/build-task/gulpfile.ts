import { series, src } from 'gulp'
import { copyPackageJson } from './task/copy'
import { withTaskName } from './utils/glup.js'

export function copy() {
  return copyPackageJson()
}

export default function defaultTask() {
  series(withTaskName('copy:packageJson', copyPackageJson))
}
