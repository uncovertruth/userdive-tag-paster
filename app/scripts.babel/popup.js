'use strict';
(function (chrome, document) {
  class StateView {
    constructor () {
      this.updateState();
    }
    getCookieState (tabId) {
      chrome.tabs.sendMessage(tabId, {pass: 'get'}, (response) => {
        console.log(response);
        if (!response || !response.status) {
          return;
        }
        this.appendState(response.status);
      });
    }
    appendState (status) {
      const data = status.split(',');
      const th = document.getElementsByTagName('tr')[1];
      for (const i in data) {
        const z = document.createElement('td');
        z.innerHTML = data[i];
        th.appendChild(z);
      }
    }
    updateState () {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        this.getCookieState(tabs[0].id);
      });
    }
  }

  /* eslint no-new: 1 */
  new StateView();
})(chrome, document);
