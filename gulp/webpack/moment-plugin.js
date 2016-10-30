// also see https://github.com/webpack/webpack/issues/3128

import webpack from 'webpack';

export default new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/);
