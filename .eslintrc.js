/* @flow */
module.exports = {
  extends: [
    '@uncovertruth/eslint-config-flowtype',
  ],
  env: {
    'node': true
  },
  globals: {
    'chrome': true
  },
  rules: {
    'semi': [2, 'always']
  }
}
