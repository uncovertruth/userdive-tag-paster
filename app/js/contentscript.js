/* @flow */
'use strict'
declare var chrome: any
;(function (global, chrome, document) {
  class Provider {
    id: string
    stateName: string
    constructor (id, stateName) {
      this.id = id
      this.stateName = stateName
      global.addEventListener('load', evt => {
        chrome.runtime.sendMessage({bg: 'isActive'}, response => {
          if (response.isActive) {
            this.readyState()
          }
          this.listen()
        })
      })
    }
    readyState (cb: Function): void {
      this.renderBadge('...')
      this.load()
      setTimeout(() => {
        this.loadState().then(data => {
          this.renderBadge(data.pageId || '?')
          if (cb) {
            cb(data)
          }
        })
      }, 3000)
    }
    injectScript (source: string): void {
      const th = document.getElementsByTagName('body')[0]
      const s = document.createElement('script')
      s.text = source
      s.id = this.id
      th.appendChild(s)
    }
    createTag (
      id: string,
      host: string,
      env: string,
      elementId: string
    ): string {
      const stateName = this.stateName
      if (id.length < 3 || host.length < 14) {
        return ''
      }
      return `"use strict";(function(e,t,r,n){r=t.getElementById("${elementId}");if(!e.UDTracker||!e.USERDIVEObject){(function(e,t,r,n,c,i,o,a){e.USERDIVEObject=c;e[c]=e[c]||function(){(e[c].queue=e[c].queue||[]).push(arguments)};o=t.createElement(r);a=t.getElementsByTagName(r)[0];o.async=1;o.src=n;o.charset=i;a.parentNode.insertBefore(o,a)})(window,t,"script","//${host}/static/UDTracker.js?"+(new Date).getTime(),"ud","UTF-8");e.ud("create","${id}",{env:"${env}",cookieExpires:1});e.ud("analyze")}setTimeout(function(){if(!e.UDTracker){console.warn("Blocked USERDIVE Scripts");return}if(!e.UDTracker.cookie.enableSession()){console.warn("Failed start USERDIVE");return}n=e.UDTracker.cookie.fetch();n.overrideUrl=e.UDTracker.Config.getOverrideUrl();r.setAttribute("${stateName}",JSON.stringify(n))},2e3)})(window,document);`
    }
    load (): void {
      chrome.runtime.sendMessage({bg: 'get'}, response => {
        const config = response || {}
        for (const domain of config.ignore.split('\n')) {
          const regexp = new RegExp(domain)
          if (regexp.test(global.location.href)) {
            return
          }
        }
        this.injectScript(
          this.createTag(config.id, config.host, config.env, this.id)
        )
      })
    }
    loadState (): Promise<object> {
      return this.asPromised(cb =>
        chrome.runtime.sendMessage({bg: 'isActive'}, cb)
      )
        .then(response => {
          if (!response.isActive) {
            throw new Error('OFF')
          }
        })
        .then(() => {
          const element = document.getElementById(this.id)
          if (!element) {
            throw new Error('Blocked')
          }
          return element
        })
        .then(element => {
          return JSON.parse(element.getAttribute(this.stateName))
        })
    }

    asPromised (block: Function): Promise<Function | Error> {
      return new Promise((resolve, reject) => {
        block((...results) => {
          if (chrome.runtime.lastError) {
            reject(chrome.extension.lastError)
          }
          resolve(...results)
        })
      })
    }
    renderBadge (text: string | number): void {
      chrome.runtime.sendMessage({
        bg: 'badge',
        text
      })
    }
    listen (): void {
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        switch (request.content) {
          case 'fetchCookie':
            this.assignStatusHandler(sendResponse)
            break
          case true:
            this.readyState(data => sendResponse({data}))
            break
          default:
            const body: any = document.body
            body.removeChild(document.getElementById(this.id))
            this.renderBadge('?')
            sendResponse({userData: {}})
        }
        return true
      })
    }
    assignStatusHandler (sendResponse: Function): void {
      this.loadState()
        .then(data => {
          this.renderBadge(data.pageId)
          sendResponse({data})
        })
        .catch(err => {
          console.log(err) // TODO errer check
          this.renderBadge('?')
        })
    }
  }
  return new Provider('wmd3MCLG6HXn', 'vyQqaa4SnJ48')
})(window, chrome, document)
