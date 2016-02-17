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
    }
    /**
     * Inject javascript to web page
     * @param  {string} source javascript source
     * @return {boolean}
     */
    injectScript (source) {
      if (typeof source !== 'string' || source.length < 380) {
        return;
      }
      let th = document.getElementsByTagName('body')[0];
      let s = document.createElement('script');
      s.text = source;
      s.id = this._id;
      s.setAttribute(this._attr, 'ok');
      th.appendChild(s);
      return true;
    }
    load () {
      chrome.runtime.sendMessage({config: 'get'}, (response) => {
        let config = response || {};
        /**
         * inject UDTracker.js
         * @param  {string} id USERDIVE project id
         * @param  {string} src USERDIVE tracker host
         * @param  {string} env default production
         * @return {string} return inject javascript string
         */
        function createTag (id, src, env, elementId, attr) {
          if (id.length < 3 || src.length < 14) {
            return;
          }
          return `"use strict";!function(e,t){var n=t.getElementById("${elementId}");e.UDTrakcer||e.USERDIVEObject?n.setAttribute("${attr}","used"):(!function(e,n,r,c,u,a,s){e.USERDIVEObject=u,e[u]=e[u]||function(){(e[u].queue=e[u].queue||[]).push(arguments)},a=n.createElement(r),s=t.getElementsByTagName(r)[0],a.async=1,a.src=c,s.parentNode.insertBefore(a,s)}(window,t,"script","//${src}/static/UDTracker.js","ud"),ud("create","${id}",{env:"${env}"}),ud("analyze"))}(window,document);`;
        };
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
      let id = this._id;
      let attr = this._attr;
      return document.getElementById(id).getAttribute(attr);
    }
    badge (text) {
      chrome.runtime.sendMessage({
        config: 'status',
        statusText: text
      });
    }
  }
  /* eslint no-new: 1*/
  new Provider();
})(window, chrome, document);
