'use strict';

(function (root, document, chrome) {
  class TrackingStatus {
    constructor () {
      this.start();
    }
    start () {
      root.setTimeout(function () {
        this.updateBadge();
        alert('loaded');
      }, 1000);
    }
    updateBadge () {
      chrome.tabs.executeScript(
        null, {
          code: 'console.log(window.USERDIVEObject, window.UDTracker) return window.UDTracker'
        },
        result => {
          console.log(result);
          if (!result) {
            return;
          }
          chrome.browserAction.setBadgeText({'text': 'Not'});
        }
      );
    }
  }

  root.status = new TrackingStatus();
})(window, document, chrome);
