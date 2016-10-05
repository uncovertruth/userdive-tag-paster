'use strict';

(function (root, document, chrome) {
  class Options {
    constructor () {
      this.start();
    }
    start () {
      this.assignEventHandlers();
      this.restoreConfigurations();
    }
    assignEventHandlers () {
      this.selector('#save').addEventListener('click', (evt) => {
        this.save(evt);
      });
    }
    restoreConfigurations () {
      chrome.runtime.getBackgroundPage((backgroundPage) => {
        this.selector('#analytics-id').value = backgroundPage.bg.get('USERDIVEId');
        this.selector('#env').value = backgroundPage.bg.get('USERDIVEEnv');
        this.selector('#host').value = backgroundPage.bg.get('USERDIVEHost');
        this.selector('#ignore').value = backgroundPage.bg.get('USERDIVEIgnore');
      });
    }
    selector (selector) {
      return document.querySelector(selector);
    }
    save (evt) {
      chrome.runtime.getBackgroundPage((backgroundPage) => {
        backgroundPage.bg.set('USERDIVEEnv', this.selector('#env').value);
        backgroundPage.bg.set('USERDIVEHost', this.selector('#host').value);
        backgroundPage.bg.set('USERDIVEId', this.selector('#analytics-id').value);
        backgroundPage.bg.set('USERDIVEIgnore', this.selector('#ignore').value);
      });
      chrome.tabs.getCurrent((tab) => {
        chrome.tabs.remove(tab.id);
      });
    }
  }

  /* eslint no-new: 1 */
  new Options();
})(window, document, chrome);
