'use strict';
(function (global, chrome, document) {
  class Provider {
    constructor () {
      this._attr = 'data-userdive-tracker-status';
      this._id = 'unto-duckling-peril';
      this._cookieStatusAttr = 'status';
      global.addEventListener('load', (evt) => {
        try {
          this.load();
          setTimeout(() => {
            this.updateBadge();
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
          return `"use strict";(function(e,t,r,c){r=t.getElementById("${elementId}");if(e.UDTracker||e.USERDIVEObject){r.setAttribute("${attr}","used")}else{(function(e,t,r,c,n,i,s,a){e.USERDIVEObject=n;e[n]=e[n]||function(){(e[n].queue=e[n].queue||[]).push(arguments)};s=t.createElement(r);a=t.getElementsByTagName(r)[0];s.async=1;s.src=c;s.charset=i;a.parentNode.insertBefore(s,a)})(window,t,"script","//${host}/static/UDTracker.js?"+(new Date).getTime(),"ud","UTF-8");e.ud("create","${id}",{env:"${env}",cookieExpires:1});e.ud("analyze")}setTimeout(function(){if(!e.UDTracker){console.warn("Blocked USERDIVE Scripts");return}c=e.UDTracker.cookie.fetch();r.setAttribute("${status}",[c.pageId,c.trackingId,c.visitorType])},1e3)})(window,document);`;
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
          this._cookieStatusAttr
        ));
      });
    }
    getAttributeStatus (attr) {
      const id = this._id;
      try {
        return document.getElementById(id).getAttribute(attr);
      } catch (err) {
        console.warn('Block USERDIVE Load tag, plz check options');
        return '';
      }
    }
    updateBadge () {
      this.badge(this.getAttributeStatus(this._id, this._attr));
    }
    badge (text) {
      chrome.runtime.sendMessage({
        config: 'status',
        statusText: text
      });
    }
    assignStatusHandler () {
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.pass !== 'get') {
          return;
        }
        try {
          sendResponse({status: this.getAttributeStatus(this._cookieStatusAttr)});
          this.updateBadge();
        } catch (err) {
          this.badge('err');
        }
      });
    }
  }
  /* eslint no-new: 1*/
  new Provider();
})(window, chrome, document);
