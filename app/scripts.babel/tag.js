'use strict';
(function (root, document) {
  const element = document.getElementById('${elementId}');
  if (root.UDTracker || root.USERDIVEObject) {
    element.setAttribute('${attr}', 'used');
  } else {
    /* eslint-disable */
    (function(e,t,n,c,r,a,s,u){e.USERDIVEObject=r;e[r]=e[r]||function(){(e[r].queue=e[r].queue||[]).push(arguments)};s=t.createElement(n);u=t.getElementsByTagName(n)[0];s.async=1;s.src=c;s.charset=a;u.parentNode.insertBefore(s,u)})(window,document,"script","//harpoon3.userdive.com/static/UDTracker.js?"+(new Date).getTime(),"ud","UTF-8");
    /* eslint-enable */
    root.ud('create', '${id}', {env: '${env}', cookieExpires: 1});
    root.ud('analyze');
  }
  setTimeout(function () {
    if (root.UDTracker) {
      console.log('There are the UDTracker');
      const data = root.UDTracker.cookie.fetch();
      element.setAttribute('status', [data.pageId, data.trackingId, data.visitorType]);
    } else {
      console.log('There are not UDTracker');
    }
  }, 2000);
})(window, document);
