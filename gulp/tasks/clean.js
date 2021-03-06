import gulp from 'gulp';
import del from 'del';

import config from '../config';

gulp.task('clean', (/* cb */) => {
  try {
    del.sync(config.dest);
  } catch (e) {
    /* eslint no-console: 0 */
    console.log('%s do not clean', config.dest);
  }
});
