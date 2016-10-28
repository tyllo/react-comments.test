import gulp from 'gulp';
import gutil from 'gulp-util';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import configWebpack from '../webpack';

const URL = `http://localhost:${ configWebpack.devServer.port }/webpack-dev-server/index.html`;

gulp.task('webpack-dev-server', (/* cb */) => {
  // Start a webpack-dev-server
  return new WebpackDevServer(webpack(configWebpack), configWebpack.devServer)
    .listen(configWebpack.devServer.port, 'localhost', err => {
      if (err) throw new gutil.PluginError('webpack-dev-server', err);
      gutil.log('[webpack-dev-server]', URL);
    });
});
