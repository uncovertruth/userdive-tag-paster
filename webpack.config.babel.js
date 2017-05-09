import path from 'path'
import webpack from 'webpack'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import { moduleConfig, resolveConfig } from './webpack.base'

module.exports = {
  module: moduleConfig,
  resolve: resolveConfig,
  entry: {
    popup: './app/popup.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist/scripts'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      comments: false
    })
  ]
}
