/* @flow */
import { inject } from '../injector'
import { sleep } from '../utils'
import thenChrome from 'then-chrome'

function renderBadge (text: string | number): Promise<boolean> {
  return thenChrome.runtime.sendMessage({ bg: 'badge', text })
}

function getConfig (): Promise<Object> {
  return thenChrome.runtime.sendMessage({ bg: 'get' })
}

const STATE_NAME = 'vyQqaa4SnJh48'
const INJECT_ELEMENT_ID = 'wmd3MCLG6HXn'

declare var chrome: any

export default class Provider {
  constructor () {
    window.addEventListener('load', async e => {
      const config = await getConfig()
      if (!config.isActive) {
        renderBadge('OFF')
        this.listenReload()
        return
      }
      inject(INJECT_ELEMENT_ID, STATE_NAME, config)
      ;(async () => {
        await sleep(3000)
        this.renderPageId()
      })()
      this.listen()
    })
  }
  async renderPageId () {
    const state = await this.loadState()
    renderBadge(state.pageId || '?')
  }
  async loadState (): Object {
    const element: any = document.getElementById(INJECT_ELEMENT_ID)
    if (!element) {
      return {
        status: 'failed inject tag',
        message: 'please check options'
      }
    }

    const userData = JSON.parse(element.getAttribute(STATE_NAME))

    if (!userData) {
      return {
        status: 'ignored domain',
        message:
          'this domain was ignored by option. to enable paster, please check your option.'
      }
    }

    switch (userData.status) {
      case 'Loading':
        return {
          status: 'UDTracker is loading',
          message: 'please wait a few seconds'
        }
      case 'Blocked':
        return {
          status: 'UDTracker was blocked',
          message: 'please check current page script'
        }
      case 'Failed':
        return {
          status: 'UDTracker failed to start',
          message: 'please reload current page and popup'
        }
    }

    return userData
  }
  listen () {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      switch (request.content) {
        case 'fetchCookie':
          ;(async () => {
            const data = await this.loadState()
            sendResponse({ data })
          })()
          break
        case 'reloadPage':
          this.reload()
          break
      }
      return true
    })
  }
  listenReload () {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.content === 'reloadPage') {
        this.reload()
      }
      return true
    })
  }
  async reload () {
    await renderBadge('...')
    location.reload()
  }
}
