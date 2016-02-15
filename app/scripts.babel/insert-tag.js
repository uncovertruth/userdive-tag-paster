'use strict';

(function (root, chrome) {
  chrome.runtime.sendMessage({config: 'get'}, (response) => {
    // chrome.tabs.executeScript(
    //   null, {
    //     code: 'console.log(window.USERDIVEObject, window.UDTracker) return window.UDTracker'
    //   },
    //   result => {
    //     if (result) {
    //       chrome.browserAction.setBadgeText({'text': 'ok'});
    //       console.log('already used', result);
    //       return;
    //     };
    //     let config = response || {};
    //     function createTag (id, src, env) {
    //       if (typeof id !== 'string' || typeof src !== 'string') {
    //         return;
    //       }
    //       return `!function(e,t,n,c,r,u,s){e.USERDIVEObject=r,e[r]=e[r]||function(){(e[r].queue=e[r].queue||[]).push(arguments)},u=t.createElement(n),s=document.getElementsByTagName(n)[0],u.async=1,u.src=c,s.parentNode.insertBefore(u,s)}(window,document,"script","//${ src }/static/UDTracker.js","ud");ud("create", ${ id }, {"env": ${ env }});ud("analyze");`;
    //     };
    //     console.log(createTag(
    //       config.id,
    //       config.host,
    //       config.env
    //     ));
    //   }
    // );
    // chrome.runtime.sendMessage({trackerMsg: 'paste'}, (response));
  });
})(window, chrome);
