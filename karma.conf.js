var loaders = require('./config.d/loaders')
var resolve = require('./config.d/resolve')

loaders[0].query.presets = [
  'es2015',
  'babel-plugin-espower'
]

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'test/*test.js'
    ],
    preprocessors: {
      'test/*test.js': ['webpack']
    },
    webpack: {
      module: {
        loaders: loaders
      },
      resolve: resolve
    },
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['jsdom'],
    plugins: [
      require('karma-mocha'),
      require('karma-jsdom-launcher'),
      require('karma-webpack')
    ],
    singleRun: true,
    concurrency: Infinity
  })
}
