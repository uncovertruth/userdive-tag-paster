/* @flow */
import { inject } from '../injector'
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
        return
      }
      this.listen()
      inject(INJECT_ELEMENT_ID, STATE_NAME, config)
    })
  }
  async loadState (): Object {
    const { isActive } = await getConfig()
    if (!isActive) {
      return {}
    }

    const element: any = document.getElementById(INJECT_ELEMENT_ID)
    if (!element) {
      return {}
    }

    return JSON.parse(element.getAttribute(STATE_NAME))
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
          renderBadge('...')
          location.reload()
          break
      }
      return true
    })
  }
}
