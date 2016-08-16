'use strict';
/* eslint-enable */
(function (root, document) {
  const element = document.getElementById('${elementId}');
  if (root.UDTrakcer || root.USERDIVEObject) {
    element.setAttribute('${attr}', 'used');
  } else {
    /* eslint-disable */
    (function(e,t,n,c,r,a,s,u){e.USERDIVEObject=r;e[r]=e[r]||function(){(e[r].queue=e[r].queue||[]).push(arguments)};s=t.createElement(n);u=t.getElementsByTagName(n)[0];s.async=1;s.src=c;s.charset=a;u.parentNode.insertBefore(s,u)})(window,document,"script","//harpoon3.userdive.com/static/UDTracker.js?"+(new Date).getTime(),"ud","UTF-8");
    root.ud("create","${id}",{env:"${env}", cookieExpires: 1});
    root.ud("analyze");
    const data = UDTracker.cookie.fetch();
    chrome.runtime.sendMessage(
      {pageId: data.pageId}
    );
/* eslint-enable */
  }
  const nowStatus = UDTracker.cookie.fetch();
  const statusEle = document.getElementById('unto-duckling-peril');
  statusEle.setAttribute('status', [nowStatus.pageId, nowStatus.trackingId, nowStatus.visitorType]);
})(window, document);
