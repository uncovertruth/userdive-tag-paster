'use strict';

(function (root, chrome, localStorage) {
  class Background {
    constructor () {
      this.assignEventHandlers();
    }
    assignEventHandlers () {
    }
    get (key) {
      let value = localStorage[key];
      if (value) {
        return value;
      }
      return '';
    }
    set (key, value) {
      localStorage[key] = value;
    }
  }

  root.bg = new Background();
})(window, chrome, localStorage);
