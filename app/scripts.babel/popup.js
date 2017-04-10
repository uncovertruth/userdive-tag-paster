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
    render () {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {content: 'fetchCookie'}, (response) => {
          if (!response) {
            return;
          }
          this.mount(response.data);
        });
      });
    }
    mount (pageInfo) {
      setTimeout(() => {
        new Vue({
          el: '#info',
          data: {
            datas: JSON.parse(pageInfo)
          },
          render: h => h(Info)
        });
      }, 1000);
    }
  }
  return new StateView();
})(window, chrome, document);
