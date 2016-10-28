import gulp from 'gulp';
import errorHandler from '../helpers/errorHandler';

import webpackGulp from 'webpack-stream';
import named from 'vinyl-named';

import config from '../config';
import configWebpack from '../webpack';

const myConfigWebpack = Object.assign({}, configWebpack);
delete myConfigWebpack.entry;

gulp.task('webpack', () => gulp
  .src(config.src + '/*.*')
  .pipe(errorHandler())
  .pipe(named())
  .pipe(webpackGulp(myConfigWebpack))
  .pipe(gulp.dest(config.dest))
);
