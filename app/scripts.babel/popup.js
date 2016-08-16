(function () {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: 'get'}, function (response) {
      // document.getElementById('status').textContent = response.status;
      // console.log(response.status);
      const data = response.status.split(',');
      const ele = document.getElementById('status');
      for (const i in data) {
        const z = document.createElement('p');
        z.innerHTML = data[i];
        ele.appendChild(z);
      }
    });
  });
})();
