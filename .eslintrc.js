/* @flow */
module.exports = {
  extends: [
    '@uncovertruth/eslint-config-flowtype',
    '@uncovertruth/eslint-config-react'
  ],
  env: {
    node: true
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
