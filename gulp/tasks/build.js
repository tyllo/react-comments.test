import gulp from 'gulp';

gulp.task('build', [
  'clean',
  'templates',
  'webpack',
]);
