'use strict';
(function (root, document) {
  const element = document.getElementById('${elementId}');
  if (root.UDTrakcer || root.USERDIVEObject) {
    element.setAttribute('${attr}', 'used');
  } else {
    /* eslint-disable */
    (function(e,t,n,c,r,a,s,u){e.USERDIVEObject=r;e[r]=e[r]||function(){(e[r].queue=e[r].queue||[]).push(arguments)};s=t.createElement(n);u=t.getElementsByTagName(n)[0];s.async=1;s.src=c;s.charset=a;u.parentNode.insertBefore(s,u)})(window,document,"script","//harpoon3.userdive.com/static/UDTracker.js?"+(new Date).getTime(),"ud","UTF-8");
    /* eslint-enable */
    root.ud('create', '${id}', {env: '${env}', cookieExpires: 1});
    root.ud('analyze');
    /* eslint-disable */
    const data = UDTracker.cookie.fetch();
    /* eslint-enable */
    chrome.runtime.sendMessage(
      {pageId: data.pageId}
    );
  }
  /* eslint-disable */
  const nowStatus = UDTracker.cookie.fetch();
  /* eslint-enable */
  const statusEle = document.getElementById('unto-duckling-peril');
  statusEle.setAttribute('status', [nowStatus.pageId, nowStatus.trackingId, nowStatus.visitorType]);
})(window, document);
