// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var titles = {};

function f(tabId, changeInfo, tab) {
  if (changeInfo.title) {
    if (!titles[tabId]) {
      titles[tabId] = changeInfo.title
    } else if (titles[tabId] === changeInfo.title) {
      // do nothing
    } else {
      chrome.tabs.query({}, function(tabs) {
        tabs.forEach(t => {
          if (t.id != tabId) {
            chrome.tabs.executeScript(t.id, {
              // hacky way to include jQuery
              file: 'jquery-3.4.1.min.js'
            }, function() {
              chrome.tabs.executeScript(t.id, 
                {code: `var title = "${changeInfo.title}"`}
              , function() {
                chrome.tabs.executeScript(t.id, 
                  {file: 'insert_update.js'});
                })
           });
          }
        })
      });
    }
  }
}

chrome.tabs.onUpdated.addListener(f)