const { moduleConfig, resolveConfig } = require('./webpack.base')

const karmaConfig = {
  basePath: '',
  frameworks: ['mocha'],
  client: {
    mocha: {
      timeout: 5000,
      ui: 'bdd'
    }
  },
  files: ['test/*.js', 'test/fixtures/*.html'],
  exclude: [],
  preprocessors: {
    'test/*.js': ['webpack'],
    'test/fixtures/*.html': ['html2js']
  },
  coverageReporter: {
    reporters: [{ type: 'lcov' }, { type: 'text' }]
  },
  webpack: {
    module: moduleConfig,
    resolve: resolveConfig,
    node: {
      fs: 'empty'
    }
  },
  browsers: ['Chrome'],
  reporters: ['mocha', 'coverage'],
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
