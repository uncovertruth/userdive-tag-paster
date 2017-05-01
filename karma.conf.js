const webpackConfigs = require('./webpack.karma.js');

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    client: {
      mocha: {
        ui: 'bdd'
      }
    },
    files: [
      'test/*.js',
      'test/*.html'
    ],
    exclude: [
    ],
    preprocessors: {
      'test/*.js': ['webpack'],
      'test/*.html': ['html2js']
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
      'karma-chrome-launcher',
      'karma-html2js-preprocessor'
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
