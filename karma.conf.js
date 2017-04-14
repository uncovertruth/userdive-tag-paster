module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'test/*.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'test/*.js': ['webpack']
    },
    webpack: {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          },
          {
            test: /\.vue$/,
            exclude: /node_modules/,
            loader: 'vue-loader'
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.vue'],
        alias: {
          vue: 'vue/dist/vue.runtime.esm'
        }
      }
    },
    reporters: ['progress'],
    port: 3000,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-chrome-launcher'
    ],
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  });
  if (process.env.TRAVIS) {
    config.browsers = ['Chrome_travis_ci'];
  }
};
