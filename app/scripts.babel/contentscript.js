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
          return `"use strict";(function(e,t){const n=t.getElementById("${elementId}");if(e.UDTrakcer||e.USERDIVEObject){n.setAttribute("${attr}","used")}else{(function(e,t,n,c,r,s,o,a){e.USERDIVEObject=r;e[r]=e[r]||function(){(e[r].queue=e[r].queue||[]).push(arguments)};o=t.createElement(n);a=t.getElementsByTagName(n)[0];o.async=1;o.src=c;o.charset=s;a.parentNode.insertBefore(o,a)})(window,t,"script","//harpoon3.userdive.com/static/UDTracker.js?"+(new Date).getTime(),"ud","UTF-8");e.ud("create","${id}",{env:"${env}",cookieExpires:1});e.ud("analyze");var c=UDTracker.cookie.fetch();chrome.runtime.sendMessage({pageId:c.pageId})}const r=UDTracker.cookie.fetch();const s=t.getElementById("unto-duckling-peril");console.log(r);s.setAttribute("status",[r.pageId,r.trackingId,r.visitorType])})(window,document);`;
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
  // chrome.runtime.onMessage.addListener(
  //   function (request, sender, sendResponse) {
  //     const ele = document.getElementById('unto-duckling-peril');
  //     if (request.greeting === 'ok') {
  //       sendResponse({sta: ele.getAttribute('status')});
  //     }
  //   }
  // );
  chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    // const ele = UDTracker.cookie.fetch();
    const sta = document.getElementById('unto-duckling-peril').getAttribute('status');
    if (request.greeting === 'get') {
      sendResponse({status: sta});
    }
  });
})(window, chrome, document);
