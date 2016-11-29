/* @flow */
'use strict';
declare var chrome: any
(function (global, chrome, document) {
  type State = {
    pageId: number | string
  }

  class Provider {
    id: string;
    stateName: string;
    constructor (id, stateName) {
      this.id = id;
      this.stateName = stateName;

      global.addEventListener('load', (evt) => {
        this.load();
        setTimeout(() => {
          this.renderBadge(
            this.getState().pageId || '?'
          );
        }, 3000);
      });
      this.assignStatusHandler();
    }
    injectScript (source: string) {
      const th = document.getElementsByTagName('body')[0];
      const s = document.createElement('script');
      s.text = source;
      s.id = this.id;
      th.appendChild(s);
    }
    createTag (id: string, host: string, env: string, elementId: string): string {
      const stateName = this.stateName;
      if (id.length < 3 || host.length < 14) {
        return '';
      }
      return `"use strict";(function(e,t,n,i,r,o){r=i.getElementById("${elementId}");if(!n||!t){(function(e,t,n,i,r,o,c,s){e.USERDIVEObject=r;e[r]=e[r]||function(){(e[r].queue=e[r].queue||[]).push(arguments)};c=t.createElement(n);s=t.getElementsByTagName(n)[0];c.async=1;c.src=i;c.charset=o;s.parentNode.insertBefore(c,s)})(window,i,"script","//${host}/static/UDTracker.js?"+(new Date).getTime(),"ud","UTF-8");e[t]("create","${id}",{env:"${env}",cookieExpires:1});e[t]("analyze")}setTimeout(function(){if(!n){console.warn("Blocked USERDIVE Scripts");return}if(!n.cookie.enableSession()){console.warn("Failed start USERDIVE");return}o=n.cookie.fetch();o.overrideUrl=n.Config.getOverrideUrl();r.setAttribute("${stateName}",JSON.stringify(o))},2e3)})(window,window.USERDIVEObject,window.UDTracker,document);`;
    }
    load (): void {
      chrome.runtime.sendMessage({bg: 'get'}, (response) => {
        const config = response || {};
        for (const domain of config.ignore.split('\n')) {
          const regexp = new RegExp(domain);
          if (regexp.test(global.location.href)) {
            return;
          }
        }
        this.injectScript(this.createTag(
          config.id,
          config.host,
          config.env,
          this.id
        ));
      });
    }
    getState (): State {
      const element = document.getElementById(this.id);
      if (!element) {
        return {
          'status': 'Blocked',
          'pageId': '?'
        };
      }
      return JSON.parse(element.getAttribute(this.stateName)) || {
        'status': 'Load Failed',
        'pageId': '?'
      };
    }
    renderBadge (text: string | number): void {
      chrome.runtime.sendMessage({
        bg: 'badge',
        text
      });
    }
    assignStatusHandler () {
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.content !== 'fetchCookie') {
          return;
        }
        const data = this.getState();
        this.renderBadge(data.pageId);
        sendResponse({data});
      });
    }
  }
  return new Provider(
    'wmd3MCLG6HXn',
    'vyQqaa4SnJ48'
  );
})(window, chrome, document);
