import path from 'path'
import webpack from 'webpack'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'

module.exports = {
  entry: {
    background: path.resolve(__dirname, 'app/entrypoint/background.js'),
    chromereload: path.resolve(__dirname, 'app/entrypoint/chromereload.js'),
    contentscript: path.resolve(__dirname, 'app/entrypoint/contentscript.js'),
    options: path.resolve(__dirname, 'app/entrypoint/options.jsx'),
    popup: path.resolve(__dirname, 'app/entrypoint/popup.js')
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
