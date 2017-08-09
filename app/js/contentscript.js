/* @flow */
/* eslint no-console: 1 */
declare var chrome: any
class Provider {
  id: string
  stateName: string
  constructor (id, stateName) {
    this.id = id
    this.stateName = stateName
    window.addEventListener('load', evt => {
      chrome.runtime.sendMessage({ bg: 'isActive' }, response => {
        this.listen()
        if (!response.isActive) {
          console.warn(
            'paster is disable. Please click Turn ON button in popup window.'
          )
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
            console.warn(
              'Paster was blocked by ignored domains option. Please check it.'
            )
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
  createTag (id: string, host: string, env: string, elementId: string): string {
    const stateName = this.stateName
    if (id.length < 3 || host.length < 14) {
      return ''
    }
    return `"use strict";(function(global,document,element,state){element=document.getElementById("${elementId}");if(!global.UDTracker||!global.USERDIVEObject){(function(e,t,n,c,r,a,s,u){e.USERDIVEObject=r;e[r]=e[r]||function(){(e[r].queue=e[r].queue||[]).push(arguments)};s=t.createElement(n);u=t.getElementsByTagName(n)[0];s.async=1;s.src=c;s.charset=a;u.parentNode.insertBefore(s,u)})(window,document,"script","//${host}/static/UDTracker.js?"+(new Date).getTime(),"ud","UTF-8");global.ud("create","${id}",{env:"${env}",cookieExpires:1});global.ud("analyze")}setTimeout(function(){if(!global.UDTracker){element.setAttribute("${stateName}",JSON.stringify({warning:"Blocked USERDIVE Scripts"}));return}if(!global.UDTracker.cookie.enableSession()){element.setAttribute("${stateName}",JSON.stringify({warning:"Failed start USERDIVE"}));return}state=global.UDTracker.cookie.fetch();state.overrideUrl=global.UDTracker.Config.getOverrideUrl();element.setAttribute("${stateName}",JSON.stringify(state))},2e3)})(window,document);`
  }
  load (): Promise<?Error> {
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
  loadState (): Promise<Object | Error> {
    return this.asPromised(cb => {
      chrome.runtime.sendMessage({ bg: 'isActive' }, cb)
    })
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
    })
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
