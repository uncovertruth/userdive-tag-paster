'use strict';

(function (root, chrome) {
  class Provider {
    constructor () {
      console.log('start');
      root.addEventListener('load', (evt) => {
        console.log('load');
        this.load();
      });
    }
    load () {
      chrome.runtime.sendMessage({config: 'get'}, (response) => {
        let config = response || {};
        function createTag (id, src, env = 'default') {
          if (typeof id !== 'string' || typeof src !== 'string') {
            return;
          }
          return `!function(e,t,n,c,r,u,s){e.USERDIVEObject=r,e[r]=e[r]||function(){(e[r].queue=e[r].queue||[]).push(arguments)},u=t.createElement(n),s=document.getElementsByTagName(n)[0],u.async=1,u.src=c,s.parentNode.insertBefore(u,s)}(window,document,"script","//${src}/static/UDTracker.js","ud");ud("create", ${id}, {"env": ${env}});ud("analyze");`;
        };
        console.log(createTag(
          config.id,
          config.host,
          config.env
        ));
      });
    }
  }
  /* eslint no-new: 1*/
  new Provider();
})(window, chrome);
