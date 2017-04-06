import path from 'path';
import webpack from 'webpack';

module.exports = {
  entry: './app/scripts.babel/popup.js',
  output: {
    path: path.resolve(__dirname, 'app/scripts'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
};
