// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

$(document).ready(function () {
  $( "#replaceForm").on( "click", function() {
    var replaceAgainst = $("#replaceAgainst").val()
    var replaceWith = $("#replaceWith").val()
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {'replaceAgainst': replaceAgainst, 'replaceWith': replaceWith}, function(response) {
        console.log(response.result);
      });
    });
  });
});
