import gulp from 'gulp'
import { cleanMainDts, cleanSourceDts, copyDts, copyMainDts, copyPackageJson } from './task/copy.js'
import { replaceAlias } from './task/replace.js'
import { cleanTsBuildinfo } from './task/tsconfig.js'

export default gulp.series(
  gulp.parallel(copyPackageJson, gulp.series(copyMainDts, cleanMainDts, copyDts, cleanSourceDts)),
  replaceAlias,
  cleanTsBuildinfo,
)
