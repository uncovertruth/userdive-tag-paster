exports.moduleConfig = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.vue$/,
      exclude: /node_modules/,
      loader: 'vue-loader'
    }
  ]
};

exports.resolveConfig = {
  extensions: ['.js', '.vue'],
  alias: {
    vue: 'vue/dist/vue.runtime.esm'
  }
};
