// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

function keyup(e) {
  var name = document.getElementById("name").value;
  document.getElementById('greet').innerText='Hello ' + name;
}

document.addEventListener('DOMContentLoaded', function () {
  var input = document.querySelector('input');
  input.addEventListener('keyup', keyup);
});
