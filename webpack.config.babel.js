import path from 'path'
import webpack from 'webpack'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'

module.exports = {
  entry: {
    contentscript: path.resolve(__dirname, 'app/js/contentscript.js'),
    background: path.resolve(__dirname, 'app/js/background.js'),
    options: path.resolve(__dirname, 'app/js/options.js'),
    popup: path.resolve(__dirname, 'app/js/popup.js')
  },
  output: {
    path: path.resolve(__dirname, 'app/scripts'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader?modules']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
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
