/* @flow */
'use strict';
declare var chrome: any
(function (global, chrome, document) {
  class StateView {
    constructor () {
      global.addEventListener('load', (evt) => {
        this.render();
      });
    }
    render () {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {content: 'fetchCookie'}, (response) => {
          if (!response) {
            return;
          }
          global.riot.mount('info', {data: response.data});
        });
      });
    }
  }
  return new StateView();
})(window, chrome, document);
