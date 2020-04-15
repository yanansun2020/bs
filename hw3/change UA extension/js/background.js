// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.

chrome.webRequest.onBeforeSendHeaders.addListener(
    function (details) {
      for (var i = 0; i < details.requestHeaders.length; ++i) {
        if (details.requestHeaders[i].name === 'User-Agent') {
          let ua =  details.requestHeaders[i].value;
          const regex = new RegExp("Chrome/8[1-2].[0-9]+");
          ua = ua.replace(regex, "Chrome/14.828");
          details.requestHeaders[i].value = ua;
          break;
        }
      }
      return { requestHeaders: details.requestHeaders };
    },
    { urls: ['<all_urls>'] },
    ['blocking', 'requestHeaders']
);
