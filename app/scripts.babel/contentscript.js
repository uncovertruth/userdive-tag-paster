'use strict';
(function (root, chrome, document) {
  class Provider {
    constructor () {
      this._attr = 'data-userdive-tracker-status';
      this._id = 'unto-duckling-peril';
      root.addEventListener('load', (evt) => {
        try {
          this.load();
          setTimeout(() => {
            this.badge(this.getStatus());
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
         * @param  {string} src USERDIVE tracker host
         * @param  {string} env default production
         * @param  {string} elementId id
         * @param  {string} attr attr
         * @return {string} return inject javascript string
         */
        function createTag (id, src, env, elementId, attr) {
          if (id.length < 3 || src.length < 14) {
            return;
          }
          return `"use strict";(function(e,t){const r=t.getElementById("${elementId}");if(e.UDTracker||e.USERDIVEObject){r.setAttribute("${attr}","used")}else{(function(e,t,r,c,n,s,o,a){e.USERDIVEObject=n;e[n]=e[n]||function(){(e[n].queue=e[n].queue||[]).push(arguments)};o=t.createElement(r);a=t.getElementsByTagName(r)[0];o.async=1;o.src=c;o.charset=s;a.parentNode.insertBefore(o,a)})(window,t,"script","//harpoon3.userdive.com/static/UDTracker.js?"+(new Date).getTime(),"ud","UTF-8");e.ud("create","${id}",{env:"${env}",cookieExpires:1});e.ud("analyze")}setTimeout(function(){if(e.UDTracker){console.log("There are the UDTracker");const t=e.UDTracker.cookie.fetch();r.setAttribute("status",[t.pageId,t.trackingId,t.visitorType])}else{console.log("There are not UDTracker");r.setAttribute("status",["e","r","r"])}},2e3)})(window,document);`;
        };
        for (const domain of config.ignore.split('\n')) {
          const regexp = new RegExp(domain);
          if (regexp.test(root.location.href)) {
            return;
          }
        }
        this.injectScript(createTag(
          config.id,
          config.host,
          config.env,
          this._id,
          this._attr
        ));
      });
    }
    getStatus () {
      const id = this._id;
      const attr = this._attr;
      try {
        return document.getElementById(id).getAttribute(attr);
      } catch (err) {
        console.log('Block load userdive tag, plz check options');
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
          const sta = document.getElementById(this._id).getAttribute('status');
          if (request.pass === 'get') {
            sendResponse({status: sta});
          }
        }
      );
    }
  }
  /* eslint no-new: 1*/
  new Provider();
})(window, chrome, document);
