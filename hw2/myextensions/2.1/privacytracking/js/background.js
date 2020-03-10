// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
function f(tabId, changeInfo, tab) {
  if(changeInfo.url){
    var url = changeInfo.url;
    console.log("url is " + url);

    var para = { url: url };
    send(para);
  }
}
chrome.tabs.onUpdated.addListener(f);


