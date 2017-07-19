/* @flow */
'use strict'
declare var chrome: any

;(function (global, chrome, localStorage) {
  class Background {
    statusName: string
    statusEnable: string
    statusDisable: string

    constructor () {
      this.statusName = 'APPSTATUS'
      this.statusEnable = 'enable'
      this.statusDisable = 'disable'
      this.appStatus()
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
          case 'appStatus':
            sendResponse({
              status: this.appStatus()
            })
            break
          case 'reverseActivation':
            sendResponse({
              status: this.reverse()
            })
            break
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
    set (key, value): void {
      localStorage[key] = value
    }

    appStatus (): string {
      if (!this.get(this.statusName)) {
        this.set(this.statusName, this.statusEnable)
      }
      return this.get(this.statusName)
    }

    reverse (): string {
      const status: string = this.appStatus()
      const enable: string = this.statusEnable
      const disable: string = this.statusDisable
      if (status === enable) {
        this.set(this.statusName, disable)
        return 'toDisable'
      } else if (status === disable) {
        this.set(this.statusName, enable)
        return 'toEnable'
      }
    }
  }
  global.bg = new Background()
})(window, chrome, localStorage)
