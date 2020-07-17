chrome.runtime.onStartup.addListener(function() {
  console.log("starting up");
});

chrome.runtime.onInstalled.addListener(async function() {
  const { id, profile } = await initFingerprint();
  const registeredTarget = await registerTarget({
    targetId: id,
    profile
  });
  console.log(registeredTarget);

  const socket = initSocket(id);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "Message from a content script:" + sender.tab.url
      : "Message from the extension"
  );
  // prevent socket from disconnecting on reload
  return true;
});
