/* @flow */
'use strict'
import componentFactory from './render'
declare var chrome: any
;(function (global, chrome, document) {
  class StateView {
    vue: any
    constructor (): void {
      global.addEventListener('load', evt => {
        this.render()
      })
    }
    render (): void {
      chrome.tabs.query({active: true, currentWindow: true}, tabs => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {content: 'fetchCookie'},
          response => {
            if (!response || !response.data) {
              throw new Error("couldn't recieve page data")
            }

            this.mount(response.data)
          }
        )
      })
    }

    // TODO rename
    createVue (userData: Object): void {
      const vue = componentFactory(() => {
        this.reverseActivation()
      })
      vue.mount()
      vue.set({userData})
    }

    reverseActivation (): void {
      chrome.runtime.sendMessage({bg: 'activate'}, ({isActive}) => {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
          chrome.tabs.sendMessage(tabs[0].id, {content: isActive}, response =>
            this.vue.set({userData: response.userData})
          )
        })
      })
    }
  }
  return new StateView()
})(window, chrome, document)
