// tslint:disable:no-invalid-template-strings
(function (global: any, document, element, state) {
  element = document.getElementById('${elementId}')
  element.setAttribute('${attrName}', JSON.stringify({ status: 'Loading' }))
  if (!global.UDTracker || !global.USERDIVEObject) {
    (function (e, t, n, c, r, a, s, u) {
      e.USERDIVEObject = r
      e[r] =
        e[r] ||
        function () {
          (e[r].queue = e[r].queue || []).push(arguments)
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

    // tslint:disable-next-line:align
    global.ud('create', '${id}', { env: '${env}', cookieExpires: 1 })
    // tslint:disable-next-line:align
    global.ud('analyze')
  }
  setTimeout(function () {
    element = document.getElementById('${elementId}')
    if (!global.UDTracker) {
      element.setAttribute('${attrName}', JSON.stringify({ status: 'Blocked' }))
      return
    }
    if (!global.UDTracker.cookie.enableSession()) {
      element.setAttribute('${attrName}', JSON.stringify({ status: 'Failed' }))
      return
    }
    state = global.UDTracker.cookie.fetch()
    state.overrideUrl = global.UDTracker.Config.getOverrideUrl()
    element.setAttribute('${attrName}', JSON.stringify(state))
  }, 2000)
})(window, document)
