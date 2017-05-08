const moduleConfig = require('../webpack.base.js').moduleConfig;
const resolveConfig = require('../webpack.base.js').resolveConfig;

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    client: {
      mocha: {
        opts: './mocha.opts'
      }
    },
    files: [
      '*.js',
      'fixtures/*.html'
    ],
    exclude: [
    ],
    preprocessors: {
      '*.js': ['webpack'],
      'fixtures/*.html': ['html2js']
    },
    processPath: function (filePath) {
      return filePath.replace(/\.html$/, '');
    },
    webpack: {
      module: moduleConfig,
      resolve: resolveConfig,
      node: {
        fs: 'empty'
      }
    },
    port: 3000,
    colors: true,
    logLevel: config.LOG_INFO,
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
