import { isDebug, isDevelopment, isProduction } from './helpers/getArg';
import packageInfo from '../package.json';

const src = './src';
const dest = isProduction ? './build' : './dist';

export default {
  package: packageInfo,
  src: src,
  dest: dest,
  modules: src,

  templates: {
    src: src + '/templates/index.pug',
    watch: src + '/templates/**/*.pug',
  },

  assets: {
    path: 'assets',
    images: 'assets/images',
    scripts: 'assets/scripts',
    styles: 'assets/styles',
  },

  server: {
    port: 8080,
  },

  isProduction,
  isDevelopment,
  isDebug,
  NODE_ENV: isProduction ? 'production' : 'development',
};
