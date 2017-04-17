const webpackConfigs = require('./webpack.karma.js');

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
    webpack: webpackConfigs,
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
