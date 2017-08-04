/* @flow */
'use strict'
declare var chrome: any

class Provider {
  id: string
  stateName: string
  constructor (id, stateName) {
    this.id = id
    this.stateName = stateName
    window.addEventListener('load', evt => {
      chrome.runtime.sendMessage({ bg: 'activate' }, response => {
        this.listen()
        if (!response.isActive) {
          console.warn('paster is disable. Please click Turn ON button in popup window.') // eslint-disable-line no-console
          return
        }
        this.readyState()
      })
    })
  }
  readyState (cb: Function): void {
    this.renderBadge('...')
    this.load()
      .then(() => {
        setTimeout(() => {
          this.loadState().then(data => {
            this.renderBadge(data.pageId || '?')
            if (cb) {
              cb(data)
            }
          })
        }, 3000)
      })
      .catch(err => {
        switch (err.message) {
          case 'Setting':
            console.warn(`Please set option.`) // eslint-disable-line no-console
            break
          case 'Blocked':
            console.warn('Paster was blocked by ignored domains option. Please check it.') // eslint-disable-line no-console
            break
        }
      })
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
  load (): Promise<void> {
    return this.asPromised(cb => {
      chrome.runtime.sendMessage({ bg: 'get' }, cb)
    })
      .then(response => {
        const config = response || {}
        for (const key in config) {
          if (!config[key] && key !== 'ignore') {
            throw new Error('Setting')
          }
        }
        return config
      })
      .then(config => {
        for (const domain of config.ignore.split('\n')) {
          const regexp = new RegExp(domain)
          if (regexp.test(window.location.href)) {
            throw new Error('Blocked')
          }
        }
        return config
      })
      .then(config => {
        this.injectScript(
          this.createTag(config.id, config.host, config.env, this.id)
        )
      })
  }
  loadState (): Promise<object> {
    return this.asPromised(cb => {
      chrome.runtime.sendMessage({ bg: 'activate' }, cb)
    })
      .then(response => {
        if (!response.isActive) {
          throw new Error('OFF')
        }
      }).then(() => {
        const element = document.getElementById(this.id)
        if (!element) {
          throw new Error('Blocked')
        }
        return element
      }).then(element => {
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
          this.readyState(data => sendResponse({ data }))
          break
        default:
          const tag = document.getElementById(this.id)
          if (tag) {
            document.body.removeChild(tag)
          }
          this.renderBadge('?')
          sendResponse({ data: { status: 'OFF' } })
      }
      return true
    }
    )
  }
  assignStatusHandler (sendResponse: Function): void {
    this.loadState()
      .then(data => {
        this.renderBadge(data.pageId)
        sendResponse({ data })
      })
      .catch(err => {
        switch (err.message) {
          case 'OFF':
            sendResponse({ data: { status: 'OFF' } })
            break
          case 'Blocked':
            sendResponse({ data: { status: 'Blocked' } })
            break
        }
        this.renderBadge('?')
      })
  }
}
new Provider('wmd3MCLG6HXn', 'vyQqaa4SnJ48') // eslint-disable-line no-new
