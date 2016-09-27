'use strict';
(function (chrome, document, json, riot) {
  class StateView {
    constructor () {
      this.updateState();
    }
    getCookieState (tabId) {
      chrome.tabs.sendMessage(tabId, {pass: 'get'}, (response) => {
        if (!response || !response.status) {
          return;
        }
        this.renameState(response.status);
      });
    }
    renameState (status) {
      console.log(status);
      const tagName = 'info';
      const tagDom = document.getElementsByTagName(tagName)[0];
      tagDom.setAttribute('status', JSON.stringify(status));
      riot.mount(tagName);
    }
    updateState () {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        this.getCookieState(tabs[0].id);
      });
    }
  }

  /* eslint no-new: 1 */
  new StateView();
})(chrome, document, JSON, window.riot);
