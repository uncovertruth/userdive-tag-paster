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
            this.updateBadge(request.statusText);
            break;
        }
      });
      chrome.tabs.onActivated.addListener((response) => {
        this.updateBadge({text: ''});
      });
    }
    updateBadge (statusText) {
      chrome.browserAction.setBadgeBackgroundColor({color: '#333'});
      chrome.browserAction.setBadgeText({'text': statusText});
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
