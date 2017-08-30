module.exports = {
  collectCoverage: true,
  moduleNameMapper: {
    'react-dom/server': 'preact-render-to-string',
    '^react-dom/test-utils$': 'preact-test-utils',
    '^react-dom$': 'preact-compat-enzyme',
    '^react-test-renderer/shallow$': 'preact-test-utils',
    '^react-test-renderer$': 'preact-test-utils',
    '^react-addons-test-utils$': 'preact-test-utils',
    '^react$': 'preact-compat-enzyme'
  }
}
