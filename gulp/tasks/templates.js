import gulp from 'gulp';
import errorHandler from '../helpers/errorHandler';
import pug from 'pug';
import gulpPug from 'gulp-pug';

import config from '../config';

const LOCALES = { config };

gulp.task('templates', () => gulp
  .src(config.templates.src)
  .pipe(errorHandler())
  .pipe(gulpPug({
    locals: LOCALES,
    pug: pug,
    pretty: config.isDebug,
  }))
  .pipe(gulp.dest(config.dest))
);
