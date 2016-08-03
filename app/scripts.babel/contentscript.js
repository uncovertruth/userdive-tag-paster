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
          return `"use strict";(function(e,t){var n=t.getElementById("${elementId}");if(e.UDTrakcer||e.USERDIVEObject){n.setAttribute("${attr}","used")}else{(function(e,t,n,r,c,a,i,s){e.USERDIVEObject=c;e[c]=e[c]||function(){(e[c].queue=e[c].queue||[]).push(arguments)};i=t.createElement(n);s=t.getElementsByTagName(n)[0];i.async=1;i.src=r;i.charset=a;s.parentNode.insertBefore(i,s)})(window,t,"script","//harpoon3.userdive.com/static/UDTracker.js?"+(new Date).getTime(),"ud","UTF-8");e.ud("create","${id}",{env:"${env}",cookieExpires:1});e.ud("analyze")}var cook = UDTracker.cookie.fetch();chrome.runtime.sendMessage({pageId: cook.pageId});})(window,document);`;
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
  }
  /* eslint no-new: 1*/
  new Provider();
})(window, chrome, document);
