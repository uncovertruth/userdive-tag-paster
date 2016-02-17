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
      document.querySelector('#save').addEventListener('click', (evt) => {
        this.save(evt);
      });
    }
    restoreConfigurations () {
      chrome.runtime.getBackgroundPage((backgroundPage) => {
        document.querySelector('#analytics-id').value = backgroundPage.bg.get('USERDIVEId');
        document.querySelector('#env').value = backgroundPage.bg.get('USERDIVEEnv');
        document.querySelector('#host').value = backgroundPage.bg.get('USERDIVEHost');
      });
    }
    save (evt) {
      chrome.runtime.getBackgroundPage((backgroundPage) => {
        backgroundPage.bg.set('USERDIVEId', document.querySelector('#analytics-id').value);
        backgroundPage.bg.set('USERDIVEEnv', document.querySelector('#env').value);
        backgroundPage.bg.set('USERDIVEHost', document.querySelector('#host').value);
      });
    }
  }

  /* eslint no-new: 1*/
  new Options();
})(window, document, chrome);
