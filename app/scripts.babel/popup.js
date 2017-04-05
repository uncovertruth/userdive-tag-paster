/* @flow */
/* eslint no-new:0 */
'use strict';
declare var chrome: any
declare var Vue: any
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
          const pageInfo = response ? response.data : {status: 'failed'};
          new Vue({
            el: '#app',
            data: {
              pageInfo
            }
          });
        });
      });
    }
  }
  return new StateView();
})(window, chrome, document);
