/* @flow */
'use strict'
import '../styles/main.css'
import renderVue from './render'
declare var chrome: any

;(function (global, chrome, document) {
  class StateView {
    constructor () {
      global.addEventListener('load', evt => {
        this.render()
      })
    }
    render () {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { content: 'fetchCookie' },
          response => {
            if (!response) {
              return
            }

            if (!response.data) {
              throw new Error("couldn't recieve page datas")
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
          renderVue((vm) => {
            document.getElementById('change-status').addEventListener('click', evt => {
              this.changeAppStatus(vm)
            })
          })
        })
        .catch(err => {
          throw err
        })
    }

    setAttr (pageInfo): Promise<void> {
      return new Promise((resolve, reject) => {
        const dom: any = document.getElementById('info')

        if (!dom) {
          reject(new Error("couldn't find a DOM: #info"))
        }
        const data: string = JSON.stringify(pageInfo)

        try {
          dom.setAttribute('data', data)
        } catch (err) {
          reject(err)
        }
        resolve()
      })
    }
    changeAppStatus (vm): void {
      this.cleanHtml(vm)
      chrome.runtime.sendMessage({bg: 'changeAppStatus'}, response => {
        this.reRender(response.status)
      })
    }
    reRender (message) {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { content: message },
          response => {
            this.mount(response.data)
          }
        )
      })
    }
    cleanHtml (vm) {
      vm.$destroy()
      const dom = document.getElementById('info')
      if (!dom) {
        return
      }
      while (dom.firstChild) {
        dom.removeChild(dom.firstChild)
      }
      const info = document.createElement('info')
      document.getElementById('info').appendChild(info)
    }
  }
  return new StateView()
})(window, chrome, document)
