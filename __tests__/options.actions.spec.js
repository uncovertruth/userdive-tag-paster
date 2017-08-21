/* @flow */
import 'jest'

describe('actions/options', () => {
  test.skip('defined', () => {
    const { get } = require('../app/actions/options')
    return get().then(data => expect(data))
  })
})
