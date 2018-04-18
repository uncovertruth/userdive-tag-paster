import {
  BG_GET_CONFIG,
  BG_TOGGLE,
  BG_UPDATE_BADGE,
  IS_ACTIVE,
  USERDIVE_ENV,
  USERDIVE_HOST,
  USERDIVE_ID,
  USERDIVE_IGNORE
} from '../constants'

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
  public _renderBadge (text: string, color: string) {
    chrome.browserAction.setBadgeBackgroundColor({ color })
    chrome.browserAction.setBadgeText({ text })
  }
  public updateBadge (text: string | number): void {
    if (typeof text === 'number') {
      this._renderBadge(text.toString(), '#42b812')
      return
    }
    this._renderBadge(text.toString(), '#CCCCCC')
  }
  public toggle (value: string = ''): string {
    if (this.get(IS_ACTIVE) === '') {
      value = 'active'
    }
    this.set(IS_ACTIVE, value)
    return value
  }
  public get (key: string): string {
    return localStorage[key] || ''
  }
  public set (key: string, value?: string): void {
    localStorage[key] = value
  }
}
