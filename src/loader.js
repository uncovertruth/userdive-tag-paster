const write = (accountId, env, host, root = window) => {
  if (root.UDTracker || root.USERDIVEObject) {
    return
  }
  let s = document.createElement('script')
  s.innerHTML = '!function(e,t,n,c,r,u,s){e.USERDIVEObject=r,e[r]=e[r]||function(){(e[r].queue=e[r].queue||[]).push(arguments)},u=t.createElement(n),s=document.getElementsByTagName(n)[0],u.async=1,u.src=c,s.parentNode.insertBefore(u,s)}(window,document,"script","//' +
  host +
  '/static/UDTracker.js?" + new Date().getTime(),"ud");' +
  'ud("create", "' + accountId + '", {' +
  'env: "' + env +
  '});' +
  'ud("analyze");'
  return document.body.appendChild(s)
}

const completed = () => {
  window.removeEventListener('load', completed)
  document.removeEventListener('DOMContentLoaded', completed)
}

document.addEventListener('DOMContentLoaded', completed)
window.addEventListener('load', completed)
