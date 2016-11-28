/* eslint no-template-curly-in-string: 0 */
'use strict';
(function (global, entrypoint, agent, document, element, state) {
  element = document.getElementById('${elementId}');
  if (!agent || !entrypoint) {
    /* eslint-disable */
    (function(e,t,n,c,r,a,s,u){e.USERDIVEObject=r;e[r]=e[r]||function(){(e[r].queue=e[r].queue||[]).push(arguments)};s=t.createElement(n);u=t.getElementsByTagName(n)[0];s.async=1;s.src=c;s.charset=a;u.parentNode.insertBefore(s,u)})(window,document,"script","//${host}/static/UDTracker.js?"+(new Date).getTime(),"ud","UTF-8");
    /* eslint-enable */
    global[entrypoint]('create', '${id}', {env: '${env}', cookieExpires: 1});
    global[entrypoint]('analyze');
  }
  setTimeout(function () {
    if (!agent) {
      console.warn('Blocked USERDIVE Scripts');
      return;
    }
    if (!agent.cookie.enableSession()) {
      console.warn('Failed start USERDIVE');
      return;
    }
    state = agent.cookie.fetch();
    state.overrideUrl = agent.Config.getOverrideUrl();
    element.setAttribute('${stateName}', JSON.stringify(state));
  }, 2000);
})(window, window.USERDIVEObject, window.UDTracker, document);
