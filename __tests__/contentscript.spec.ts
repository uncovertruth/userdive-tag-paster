import { random } from 'faker'
import { afterEach, beforeEach, describe, expect, test } from 'jest'
import chrome from 'sinon-chrome'
import { inject } from '../app/injector'
import { sleep } from '../app/utils'

declare var require: any
declare var global: any

describe('contents', () => {
  let instance
  const elementId = 'wmd3MCLG6HXn'
  const attrKey = 'vyQqaa4SnJh48'
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

  test('is active, but UDTracker Blocked', async () => {
    chrome.runtime.sendMessage.yields({ isActive: true })
    const config: any = {
      id: random.alphaNumeric(10),
      host: random.alphaNumeric(15)
    }
    inject('wmd3MCLG6HXn', 'vyQqaa4SnJh48', config)
    await sleep(3000)
    return instance.loadState().then(d => expect(d))
  })

  test('is active, but UDTracker failed starting', async () => {
    chrome.runtime.sendMessage.yields({ isActive: true })
    const config: any = {
      id: random.alphaNumeric(10),
      host: random.alphaNumeric(15)
    }
    inject(elementId, attrKey, config)

    setAttr(document.getElementById(elementId), attrKey, { status: 'Failed' })

    return instance.loadState().then(d => expect(d))
  })

  function setAttr (dom: any, key: string, value: any) {
    dom.setAttribute(key, JSON.stringify(value))
  }

  test('is active, should recieve page id', async () => {
    chrome.runtime.sendMessage.yields({ isActive: true })
    const config: any = {
      id: random.alphaNumeric(10),
      host: random.alphaNumeric(15)
    }
    inject(elementId, attrKey, config)

    setAttr(document.getElementById(elementId), attrKey, { pageId: 1 })

    return instance.loadState().then(d => expect(d.pageId).toEqual(1))
  })

  test('render page id as badge', async () => {
    chrome.runtime.sendMessage.yields({ isActive: true })
    const config: any = {
      id: random.alphaNumeric(10),
      host: random.alphaNumeric(15)
    }
    inject(elementId, attrKey, config)
    await sleep(3000)

    return instance.renderPageId()
  })
})
