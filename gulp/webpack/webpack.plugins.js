import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import config from '../config';

// extracts CSS
export const extructCSS = new ExtractTextPlugin(
  `${ config.assets.styles }/style.css`, {
    allChunks: true,
    disable: config.isDevelopment,
  }
);

const plugins = [
  extructCSS,
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(config.NODE_ENV) },
    ENV: JSON.stringify(config),
  }),
];

if (config.isDevelopment) {
  plugins.push(
    new webpack.HotModuleReplacementPlugin());
}

if (config.isProduction) {
  plugins.push(
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
      compress: { warnings: false },
    }));
}

export default plugins;
