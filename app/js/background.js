/* @flow */
declare var chrome: any
const IS_ACTIVE = 'IS_ACTIVE'

export default class Background {
  constructor () {
    this.assignEventHandlers()
  }
  assignEventHandlers (): void {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      switch (request.bg) {
        case 'get':
          sendResponse({
            env: this.get('USERDIVEEnv'),
            host: this.get('USERDIVEHost'),
            id: this.get('USERDIVEId'),
            ignore: this.get('USERDIVEIgnore'),
            isActive: this.get(IS_ACTIVE)
          })
          break
        case 'badge':
          sendResponse({
            text: this.updateBadge(request.text)
          })
          break
        case 'toggleExtension':
          this.toggleExtension()
          const isActive = this.get(IS_ACTIVE)
          sendResponse({ isActive })
      }
    })
  }
  renderBadge (text: string, color: string): string {
    chrome.browserAction.setBadgeBackgroundColor({ color })
    chrome.browserAction.setBadgeText({ text })
    return text
  }
  updateBadge (text: string | number): void {
    if (typeof text === 'number') {
      this.renderBadge(text.toString(), '#42b812')
      return
    }
    this.renderBadge(text.toString(), '#CCCCCC')
  }
  toggleExtension (value: string = ''): void {
    if (!this.get(IS_ACTIVE)) {
      value = 'active'
    }
    this.set(IS_ACTIVE, value)
  }
  get (key: string): string {
    return localStorage[key] || ''
  }
  set (key: string, value: ?string): void {
    localStorage[key] = value
  }
}

window.bg = new Background()
