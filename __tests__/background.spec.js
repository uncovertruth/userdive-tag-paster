/* @flow */
import 'jest'
import chrome from 'chrome-jest-mock'

describe('background', () => {
  beforeEach(() => {
    window.chrome = chrome
  })

  test.skip('defined', () => {
    const Background = require('../app/js/background').default
    expect(Background)
  })
})
