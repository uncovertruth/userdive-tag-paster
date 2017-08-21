/* @flow */
import 'jest'

describe('contents', () => {
  const Provider = require('../app/entrypoint/contentscript').default

  test('defined', () => {
    expect(Provider)
  })
})
