/* @flow */
function injectScript (id: string, source: string): void {
  const th = document.getElementsByTagName('body')[0]
  const s = document.createElement('script')
  s.text = source
  s.id = id
  th.appendChild(s)
}

type Config = {
  id: string,
  host: string,
  env: string,
  ignore: string
}

function createTag (
  elementId: string,
  attrName: string,
  { id, host, env }: Config
): string {
  if (id.length < 3 || host.length < 14) {
    throw new Error('invalid config')
  }
  return `"use strict";(function(e,t,r,i){if(!e.UDTracker||!e.USERDIVEObject){(function(e,t,r,i,n,a,c,s){e.USERDIVEObject=n;e[n]=e[n]||function(){(e[n].queue=e[n].queue||[]).push(arguments)};c=t.createElement(r);s=t.getElementsByTagName(r)[0];c.async=1;c.src=i;c.charset=a;s.parentNode.insertBefore(c,s)})(window,t,"script","//${host}/static/UDTracker.js?"+(new Date).getTime(),"ud","UTF-8");e.ud("create","${id}",{env:"${env}",cookieExpires:1});e.ud("analyze")}setTimeout(function(){r=t.getElementById("${elementId}");if(!e.UDTracker){r.setAttribute("${attrName}",JSON.stringify({status:"Blocked"}));return}if(!e.UDTracker.cookie.enableSession()){r.setAttribute("${attrName}",JSON.stringify({status:"Failed"}));return}i=e.UDTracker.cookie.fetch();i.overrideUrl=e.UDTracker.Config.getOverrideUrl();r.setAttribute("${attrName}",JSON.stringify(i))},2e3)})(window,document);`
}

export function inject (id: string, attr: string, config: Config) {
  injectScript(id, createTag(id, attr, config))
}
