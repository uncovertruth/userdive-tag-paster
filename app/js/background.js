/* @flow */
'use strict'
declare var chrome: any
;(function (global, chrome, localStorage) {
  class Background {
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
              ignore: this.get('USERDIVEIgnore')
            })
            break
          case 'badge':
            sendResponse({
              text: this.updateBadge(request.text)
            })
            break
          case 'activate':
            sendResponse({
              isActive: this.get('isActive')
            })
            break
        }
      })
      chrome.tabs.onActivated.addListener(response => {
        this.renderBadge('', '')
      })
    }
    renderBadge (text: string, color: string): string {
      chrome.browserAction.setBadgeBackgroundColor({color})
      chrome.browserAction.setBadgeText({text})
      return text
    }
    updateBadge (text: string | number): void {
      if (typeof text === 'number') {
        this.renderBadge(text.toString(), '#42b812')
        return
      }
      this.renderBadge(text.toString(), '#CCCCCC')
    }
    get (key: string): string {
      return localStorage[key] || ''
    }
    set (key: string, value: ?string): void {
      localStorage[key] = value
    }
  }
  global.bg = new Background()
})(window, chrome, localStorage)
