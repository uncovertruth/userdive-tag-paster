'use strict';
(function (chrome, document, json) {
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
      console.log(this.changeStatusToAry(status));
    }

    changeStatusToAry (status) {
      const attrStatus = status.split(',');
      const data = [['', ''], ['', '']];
      for (const i in attrStatus) {
        const attrAry = attrStatus[i].split(':');
        for (let count = 0; count < 2; count++) {
          data[i][count] = attrAry[count];
        }
      }
      return data;
    }
    updateState () {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        this.getCookieState(tabs[0].id);
      });
    }
  }

  /* eslint no-new: 1 */
  new StateView();
})(chrome, document, JSON);
