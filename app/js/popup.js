/* @flow */
'use strict'
import componentFactory from './render'
declare var chrome: any

;(function (global, chrome, document) {
  class StateView {
    constructor (): void {
      global.addEventListener('load', evt => {
        this.render()
      })
    }
    render (): void {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { content: 'fetchCookie' }, response => {
          if (!response || !response.data) {
            throw new Error("couldn't recieve page data")
          }
          this.show(response.data)
        }
        )
      })
    }
    show (userData: object): void {
      componentFactory(userData, () => {
        this.reverseActivation()
      })
    }
    reverseActivation (): void {
      chrome.runtime.sendMessage({ bg: 'reverseActivation' }, response => {
        const isActive = !!response.isActive
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
          chrome.tabs.sendMessage(tabs[0].id, { content: isActive }, response => {
            this.show(response.data)
          }
          )
        })
      })
    }
  }
  return new StateView()
})(window, chrome, document)
