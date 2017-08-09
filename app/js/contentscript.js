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
          this.loadState()
            .then(data => {
              this.renderBadge(data.pageId || '?')
              if (cb) {
                cb()
              }
            })
            .catch(() => {})
        }, 3000)
      })
      .catch(err => {
        const data = {}
        switch (err.message) {
          case 'Setting':
            console.warn('Please set options')
            break
          case 'Blocked':
            console.warn(
              'Paster was blocked by ignored domains option. Please check it.'
            )
            break
        }
        if (cb) {
          cb(data)
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
    return `"use strict";(function(global,document,element,state){element=document.getElementById("${elementId}");if(!global.UDTracker||!global.USERDIVEObject){(function(e,t,n,c,r,a,s,u){e.USERDIVEObject=r;e[r]=e[r]||function(){(e[r].queue=e[r].queue||[]).push(arguments)};s=t.createElement(n);u=t.getElementsByTagName(n)[0];s.async=1;s.src=c;s.charset=a;u.parentNode.insertBefore(s,u)})(window,document,"script","//${host}/static/UDTracker.js?"+(new Date).getTime(),"ud","UTF-8");global.ud("create","${id}",{env:"${env}",cookieExpires:1});global.ud("analyze")}setTimeout(function(){if(!global.UDTracker){element.setAttribute("${stateName}",JSON.stringify({status:"Blocked"}));return}if(!global.UDTracker.cookie.enableSession()){element.setAttribute("${stateName}",JSON.stringify({status:"Failed"}));return}state=global.UDTracker.cookie.fetch();state.overrideUrl=global.UDTracker.Config.getOverrideUrl();element.setAttribute("${stateName}",JSON.stringify(state))},2e3)})(window,document);`
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
          throw new Error('Blocked by option')
        }
        return element.getAttribute(this.stateName)
      })
      .then(state => {
        const data = JSON.parse(state)
        switch (data.status) {
          case 'Blocked':
            throw new Error('Blocked by page')
          case 'Failed':
            throw new Error('Load failed')
        }
        return data
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
          this.load()
          setTimeout(() => {
            this.assignStatusHandler(sendResponse)
          }, 3000)
          break
        default:
          const tag = document.getElementById(this.id)
          if (tag) {
            document.body.removeChild(tag)
          }
          this.renderBadge('?')
          const data = {
            status: 'OFF',
            message: 'Please click Turn ON button'
          }
          sendResponse({ data })
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
        let data = {}
        switch (err.message) {
          case 'OFF':
            data = {
              status: 'OFF',
              message: 'Please check Turn ON button'
            }
            break
          case 'Blocked by option':
            data = {
              status: 'Paster was blocked by ignored domain option.',
              message: 'Please click ignored option in setting page.'
            }
            break
          case 'Blocked by page':
            data = {
              status:
                'UDTracker was blocked by current web page or other extensions.',
              message: 'Please check this page or other extensions'
            }
            break
          case 'Load failed':
            data = {
              status: 'UDTracker could not start session.',
              message: 'Please check options.'
            }
            break
        }
        sendResponse({ data })
        this.renderBadge('?')
      })
  }
}
new Provider('wmd3MCLG6HXn', 'vyQqaa4SnJ48') // eslint-disable-line no-new
