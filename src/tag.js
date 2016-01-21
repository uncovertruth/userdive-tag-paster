export default class Tag {
  constructor (accountId, env, hostName) {
    this.accountId = accountId
    this.env = env
    this.hostName = hostName
  }
  build () {
    return '!function(e,t,n,c,r,u,s){e.USERDIVEObject=r,e[r]=e[r]||function(){(e[r].queue=e[r].queue||[]).push(arguments)},u=t.createElement(n),s=document.getElementsByTagName(n)[0],u.async=1,u.src=c,s.parentNode.insertBefore(u,s)}(window,document,"script","//' +
    this.hostName +
    '/static/UDTracker.js?" + new Date().getTime(),"ud");' +
    'ud("create", "' + this.accountId + '", {' +
    'env: "' + this.env +
    '});' +
    'ud("analyze");'
  }
}
