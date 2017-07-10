/* @flow */
'use strict'
declare var chrome: any
;(function (global, chrome, document) {
  type State = {
    pageId: number | string
  }

  class Provider {
    id: string
    stateName: string
    constructor (id, stateName) {
      this.id = id
      this.stateName = stateName
      this.renderBadge('...')
      global.addEventListener('load', evt => {
        chrome.runtime.sendMessage({bg: 'appStatus'}, response => {
          if (response.status === 'enable') {
            this.load()
            setTimeout(() => {
              this.getState().then((data) => {
                this.renderBadge(data.pageId || '?')
              })
            }, 3000)
          }
          this.listen()
        })
      })
    }
    injectScript (source: string) {
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
      chrome.runtime.sendMessage({ bg: 'get' }, response => {
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
    getState (): Prpmise<State> {
      return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ bg: 'appStatus' }, response => {
          if (response.status === 'enable') {
            const element = document.getElementById(this.id)
            if (!element) {
              resolve({
                status: 'Blocked',
                pageId: '?'
              })
              return
            }
            const value: string = element.getAttribute(this.stateName) || ''
            if (!value) {
              resolve({
                status: 'Load Failed',
                pageId: '?'
              })
              return
            }
            resolve(JSON.parse(value))
          } else if (response.status === 'disable') {
            resolve({
              status: 'off'
            })
          }
          return true
        })
      })
    }
    renderBadge (text: string | number): void {
      chrome.runtime.sendMessage({
        bg: 'badge',
        text
      })
    }
    listen () {
      chrome.runtime.onMessage.addListener(
        (request, sender, sendResponse) => {
          switch (request.content) {
            case 'fetchCookie':
              this.assignStatusHandler(sendResponse)
              break
            case 'toEnable':
              this.toEnable(sendResponse)
              break
            case 'toDisable':
              this.toDisable(sendResponse)
          }
          return true
        }
      )
    }
    assignStatusHandler (sendResponse) {
      this.getState().then((data) => {
        this.renderBadge(data.pageId || '?')
        sendResponse({ data })
      })
    }
    toDisable (sendResponse) {
      const body = document.getElementsByTagName('body')[0]
      body.removeChild(document.getElementById(this.id))
      this.renderBadge('?')
      sendResponse({ data: { status: 'off' } })
    }
    toEnable (sendResponse) {
      this.renderBadge('...')
      this.load()
      setTimeout(() => {
        this.getState().then((data) => {
          this.renderBadge(data.pageId || '?')
          sendResponse({ data })
        })
      }, 3000)
    }
  }
  return new Provider('wmd3MCLG6HXn', 'vyQqaa4SnJ48')
})(window, chrome, document)
