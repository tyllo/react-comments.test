import { extructCSS } from './webpack.plugins';
import config from '../config';

export const cssLoader = {
  sourceMap: config.isDevelopment,
  modules: true,
  importLoaders: true,
  localIdentName: config.isDevelopment ? '[path]-[local]-[hash:5]' : '[hash:5]',
};

function toQuery(obj) {
  return Object.keys(obj).reduce((prev, cur) => {
    return `${ prev }&${ cur }=${ cssLoader[cur] }`;
  }, '?key');
}

const loaders = {};

loaders.js = {
  test: /\.js$/,
  exclude: [/\/node_modules\//, /\/bower_components\//],
  loaders: ['babel'],
};

loaders.jsx = {
  test: /\.jsx$/,
  exclude: [/\/node_modules\//, /\/bower_components\//],
  loaders: config.isDevelopment ? ['react-hot', 'babel'] : ['babel'],
};

loaders.sass = {
  test: /\.(sass|scss|css)$/,
  loader: extructCSS.extract('style', [
    'css?' + toQuery(cssLoader),
    'postcss',
    'sass',
  ]),
};

loaders.url = {
  test: /.*\.(gif|png|jpe?g|svg)$/i,
  // include: [/images/],
  loader: 'url',
  query: {
    limit: 3 * 1024,
    name: config.isDevelopment
      ? config.assets.images + '/[name].[ext]'
      : config.assets.images + '/[name]-[hash:5].[ext]',
  },
};

export default [
  loaders.js,
  loaders.jsx,
  loaders.sass,
  loaders.url,
];
