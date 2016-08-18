'use strict';
(function (global, chrome, document) {
  class Provider {
    constructor () {
      this._attr = 'data-userdive-tracker-status';
      this._id = 'unto-duckling-peril';
      this._statusAttr = 'status';
      global.addEventListener('load', (evt) => {
        try {
          this.load();
          setTimeout(() => {
            this.badge(this.getStatus(this._id, this._attr));
          }, 1000);
        } catch (err) {
          this.badge('err');
        }
      });
      this.assignStatusHandler();
    }
    /**
     * Inject javascript to web page
     * @param  {string} source javascript source
     * @return {boolean} success flag
     */
    injectScript (source) {
      if (typeof source !== 'string' || source.length < 380) {
        return;
      }
      const th = document.getElementsByTagName('body')[0];
      const s = document.createElement('script');
      s.text = source;
      s.id = this._id;
      s.setAttribute(this._attr, 'ok');
      th.appendChild(s);
      return true;
    }
    load () {
      chrome.runtime.sendMessage({config: 'get'}, (response) => {
        const config = response || {};
        /**
         * inject UDTracker.js
         * @param  {string} id USERDIVE project id
         * @param  {string} host USERDIVE tracker host
         * @param  {string} env default production
         * @param  {string} elementId id
         * @param  {string} attr attr
         * @param  {string} status statusAttr
         * @return {string} return inject javascript string
         */
        function createTag (id, host, env, elementId, attr, status) {
          if (id.length < 3 || host.length < 14) {
            return;
          }
          return `"use strict";(function(e,t){const c=t.getElementById("${elementId}");if(e.UDTracker||e.USERDIVEObject){c.setAttribute("${attr}","used")}else{(function(e,t,c,n,r,s,i,o){e.USERDIVEObject=r;e[r]=e[r]||function(){(e[r].queue=e[r].queue||[]).push(arguments)};i=t.createElement(c);o=t.getElementsByTagName(c)[0];i.async=1;i.src=n;i.charset=s;o.parentNode.insertBefore(i,o)})(window,t,"script","//${host}/static/UDTracker.js?"+(new Date).getTime(),"ud","UTF-8");e.ud("create","${id}",{env:"${env}",cookieExpires:1});e.ud("analyze")}setTimeout(function(){if(e.UDTracker){const t=e.UDTracker.cookie.fetch();c.setAttribute("${status}",[t.pageId,t.trackingId,t.visitorType])}else{console.log("There are not UDTracker")}},2e3)})(window,document);`;
        };
        for (const domain of config.ignore.split('\n')) {
          const regexp = new RegExp(domain);
          if (regexp.test(global.location.href)) {
            return;
          }
        }
        this.injectScript(createTag(
          config.id,
          config.host,
          config.env,
          this._id,
          this._attr,
          this._statusAttr
        ));
      });
    }
    getStatus (attr) {
      const id = this._id;
      try {
        return document.getElementById(id).getAttribute(attr);
      } catch (err) {
        console.warn('Block load userdive tag, plz check options');
        return '';
      }
    }
    badge (text) {
      chrome.runtime.sendMessage({
        config: 'status',
        statusText: text
      });
    }
    assignStatusHandler () {
      chrome.runtime.onMessage.addListener(
        (request, sender, sendResponse) => {
          if (request.pass === 'get') {
            const status = this.getStatus(this._statusAttr);
            sendResponse({status: status});
          }
        }
      );
    }
  }
  /* eslint no-new: 1*/
  new Provider();
})(window, chrome, document);
