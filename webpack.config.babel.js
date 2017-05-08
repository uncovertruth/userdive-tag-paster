import path from 'path';
import webpack from 'webpack';
import { moduleConfig, resolveConfig } from './webpack.base.js';

module.exports = {
  module: moduleConfig,
  resolve: resolveConfig,
  entry: {
    popup: './app/scripts.babel/popup.js'
  },
  output: {
    path: path.resolve(__dirname, 'app/scripts'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
};
