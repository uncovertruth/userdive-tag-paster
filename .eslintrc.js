module.exports = {
  extends: [
    '@uncovertruth/eslint-config',
    "plugin:flowtype/recommended"
  ],
  plugins: [
    "flowtype"
  ],
  parser: 'babel-eslint',
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
