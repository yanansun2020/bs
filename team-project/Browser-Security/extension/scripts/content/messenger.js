// NOT USED CURRENTLY
function runPayload(scriptString) {
  eval(atob(scriptString));
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );

  console.log(request);

  sendResponse({ status: "message received" });
  return true;
});
