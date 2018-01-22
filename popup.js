// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

function setAlarm(event) {
  let minutes = parseFloat(event.target.value);
  chrome.browserAction.setBadgeText({text: 'ON'});
  chrome.alarms.create({delayInMinutes: minutes});
  chrome.storage.sync.set({minutes: minutes});
  changeBackgroundColor();
  window.close();
}

function clearAlarm() {
  chrome.browserAction.setBadgeText({text: ''});
  chrome.alarms.clearAll();
  window.close();
}

function changeBackgroundColor() {


  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    console.log(url);
    console.log('test');
  });

  var script = 'document.body.style.visibility="' + "hidden" + '";';
  // See https://developer.chrome.com/extensions/tabs#method-executeScript.
  // chrome.tabs.executeScript allows us to programmatically inject JavaScript
  // into a page. Since we omit the optional first argument "tabId", the script
  // is inserted into the active tab of the current window, which serves as the
  // default.
  console.log('print');
  chrome.tabs.executeScript({
    code: script
  });
}

//An Alarm delay of less than the minimum 1 minute will fire
// in approximately 1 minute incriments if released
// document.getElementById('sampleSecond').addEventListener('click', setAlarm);
// document.getElementById('15min').addEventListener('click', setAlarm);
// document.getElementById('30min').addEventListener('click', setAlarm);
// document.getElementById('cancelAlarm').addEventListener('click', clearAlarm);
