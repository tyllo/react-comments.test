import gulp from 'gulp';

gulp.task('default', [
  'clean',
  'templates',
  'watch',
  'webpack-dev-server',
]);
