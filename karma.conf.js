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
    webpack: {},
    reporters: ['progress'],
    port: 3000,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  });
};
