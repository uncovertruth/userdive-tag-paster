/* @flow */
declare var chrome: any
class Provider {
  id: string
  stateName: string
  state: object
  constructor (id, stateName) {
    this.id = id
    this.stateName = stateName
    this.state = {}
    window.addEventListener('load', evt => {
      chrome.runtime.sendMessage({ bg: 'isActive' }, response => {
        this.listen()
        if (!response.isActive) {
          this.setState({
            status: 'OFF',
            message: 'Please click turn on button in popup window'
          })
          this.renderBadge('OFF')
          return
        }
        this.readyState()
      })
    })
  }
  setState (data: object): void {
    this.state = data
  }
  getState (): object {
    return this.state
  }
  readyState (cb: Function): void {
    this.setState({
      status: 'Loading',
      message: 'Please wait for a few seconds'
    })
    this.renderBadge('ON')
    this.loadUDTracker().then(() => {
      setTimeout(() => {
        this.loadState()
          .then(data => {
            this.renderBadge(data.pageId || '?')
            this.setState(data)
            if (cb) {
              cb(data)
            }
          })
          .catch(err => {
            switch (err.message) {
              case 'Blocked':
                this.setState({ status: 'Blocked USERDIVE Scripts' })
                break
              case 'Failed start':
                this.setState({ status: 'Failed start USERDIVE' })
                break
            }
          })
      }, 3000)
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
  loadUDTracker (): Promise<?Error> {
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
      .catch(err => {
        switch (err.message) {
          case 'Setting':
            this.setState({
              status: 'Not enough options',
              message: 'Please check options in option page'
            })
            break
          case 'Ignored':
            this.setState({
              status: 'Blocked by ignore option',
              message: 'Please check ignore options in option page'
            })
            break
        }
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
          throw new Error('Ignored')
        }
        return element
      })
      .then(element => {
        return JSON.parse(element.getAttribute(this.stateName))
      })
      .then(data => {
        switch (data.status) {
          case 'Blocked':
            throw new Error('Blocked')
          case 'Failed':
            throw new Error('Failed start')
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
          sendResponse({ data: this.getState() })
          break
        case 'reloadPage':
          this.renderBadge('...')
          location.reload()
          break
      }
      return true
    })
  }
}
window.content = new Provider('wmd3MCLG6HXn', 'vyQqaa4SnJ48')
