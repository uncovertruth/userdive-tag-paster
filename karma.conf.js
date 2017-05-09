const { moduleConfig, resolveConfig } = require('./webpack.base')

const karmaConfig = {
  basePath: '',
  frameworks: ['mocha'],
  files: ['test/*.js', 'test/fixtures/*.html'],
  exclude: [],
  preprocessors: {
    'test/*.js': ['webpack'],
    'test/fixtures/*.html': ['html2js']
  },
  webpack: {
    module: moduleConfig,
    resolve: resolveConfig,
    node: {
      fs: 'empty'
    }
  },
  browsers: ['Chrome'],
  singleRun: true,
  customLaunchers: {
    Chrome_travis_ci: {
      base: 'Chrome',
      flags: ['--no-sandbox']
    }
  }
}

module.exports = config => {
  if (process.env.TRAVIS) {
    karmaConfig.browsers = ['Chrome_travis_ci']
  }
  config.set(karmaConfig)
}
