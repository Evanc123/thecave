// Copyright 2017 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';



// Check if active tab changes. If there is a change in tab, 
// then the alarm is no longer valid. Thus, 
// reset all alarms. 
chrome.tabs.onActivated.addListener(function(callback) {
  console.log('Deleted alarm because changed.');
  chrome.alarms.clear('unblock');
  chrome.alarms.clear('block');
});



chrome.alarms.onAlarm.addListener(function(alarm) {



      chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tabs) {
        // and use that tab to fill in out title and url
      var tab = tabs[0];

      if (tab == null) {

      } else {
        if (alarm.name = 'unblock') {
          // chrome.alarms.clear('unblock');
          var delay = 3;

          var fiveMinutesLater = new Date();
          var offset = fiveMinutesLater.getMinutes() + delay;
          fiveMinutesLater.setMinutes(offset);
          console.log('will block at : ' + fiveMinutesLater);
          var redirects, pattern, from, to, redirecUrl;
          redirects = JSON.parse(localStorage.getItem('redirects') || '[]');
          for (var i=0; i < redirects.length; i++) {
            from = redirects[i][0];
            to = redirects[i][1];
            try {
              pattern = new RegExp(from, 'ig');
            } catch(err) {
              continue;
            }
            var match = tab.url.match(pattern);
            if (match) {
              if (redirects[i].length > 2) {
                redirects[i][2] = fiveMinutesLater;
              } else {
                redirects[i].push(fiveMinutesLater);
              }
              setRedirects(redirects);
              chrome.alarms.create('block', {delayInMinutes: offset + delay});
              //chrome.tabs.reload(tab.id);
              chrome.alarms.clear('unblock');
              // chrome.alarms.clear('block');
  
            }
          }
        }
        if (alarm.name = 'block') {
          chrome.alarms.clear('unblock');

          chrome.tabs.reload(tab.id);
          
        }

      }

      
        
       
    });


});

function getRedirects() {
  json = localStorage.getItem('redirects') || '[]'; 
  return JSON.parse(json);
}

function setRedirects(list) {
  localStorage.setItem('redirects', JSON.stringify(list));
}


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
    if (changeInfo.status == 'loading') {

    var redirects, pattern, from, to, redirecUrl;
    redirects = JSON.parse(localStorage.getItem('redirects') || '[]');
    for (var i=0; i < redirects.length; i++) {
      from = redirects[i][0];
      to = redirects[i][1];
      try {
        pattern = new RegExp(from, 'ig');
      } catch(err) {
        continue;
      }
      var match = tab.url.match(pattern);
      if (match) {
        // if it has been temporarily enabled
        if (redirects[i].length > 2) {
          //compare the times
          var now = new Date();
          var test_date = new Date(redirects[i][2]);
          if (now < test_date) {

            console.log('Not blocking because ');
            // console.log('now: ', now);
            // console.log('test_date: ')
            console.log('now: ' + now);
            console.log('lockout: ' + test_date);
            continue;
          } else {
            chrome.alarms.clear('unblock');

            console.log('Blocking because ');
            console.log('now: ' + now);
            console.log('lockout: ' + test_date);
          }
        } 
        chrome.tabs.executeScript({
          file: "./block.js"
        });
        var script = 'document.getElementById("mywarning").innerHTML="' + to + '";';
        
        setTimeout(function (){
          chrome.tabs.executeScript({
            code: script
          });
        }, 250);
        
        chrome.alarms.create('unblock', {delayInMinutes: 3});
        
      }
    }
  }
});


function showNotification(info) {
  chrome.notifications.create({
    type:     'basic',
    iconUrl:  'cavelogo.png',
    title:    info,
    message:  'test',
    buttons: [
      {title: 'Get off facebook'}
    ],
    priority: 0});
};
