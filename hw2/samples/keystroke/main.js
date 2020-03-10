// Copyright 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var ime_api = chrome.input.ime;

var context_id = -1;
var bkg = chrome.extension.getBackgroundPage();
console.log("Initializing IME");

ime_api.onFocus.addListener(function(context) {
  alert('onFocus:' + context.contextID);
  context_id = context.contextID;
});
ime_api.onBlur.addListener(function(contextID) {
  alert('onBlur:' + contextID);
  context_id = -1;
});

ime_api.onActivate.addListener(function(engineID) {
  alert('onActivate:' + engineID);
});
ime_api.onDeactivated.addListener(function(engineID) {
  alert('onDeactivated:' + engineID);
});

ime_api.onKeyEvent.addListener(
function(engineID, keyData) {
  alert(('onKeyEvent:' + keyData.key + " context: " + context_id));
  if (keyData.type == "keydown" && keyData.key.match(/^[a-z]$/)) {
    chrome.input.ime.commitText({"contextID": context_id,
                                 "text": keyData.key.toUpperCase()});
    return true;
  }

  return false
});
