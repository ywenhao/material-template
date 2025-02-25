import gulp from 'gulp'
import { cleanMainDts, cleanSourceDts, copyDts, copyMainDts, copyPackageJson } from './task/copy.js'
import { cleanTest } from './task/test.js'
import { replaceAlias } from './task/replace.js'

export default gulp.series(
  gulp.parallel(copyPackageJson, gulp.series(copyMainDts, cleanMainDts, copyDts, cleanSourceDts)),
  replaceAlias,
)
