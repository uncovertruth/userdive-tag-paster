import thenChrome = require('then-chrome')
import { BG_GET_CONFIG, BG_UPDATE_BADGE, CO_GET_STATE } from '../constants'
import { inject } from '../injector'
import { sleep } from '../utils'

function renderBadge (text: string | number): Promise<boolean> {
  return thenChrome.runtime.sendMessage({ bg: BG_UPDATE_BADGE, text })
}

function getConfig (): Promise<Object> {
  return thenChrome.runtime.sendMessage({ bg: BG_GET_CONFIG })
}

const STATE_NAME = 'vyQqaa4SnJh48'
const INJECT_ELEMENT_ID = 'wmd3MCLG6HXn'

declare var chrome: any

export default class Provider {
  constructor () {
    this.listen()
    window.addEventListener('load', e => {
      (async () => {
        const config: any = await getConfig()
        if (!config.isActive) {
          renderBadge('OFF')
          return
        }
        inject(INJECT_ELEMENT_ID, STATE_NAME, config)
        await sleep(3000)
        this.renderPageId()
      })()
    })
  }
  async renderPageId () {
    const state: any = await this.loadState()
    renderBadge(state.pageId || '?')
  }
  async loadState (): Promise<{ [key: string]: string }> {
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
        case CO_GET_STATE:
          (async () => {
            const data = await this.loadState()
            sendResponse(data)
          })()
          break
      }
      return true
    })
  }
}
