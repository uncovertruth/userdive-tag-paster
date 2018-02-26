import * as path from 'path'
import * as UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import * as webpack from 'webpack'

module.exports = {
  entry: {
    background: path.resolve(__dirname, 'app/entrypoint/background.ts'),
    chromereload: path.resolve(__dirname, 'app/entrypoint/chromereload.ts'),
    contentscript: path.resolve(__dirname, 'app/entrypoint/contentscript.ts'),
    options: path.resolve(__dirname, 'app/entrypoint/options.tsx'),
    popup: path.resolve(__dirname, 'app/entrypoint/popup.tsx')
  },
  output: {
    path: path.resolve(__dirname, 'app/scripts'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: ['ts-loader']
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader?modules']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        output: {
          comments: false
        }
      }
    })
  ]
}
