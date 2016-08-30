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
      const statusAry = this.changeStatusToAry(status);
      const ele = document.getElementsByTagName('info')[0];
      for (const i in statusAry) {
        for (let index = 0; index < 2; index++) {
          index === 0
          ? ele.setAttribute(statusAry[i][index] + 'title', statusAry[i][index])
          : ele.setAttribute(statusAry[i][0], statusAry[i][index]);
        }
      }
      riot.mount('*');
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
})(chrome, document, JSON, window.riot);
