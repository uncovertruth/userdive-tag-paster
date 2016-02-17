'use strict';

(function (root, chrome, document) {
  class Provider {
    constructor () {
      root.addEventListener('load', (evt) => {
        this.load();
      });
      this.loaded = false;
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
        function createTag (id, src, env) {
          if (id.length < 3 || src.length < 14) {
            return;
          }
          return `if(!window.UDTracker||!window.USERDIVEObject) !function(e,t,n,c,r,u,s){e.USERDIVEObject=r,e[r]=e[r]||function(){(e[r].queue=e[r].queue||[]).push(arguments)},u=t.createElement(n),s=document.getElementsByTagName(n)[0],u.async=1,u.src=c,s.parentNode.insertBefore(u,s)}(window,document,"script","//${src}/static/UDTracker.js","ud");ud("create", "${id}", {"env": "${env}"});ud("analyze");`;
        };
        this.loaded = this.injectScript(createTag(
          config.id,
          config.host,
          config.env
        ));
      });
    }
  }
  /* eslint no-new: 1*/
  new Provider();
})(window, chrome, document);
