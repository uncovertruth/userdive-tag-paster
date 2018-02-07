/* @flow */
module.exports = {
  extends: ['@uncovertruth/eslint-config', '@uncovertruth/eslint-config-react'],
  rules: {
    'react/prop-types': 0 // use Flow Type
  },
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
