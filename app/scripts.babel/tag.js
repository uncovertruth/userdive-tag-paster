'use strict';

(function (root, document) {
  var element = document.getElementById('${elementId}');
  if (root.UDTrakcer || root.USERDIVEObject) {
    element.setAttribute('${attr}', 'used');
  } else {
    /* eslint-disable */
    !function(e,t,n,c,r,u,s){e.USERDIVEObject=r,e[r]=e[r]||function(){(e[r].queue=e[r].queue||[]).push(arguments)},u=t.createElement(n),s=document.getElementsByTagName(n)[0],u.async=1,u.src=c,s.parentNode.insertBefore(u,s)}(window,document,"script","//${src}/static/UDTracker.js","ud");ud("create","${id}",{"env":"${env}"});ud("analyze");
    /* eslint-enable */
  }
})(window, document);
