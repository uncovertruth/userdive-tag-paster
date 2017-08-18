/* @flow */
import { sleep } from './utils'
import { inject } from './injector'

function renderBadge (text: string | number): Promise<any> {
  return new Promise((resolve, reject) =>
    chrome.runtime.sendMessage(
      {
        bg: 'badge',
        text
      },
      res => resolve(res)
    )
  )
}

function getActiveState (): Promise<any> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ bg: 'isActive' }, ({ isActive }) => {
      if (!isActive) {
        renderBadge('OFF')
      }
      renderBadge('ON')
      resolve(isActive)
    })
  })
}

function getConfig (): Promise<Object> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ bg: 'get' }, res => {
      resolve(res)
    })
  })
}

declare var chrome: any
const STATE_NAME = 'vyQqaa4SnJh48'
const INJECT_ELEMENT_ID = 'wmd3MCLG6HXn'

class Provider {
  constructor () {
    window.addEventListener('load', async e => {
      const isActive = await getActiveState()
      if (!isActive) {
        return
      }
      const config = await getConfig()
      inject(STATE_NAME, config)
    })
  }
  async loadState (): Object {
    const isActive = await getActiveState()
    if (!isActive) {
      return {}
    }
    await sleep(3000)

    const element = document.getElementById(INJECT_ELEMENT_ID)
    if (!element) {
      throw new Error('Ignored')
    }

    return JSON.parse(element.getAttribute(STATE_NAME))
  }
  listen (): void {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      switch (request.content) {
        case 'fetchCookie':
          sendResponse({ data: this.getState() })
          break
        case 'reloadPage':
          this.renderBadge('...')
          location.reload()
          break
      }
      return true
    })
  }
}
window.content = new Provider()
