/* @flow */
'use strict';
declare var chrome: any;
(function (global, chrome, localStorage) {
  class Background {
    constructor () {
      this.assignEventHandlers();
    }
    assignEventHandlers () {
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        switch (request.config) {
          case 'get':
            sendResponse({
              'env': this.get('USERDIVEEnv'),
              'host': this.get('USERDIVEHost'),
              'id': this.get('USERDIVEId'),
              'ignore': this.get('USERDIVEIgnore')
            });
            break;
          case 'status':
            this.updateBadge(request.text, request.status);
            break;
        }
      });
      chrome.tabs.onActivated.addListener((response) => {
        this.updateBadge({text: ''});
      });
    }
    updateBadge (text: string | {text: string} = '?', status: string = 'err'): void {
      switch (status) {
        case 'ok':
          chrome.browserAction.setBadgeBackgroundColor({color: '#42b812'});
          chrome.browserAction.setBadgeText({text});
          break;
        case 'used':
          chrome.browserAction.setBadgeBackgroundColor({color: '#1a3fdb'});
          chrome.browserAction.setBadgeText({text});
          break;
        case 'err':
          chrome.browserAction.setBadgeBackgroundColor({color: '#d60915'});
          chrome.browserAction.setBadgeText({text});
          break;
        default:
          chrome.browserAction.setBadgeBackgroundColor({color: '#CCCCCC'});
          chrome.browserAction.setBadgeText({'text': '?'});
      }
    }
    get (key: string): string {
      const value = localStorage[key];
      if (value) {
        return value;
      }
      return '';
    }
    set (key, value) {
      localStorage[key] = value;
    }
  }
  global.bg = new Background();
})(window, chrome, localStorage);
