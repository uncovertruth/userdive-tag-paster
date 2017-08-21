/* @flow */
import 'jest'
import chrome from 'sinon-chrome'

describe('contents', () => {
  let instance
  beforeEach(() => {
    global.chrome = chrome
    const Provider = require('../app/actions/contentscript').default
    instance = new Provider()
  })

  afterEach(function () {
    chrome.flush()
    delete global.chrome
  })

  test('defined', () => {
    expect(instance)
  })

  test('is not active', () => {
    chrome.runtime.sendMessage.yields({ isActive: false })
    return instance.loadState().then(d => expect(d))
  })

  test('is active, but inject failed', () => {
    chrome.runtime.sendMessage.yields({ isActive: true })
    return instance.loadState().then(d => expect(d))
  })
})
