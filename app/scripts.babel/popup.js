/* @flow */
/* eslint no-new:0 */
'use strict';
import Vue from 'vue';
import Info from '../components/info';
declare var chrome: any

(function (global, chrome, document) {
  class StateView {
    constructor () {
      global.addEventListener('load', (evt) => {
        this.render();
      });
    }
    render (): void {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {content: 'fetchCookie'}, (response) => {
          if (!response) {
            return;
          }
          this.mount(response.data);
        });
      });
    }
    mount (pageInfo): void {
      const afterSet: Promise<void> = this.setAttr(pageInfo);
      afterSet.then(() => {
        new Vue({
          el: '#info',
          render: h => h(Info)
        });
      }).catch(() => {
        throw new Error('couldn\'t set page\'s informations');
      });
    }

    setAttr (pageInfo): Promise<void> {
      return new Promise((resolve, reject) => {
        const dom: any = document.getElementById('info');
        const data: string = JSON.stringify(pageInfo);
        dom.setAttribute('data', data);
        resolve();
      });
    }
  }
  return new StateView();
})(window, chrome, document);
