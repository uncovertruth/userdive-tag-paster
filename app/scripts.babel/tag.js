'use strict';
(function (root, document, element, data) {
  element = document.getElementById('${elementId}');
  if (root.UDTracker || root.USERDIVEObject) {
    element.setAttribute('${attr}', 'used');
  } else {
    /* eslint-disable */
    (function(e,t,n,c,r,a,s,u){e.USERDIVEObject=r;e[r]=e[r]||function(){(e[r].queue=e[r].queue||[]).push(arguments)};s=t.createElement(n);u=t.getElementsByTagName(n)[0];s.async=1;s.src=c;s.charset=a;u.parentNode.insertBefore(s,u)})(window,document,"script","//${host}/static/UDTracker.js?"+(new Date).getTime(),"ud","UTF-8");
    /* eslint-enable */
    root.ud('create', '${id}', {env: '${env}', cookieExpires: 1});
    root.ud('analyze');
  }
  setTimeout(function () {
    if (!root.UDTracker) {
      console.warn('Blocked USERDIVE Scripts');
      return;
    }
    try {
      data = root.UDTracker.cookie.fetch();
      const kinds = [
        'pageId',
        'visitorType'
      ];
      let attrString = '';
      for (const i in kinds) {
        // attrString += '${kinds[i]}:${data[kinds[i]]}';
        attrString += kinds[i] + ':' + data[kinds[i]];
        if (i === 0) attrString += ',';
      }
      element.setAttribute('${status}', attrString);
    } catch (err) {
      element.setAttribute('${attr}', 'err');
    }
  }, 2000);
})(window, document);
