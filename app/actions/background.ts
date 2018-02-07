import {
  IS_ACTIVE,
  USERDIVE_ID,
  USERDIVE_ENV,
  USERDIVE_HOST,
  USERDIVE_IGNORE,
  BG_GET_CONFIG,
  BG_UPDATE_BADGE,
  BG_TOGGLE
} from '../constants'

declare var chrome: any

export default class Background {
  constructor () {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      switch (request.bg) {
        case BG_GET_CONFIG:
          sendResponse({
            env: this.get(USERDIVE_ENV),
            host: this.get(USERDIVE_HOST),
            id: this.get(USERDIVE_ID),
            ignore: this.get(USERDIVE_IGNORE),
            isActive: this.get(IS_ACTIVE)
          })
          break
        case BG_UPDATE_BADGE:
          sendResponse({
            text: this.updateBadge(request.text)
          })
          break
        case BG_TOGGLE:
          this.toggle()
          const isActive = this.get(IS_ACTIVE)
          sendResponse({ isActive })
      }
      return true
    })
  }
  _renderBadge (text: string, color: string) {
    chrome.browserAction.setBadgeBackgroundColor({ color })
    chrome.browserAction.setBadgeText({ text })
  }
  updateBadge (text: string | number): void {
    if (typeof text === 'number') {
      this._renderBadge(text.toString(), '#42b812')
      return
    }
    this._renderBadge(text.toString(), '#CCCCCC')
  }
  toggle (value: string = ''): string {
    if (this.get(IS_ACTIVE) === '') {
      value = 'active'
    }
    this.set(IS_ACTIVE, value)
    return value
  }
  get (key: string): string {
    return localStorage[key] || ''
  }
  set (key: string, value?: string): void {
    localStorage[key] = value
  }
}
