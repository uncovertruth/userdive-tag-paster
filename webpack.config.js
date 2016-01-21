var path = require('path')
var webpack = require('webpack')
var loaders = require('./config.d/loaders')
var resolve = require('./config.d/resolve')

module.exports = {
  entry: {
    loader: path.join(__dirname, 'src/loader.js')
  },
  output: {
    // sourceMapFilename: '[name].bundle.map',
    path: path.join(__dirname, 'dist/'),
    filename: '[name].bundle.js'
  },
  // devtool: '#source-map',
  module: {
    loaders: loaders
  },
  resolve: resolve,
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      mangle: true,
      preserveComments: false,
      minimize: false
    })
  ]
}
