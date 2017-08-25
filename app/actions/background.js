/* @flow */
const IS_ACTIVE = 'IS_ACTIVE'

declare var chrome: any

export default class Background {
  constructor () {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      switch (request.bg) {
        case 'get':
          sendResponse({
            env: this.get('USERDIVEEnv'),
            host: this.get('USERDIVEHost'),
            id: this.get('USERDIVEId'),
            ignores: this.get('USERDIVEIgnore'),
            isActive: this.get(IS_ACTIVE)
          })
          break
        case 'badge':
          sendResponse({
            text: this.updateBadge(request.text)
          })
          break
        case 'toggleExtension':
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
  set (key: string, value: ?string): void {
    localStorage[key] = value
  }
}
