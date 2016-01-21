import Tag from './tag'

((accountId, env, hostName, root = window, documentRoot = document) => {
  // block double tracker
  if (root.UDTracker || root.USERDIVEObject) {
    return
  }
  let tag = new Tag(accountId, env, hostName)
  let s = documentRoot.createElement('script')

  s.innerHTML = tag.build()
  return documentRoot.body.appendChild(s)
})('1-1', 'dev', 'localhost:8000')
