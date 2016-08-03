(function(){
  var ele = document.getElementById("status");
  ele.append("<h1>Yet</h1>");
  chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "hello")
      ele.append("<h1>successed</h1>");
  });
});
