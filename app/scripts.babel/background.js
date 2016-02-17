'use strict';

(function (root, chrome, localStorage) {
  class Background {
    constructor () {
      this.assignEventHandlers();
    }
    assignEventHandlers () {
      chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.config !== 'get') {
          return;
        }
        sendResponse({
          'id': this.get('USERDIVEId'),
          'host': this.get('USERDIVEHost'),
          'env': this.get('USERDIVEEnv')
        });
      });
    }
    get (key) {
      let value = localStorage[key];
      if (value) {
        return value;
      }
      return '';
    }
    set (key, value) {
      localStorage[key] = value;
    }
  }

  root.bg = new Background();
})(window, chrome, localStorage);
