/* @flow */
import 'jest'
import chrome from 'chrome-jest-mock'

describe('background', () => {
  beforeEach(() => {
    window.chrome = chrome
  })

  test.skip('defined', () => {
    const Background = require('../app/entrypoint/background').default
    expect(Background)
  })
})
