import path from 'path';
import autoprefixer from 'autoprefixer';

import config from '../config';
import loaders, { cssLoader } from './webpack.loaders';
import plugins from './webpack.plugins';

export default {
  cache: true,

  context: path.resolve(config.src),

  entry: [
    `webpack-dev-server/client?http://0.0.0.0:${ config.server.port }`,
    'webpack/hot/only-dev-server',
    './main',
  ],

  resolve: {
    root: [
      path.resolve(config.src),
      path.resolve('./node_modules/'),
    ],
    alias: {
    },
    extensions: ['', '.js', '.jsx'],
  },

  output: {
    path: path.resolve(config.dest),
    publicPath: config.isDevelopment ? `http://localhost:${ config.server.port }/` : '',
    filename: config.assets.scripts + '/[name].js',
    chunkFilename: config.assets.scripts + '/[name]-[id].chunk.js',
  },

  watch: config.isDevelopment,

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /\/node_modules\//,
      },
    ],

    loaders: loaders,
  },

  plugins,

  cssLoader,

  postcss: () => [
    autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false,
    }),
  ],

  sassLoader: {
    sourceMap: config.isDevelopment,
  },

  devtool: config.isDebug ? 'source-map' : false,

  devServer: {
    port: config.server.port,
    hot: true,
    contentBase: config.dest,
    historyApiFallback: true,
    quiet: false,
    open: true,
    stats: { colors: true },
  },
};
