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
        this.appendState(response.status);
      });
    }
    appendState (status) {
      const statusHash = JSON.parse(status);
      const ele = document.getElementsByTagName('info')[0];
      for (const key in statusHash) {
        ele.setAttribute(key, statusHash[key]);
      }
      riot.mount('*');
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
