'use strict';
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
            this.updateBadge(request.status, request.pageId);
            break;
        }
      });
      chrome.tabs.onActivated.addListener((response) => {
        this.updateBadge({text: ''});
      });
    }
    updateBadge (status, pageId) {
      this.badgeColor(status);
      this.badgeText(pageId);
    }

    uodateBadgeColor (status) {
      switch (status) {
        case 'ok':
          chrome.browserAction.setBadgeBackgroundColor({color: '#42b812'});
          break;
        case 'used':
          chrome.browserAction.setBadgeBackgroundColor({color: '#1a3fdb'});
          break;
        case 'err':
          chrome.browserAction.setBadgeBackgroundColor({color: '#d60915'});
          break;
      }
    }

    updateBadgeText (pageId) {
      chrome.browserAction.setBadgeText({'text': pageId});
    }
    get (key) {
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
