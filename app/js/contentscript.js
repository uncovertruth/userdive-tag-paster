/* @flow */
import { inject } from './injector'

function sendMessage (data): Promise<any> {
  return new Promise(resolve => chrome.runtime.sendMessage(data, resolve))
}

function renderBadge (text: string | number): Promise<boolean> {
  return sendMessage({ bg: 'badge', text })
}

function getConfig (): Promise<Object> {
  return sendMessage({ bg: 'get' })
}

declare var chrome: any
const STATE_NAME = 'vyQqaa4SnJh48'
const INJECT_ELEMENT_ID = 'wmd3MCLG6HXn'

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
  listen (): void {
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

window.content = new Provider()
