'use strict';
(function (chrome, document, riot) {
  class StateView {
    constructor () {
      this.updateState();
    }
    getCookieState (tabId) {
      chrome.tabs.sendMessage(tabId, {pass: 'get'}, (response) => {
        if (!response || !response.status) {
          return;
        }
        this.mountTag(response.status);
      });
    }
    mountTag (status) {
      const tagName = 'info';
      riot.mount(tagName, {data: status});
    }
    updateState () {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        this.getCookieState(tabs[0].id);
      });
    }
  }

  /* eslint no-new: 1 */
  new StateView();
})(chrome, document, window.riot);
