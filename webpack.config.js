var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    loader: path.join(__dirname, 'src/loader.js')
  },
  output: {
    // sourceMapFilename: '[name].bundle.map',
    path: path.join(__dirname, 'dist/'),
    filename: '[name].min.js'
  },
  // devtool: '#source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolve: {
    root: path.join(__dirname, 'src'),
    modulesDirectories: [
      'node_modules'
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      mangle: true,
      preserveComments: false,
      minimize: false
    }),
    new ExtractTextPlugin('[name].min.css')
  ]
}
