/* @flow */
'use strict'
declare var chrome: any

;(function (global, chrome, localStorage) {
  class Background {
    activateKey: string
    activeValue: string

    constructor () {
      this.activateKey = 'ACTIVATE'
      this.activeValue = 'active'
      this.set(this.activateKey, this.activeValue)
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
          case 'isActive':
            sendResponse({
              isActive: this.isActive()
            })
            break
          case 'reverseActivation':
            sendResponse({
              isActive: this.reverseActivation()
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
    set (key: string, value: any): void {
      localStorage[key] = value.toString()
    }

    isActive (): boolean {
      return this.get(this.activateKey) === this.activeValue
    }

    reverseActivation (): boolean {
      const status: boolean = this.isActive()
      if (status) {
        this.set(this.activateKey, '')
        return this.isActive()
      }
      this.set(this.activateKey, this.activeValue)
      return this.isActive()
    }
  }
  global.bg = new Background()
})(window, chrome, localStorage)
