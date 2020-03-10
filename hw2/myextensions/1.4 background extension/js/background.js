// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.

setInterval(function() {
  getLocation();
}, 60 * 1000); // 60 * 1000 milsec


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.") ;
  }
}

function showPosition(position) {
  x = "Latitude: " + position.coords.latitude +
      " Longitude: " + position.coords.longitude;
  console.log(x)
  var params = {"latitude": position.coords.latitude, "longitude":position.coords.longitude};
  send(params);
}

function send(parameter) {
  $.ajax({
    url:"http://localhost:3000/geolocation",
    type:"POST",
    data:JSON.stringify(parameter),
    contentType:"application/json; charset=utf-8",
    dataType:"json",
    success: function(){
    }
  });
}


/* function f(tabId, changeInfo, tab) {
  getLocation();
}
chrome.tabs.onCreated.addListener(f); */


7aFgTCDbeNsto9uah9NqPf
yanansun@andrew.cmu.edu
