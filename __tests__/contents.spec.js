/* @flow */
import 'jest'

describe('contents', () => {
  test.skip('defined', () => {
    const Provider = require('../app/entrypoint/contentscript').default
    expect(Provider)
  })
})
