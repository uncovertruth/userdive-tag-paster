/* @flow */
import 'jest'
import chrome from 'chrome-jest-mock'

describe('options', () => {
  beforeEach(() => {
    window.chrome = chrome
  })

  test.skip('defined', () => {
    const Options = require('../app/js/options').default
    expect(Options)
  })
})
