module.exports = {
  'extends': 'standard',
  'parser': 'babel-eslint',
  'plugins': [
    'standard'
  ],
  'env': {
    'browser': true,
    'mocha': true,
    'node': true
  },
  'globals': {
    'chrome': true
  },
  'rules': {
    'semi': [2, 'always']
  }
};
