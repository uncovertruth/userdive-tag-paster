exports.moduleConfig = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader?modules']
    }
  ]
}

exports.resolveConfig = {
  extensions: ['.js', '.jsx']
}
