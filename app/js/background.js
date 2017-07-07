/* @flow */
'use strict'
declare var chrome: any
type AppStatus = {
  status: 'disable' | 'enable'
}
;(function (global, chrome, localStorage) {
  class Background {
    appStatus: string

    constructor () {
      this.appStatus = 'APPSTATUS'
      this.set(this.appStatus, true)
      this.assignEventHandlers()
    }
    assignEventHandlers () {
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
          case 'changeStatus':
            this.changeAppStatus()
            sendResponse({
              status: this.appStatus()
            })
            break
          case 'appStatus':
            sendResponse({
              status: this.appStatus()
            })
        }
      })
      chrome.tabs.onActivated.addListener(response => {
        this.renderBadge('', '')
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
    get (key: string): string {
      const value = localStorage[key]
      if (value) {
        return value
      }
      return ''
    }
    set (key, value) {
      localStorage[key] = value
    }

    changeAppStatus (): void {
      localStorage[this.appStatus] = !localStorage[this.appStatus]
    }

    appStatus (): AppStatus {
      if (this.get(this.appStatus)) {
        return 'enable'
      }
      return 'disable'
    }
  }
  global.bg = new Background()
})(window, chrome, localStorage)
