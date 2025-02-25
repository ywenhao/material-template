import { series, src } from 'gulp'
import { copyPackageJson } from './task/copy.js'
import { withTaskName } from './utils/glup.js'
import { parallel } from 'gulp'

const main = series(parallel(withTaskName('copy:packageJson', copyPackageJson)))
export default main
