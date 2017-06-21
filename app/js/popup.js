/* @flow */
'use strict'
import '../styles/main.css'
import Render from './render'
declare var chrome: any

;(function (global, chrome, document) {
  class StateView {
    constructor () {
      global.addEventListener('load', evt => {
        this.render()
      })
    }
    render (): void {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { content: 'fetchCookie' },
          response => {
            if (!response) {
              return
            }
            this.mount(response.data)
          }
        )
      })
    }
    mount (pageInfo): void {
      const afterSet: Promise<void> = this.setAttr(pageInfo)
      afterSet
        .then(() => {
          Render()
        })
        .catch(err => {
          throw err
        })
    }

    setAttr (pageInfo): Promise<void> {
      return new Promise((resolve, reject) => {
        const dom: any = document.getElementById('info')

        if (!dom) reject(new Error("couldn't find a DOM: #info"))

        if (!pageInfo) reject(new Error("couldn't recieve page datas"))

        const data: string = JSON.stringify(pageInfo)

        try {
          dom.setAttribute('data', data)
        } catch (err) {
          reject(err)
        }
        resolve()
      })
    }
  }
  return new StateView()
})(window, chrome, document)
