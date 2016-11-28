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
        switch (request.bg) {
          case 'get':
            sendResponse({
              'env': this.get('USERDIVEEnv'),
              'host': this.get('USERDIVEHost'),
              'id': this.get('USERDIVEId'),
              'ignore': this.get('USERDIVEIgnore')
            });
            break;
          case 'badge':
            sendResponse({
              text: this.updateBadge(request.text)
            });
            break;
        }
      });
      chrome.tabs.onActivated.addListener((response) => {
        this.renderBadge('', '');
      });
    }
    renderBadge (text: string, color: string): string {
      chrome.browserAction.setBadgeBackgroundColor({color});
      chrome.browserAction.setBadgeText({text});
      return text;
    }
    updateBadge (text: string | number): void {
      if (typeof text === 'number') {
        this.renderBadge(text.toString(), '#42b812');
        return;
      }
      this.renderBadge(text.toString(), '#CCCCCC');
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
