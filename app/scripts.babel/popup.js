(function () {
  const ele = document.getElementById('status');
  chrome.runtime.sendMessage({greeting: 'ok'}, function (res) {
    console.log(res.nowStatus);
    ele.innerText = res.nowStatus;
  });
})();
