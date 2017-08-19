/* @flow */
import 'jest'

describe('contents', () => {
  const Provider = require('../app/js/contentscript').default

  test('defined', () => {
    expect(Provider)
  })
})
