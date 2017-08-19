/* @flow */
module.exports = {
  extends: [
    '@uncovertruth/eslint-config-flowtype',
    '@uncovertruth/eslint-config-react'
  ],
  plugins: ['jest'],
  env: {
    node: true,
    'jest/globals': true
  },
  globals: {
    chrome: true
  },
  settings: {
    react: {
      pragma: 'h'
    }
  }
}
