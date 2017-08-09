/* eslint no-template-curly-in-string: 0 eslint-comments/no-unlimited-disable: 1 */
'use strict'
;(function (global, document, element, state) {
  element = document.getElementById('${elementId}')
  if (!global.UDTracker || !global.USERDIVEObject) {
    ;(function (e, t, n, c, r, a, s, u) {
      e.USERDIVEObject = r
      e[r] =
        e[r] ||
        function () {
          ;(e[r].queue = e[r].queue || []).push(arguments)
        }
      s = t.createElement(n)
      u = t.getElementsByTagName(n)[0]
      s.async = 1
      s.src = c
      s.charset = a
      u.parentNode.insertBefore(s, u)
    })(
      window,
      document,
      'script',
      '//${host}/static/UDTracker.js?' + new Date().getTime(),
      'ud',
      'UTF-8'
    )
    global.ud('create', '${id}', { env: '${env}', cookieExpires: 1 })
    global.ud('analyze')
  }
  setTimeout(function () {
    if (!global.UDTracker) {
      element.setAttribute(
        '${stateName}',
        JSON.stringify({ status: 'Blocked' })
      )
      return
    }
    if (!global.UDTracker.cookie.enableSession()) {
      element.setAttribute('${stateName}', JSON.stringify({ status: 'Failed' }))
      return
    }
    state = global.UDTracker.cookie.fetch()
    state.overrideUrl = global.UDTracker.Config.getOverrideUrl()
    element.setAttribute('${stateName}', JSON.stringify(state))
  }, 2000)
})(window, document)
