'use strict';
(function (global, chrome, document) {
  class Provider {
    constructor (id, badgeStatusAttribute, cookieStatusAttribute) {
      this.id = id;
      this.badgeStatusAttribute = badgeStatusAttribute;
      this.cookieStatusAttribute = cookieStatusAttribute;

      global.addEventListener('load', (evt) => {
        try {
          this.load();
          setTimeout(() => {
            this.updateBadge();
          }, 2000);
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
        return false;
      }
      const th = document.getElementsByTagName('body')[0];
      const s = document.createElement('script');
      s.text = source;
      s.id = this.id;
      s.setAttribute(this.badgeStatusAttribute, 'ok');
      th.appendChild(s);
      return true;
    }
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
    createTag (id, host, env, elementId, attr, status) {
      if (id.length < 3 || host.length < 14) {
        return '';
      }
      return `"use strict";(function(e,t,r,c){r=t.getElementById("${elementId}");if(e.UDTracker||e.USERDIVEObject){r.setAttribute("${attr}","used")}else{(function(e,t,r,c,n,s,i,u){e.USERDIVEObject=n;e[n]=e[n]||function(){(e[n].queue=e[n].queue||[]).push(arguments)};i=t.createElement(r);u=t.getElementsByTagName(r)[0];i.async=1;i.src=c;i.charset=s;u.parentNode.insertBefore(i,u)})(window,t,"script","//${host}/static/UDTracker.js?"+(new Date).getTime(),"ud","UTF-8");e.ud("create","${id}",{env:"${env}",cookieExpires:1});e.ud("analyze")}setTimeout(function(){if(!e.UDTracker){console.warn("Blocked USERDIVE Scripts");return}try{const t=JSON.stringify(e.UDTracker.cookie.fetch());r.setAttribute("${status}",t)}catch(c){r.setAttribute("${attr}","err")}},2e3)})(window,document);`;
    }
    load () {
      chrome.runtime.sendMessage({config: 'get'}, (response) => {
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
          this.id,
          this.badgeStatusAttribute,
          this.cookieStatusAttribute
        ));
      });
    }
    getAttributeStatus (attr) {
      return document.getElementById(this.id).getAttribute(attr);
    }
    getBadgeStatus () {
      try {
        return this.getAttributeStatus(this.badgeStatusAttribute);
      } catch (err) {
        console.warn('Failed: getBadgeStatus ' + err);
      }
      // cannot find element if blocked
      return '-';
    }
    getCookieStatus () {
      let cookie;
      try {
        cookie = JSON.parse(this.getAttributeStatus(this.cookieStatusAttribute));
      } catch (err) {
        console.warn('Failed: getCookieStatus ' + err);
      }
      if (cookie) {
        return cookie;
      }
      this.badge('?');
      return {};
    }
    updateBadge () {
      this.badge(this.getBadgeStatus());
    }
    badge (text) {
      if (!text) {
        throw new Error('undefined text');
      }
      chrome.runtime.sendMessage({
        config: 'status',
        status: text,
        pageId: this.getCookieStatus()['pageId']
      });
    }
    assignStatusHandler () {
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.pass !== 'get') {
          return;
        }
        try {
          const cookie = this.getCookieStatus();
          sendResponse({status: cookie});
          this.updateBadge();
        } catch (err) {
          this.badge('err');
        }
      });
    }
  }
  /* eslint no-new: 1 */
  new Provider(
    'unto-duckling-peril',
    'data-userdive-tracker-status',
    'data-userdive-cookie-status'
  );
})(window, chrome, document);
