/* @flow */
/* eslint no-new:0 */
'use strict';
import Vue from 'vue/dist/vue.runtime.esm';
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
      this.setAttr(pageInfo);
      setTimeout(() => {
        new Vue({
          el: '#info',
          render: h => h(Info)
        });
      }, 100);
    }
    setAttr (pageInfo) {
      const dom: any = document.getElementById('info');
      const data = JSON.stringify(pageInfo);
      dom.setAttribute('data', data);
    }
  }
  return new StateView();
})(window, chrome, document);
