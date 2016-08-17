'use strict';
(function (root, document, UDTracker) {
  const element = document.getElementById('${elementId}');
  const data = UDTracker.cookie.fetch();
  if (UDTracker || root.USERDIVEObject) {
    element.setAttribute('${attr}', 'used');
  } else {
    /* eslint-disable */
    (function(e,t,n,c,r,a,s,u){e.USERDIVEObject=r;e[r]=e[r]||function(){(e[r].queue=e[r].queue||[]).push(arguments)};s=t.createElement(n);u=t.getElementsByTagName(n)[0];s.async=1;s.src=c;s.charset=a;u.parentNode.insertBefore(s,u)})(window,document,"script","//harpoon3.userdive.com/static/UDTracker.js?"+(new Date).getTime(),"ud","UTF-8");
    /* eslint-enable */
    root.ud('create', '${id}', {env: '${env}', cookieExpires: 1});
    root.ud('analyze');
    chrome.runtime.sendMessage(
      {pageId: data.pageId}
    );
  }
  element.setAttribute('status', [data.pageId, data.trackingId, data.visitorType]);
})(window, document, window.UDTracker);
