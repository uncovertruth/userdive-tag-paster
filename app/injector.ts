function injectScript (id: string, source: string): void {
  const th = document.getElementsByTagName('body')[0]
  const s = document.createElement('script')
  s.text = source
  s.id = id
  th.appendChild(s)
}

type Config = {
  id: string
  host: string
  env: string
  ignore: string
}

function createTag (
  elementId: string,
  attrName: string,
  { id, host, env, ignore }: Config
): string {
  for (const domain of (ignore || '').split('\n')) {
    if (!domain) break
    const regexp = new RegExp(domain)
    if (regexp.test(global.location.href)) {
      return ''
    }
  }
  if (id.length < 3 || host.length < 14) {
    throw new Error('invalid config')
  }
  // tslint:disable-next-line:max-line-length
  return `"use strict";(function(global,document,element,state){element=document.getElementById("${elementId}");element.setAttribute("${attrName}",JSON.stringify({status:"Loading"}));if(!global.UDTracker||!global.USERDIVEObject){(function(e,t,n,c,r,a,s,u){e.USERDIVEObject=r;e[r]=e[r]||function(){(e[r].queue=e[r].queue||[]).push(arguments)};s=t.createElement(n);u=t.getElementsByTagName(n)[0];s.async=1;s.src=c;s.charset=a;u.parentNode.insertBefore(s,u)})(window,document,"script","//${host}/static/UDTracker.js?"+(new Date).getTime(),"ud","UTF-8");global.ud("create","${id}",{env:"${env}",cookieExpires:1});global.ud("analyze")}setTimeout(function(){element=document.getElementById("${elementId}");if(!global.UDTracker){element.setAttribute("${attrName}",JSON.stringify({status:"Blocked"}));return}if(!global.UDTracker.cookie.enableSession()){element.setAttribute("${attrName}",JSON.stringify({status:"Failed"}));return}state=global.UDTracker.cookie.fetch();state.overrideUrl=global.UDTracker.Config.getOverrideUrl();element.setAttribute("${attrName}",JSON.stringify(state))},2e3)})(window,document);`
}

export function inject (id: string, attr: string, config: Config) {
  injectScript(id, createTag(id, attr, config))
}
