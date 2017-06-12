import path from 'path'
import webpack from 'webpack'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import { moduleConfig, resolveConfig } from './webpack.base'

module.exports = {
  module: moduleConfig,
  resolve: resolveConfig,
  entry: {
    'app/scripts/contentscript': path.resolve(__dirname, 'app/js/contentscript.js'),
    'app/scripts/background': path.resolve(__dirname, 'app/js/background.js'),
    'dist/scripts/options': path.resolve(__dirname, 'app/js/options.js'),
    'dist/scripts/popup': path.resolve(__dirname, 'app/js/popup.js')
  },
  output: {
    path: __dirname,
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      comments: false
    })
  ]
}
