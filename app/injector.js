"use strict";
exports.__esModule = true;
function injectScript(id, source) {
    var th = document.getElementsByTagName('body')[0];
    var s = document.createElement('script');
    s.text = source;
    s.id = id;
    th.appendChild(s);
}
function createTag(elementId, attrName, _a) {
    var id = _a.id, host = _a.host, env = _a.env, ignore = _a.ignore;
    for (var _i = 0, _b = (ignore || '').split('\n'); _i < _b.length; _i++) {
        var domain = _b[_i];
        if (!domain)
            break;
        var regexp = new RegExp(domain);
        if (regexp.test(global.location.href)) {
            return '';
        }
    }
    if (id.length < 3 || host.length < 14) {
        throw new Error('invalid config');
    }
    return "\"use strict\";(function(global,document,element,state){element=document.getElementById(\"" + elementId + "\");element.setAttribute(\"" + attrName + "\",JSON.stringify({status:\"Loading\"}));if(!global.UDTracker||!global.USERDIVEObject){(function(e,t,n,c,r,a,s,u){e.USERDIVEObject=r;e[r]=e[r]||function(){(e[r].queue=e[r].queue||[]).push(arguments)};s=t.createElement(n);u=t.getElementsByTagName(n)[0];s.async=1;s.src=c;s.charset=a;u.parentNode.insertBefore(s,u)})(window,document,\"script\",\"//" + host + "/static/UDTracker.js?\"+(new Date).getTime(),\"ud\",\"UTF-8\");global.ud(\"create\",\"" + id + "\",{env:\"" + env + "\",cookieExpires:1});global.ud(\"analyze\")}setTimeout(function(){element=document.getElementById(\"" + elementId + "\");if(!global.UDTracker){element.setAttribute(\"" + attrName + "\",JSON.stringify({status:\"Blocked\"}));return}if(!global.UDTracker.cookie.enableSession()){element.setAttribute(\"" + attrName + "\",JSON.stringify({status:\"Failed\"}));return}state=global.UDTracker.cookie.fetch();state.overrideUrl=global.UDTracker.Config.getOverrideUrl();element.setAttribute(\"" + attrName + "\",JSON.stringify(state))},2e3)})(window,document);";
}
function inject(id, attr, config) {
    injectScript(id, createTag(id, attr, config));
}
exports.inject = inject;
