'use strict';
(function (chrome, document) {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: 'get'}, function (response) {
      const data = response.status.split(',');
      const th = document.getElementsByTagName('tr')[1];
      for (const i in data) {
        const z = document.createElement('td');
        z.innerHTML = data[i];
        th.appendChild(z);
      }
    });
  });
})(chrome, document);
