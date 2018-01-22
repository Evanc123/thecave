
// 'use strict';


if (!document.getElementById('blocking_reason')) {
    document.body.style.visibility="hidden"
    var textdiv = document.createElement("div");
    document.body.prepend(textdiv);
    textdiv.style.visibility="visible";
    textdiv.id = 'blocking_reason'
    document.addEventListener('contextmenu', event => event.preventDefault());

    // textdiv.innerHTML += '<link href="https://netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet">';

    textdiv.innerHTML += '<h1>The Cave </h1>'
    textdiv.innerHTML += '<text id="mywarning"></text>'
    textdiv.innerHTML += '<span id="blocking_timer" style="display:block;"></span>';
    textdiv.innerHTML += '<img src="https://umad.com/img/2015/10/patrick-star-meditation-gif-9299-9670-hd-wallpapers.jpg" style="display:block;"></img>';
    textdiv.innerHTML += '<text>If you leave this page, the timer will reset. Sort your life out! What tasks do you have to do today?</text>';
    textdiv.style += 'position: relative; margin: 0 auto; width: 800px; background: #fff; padding: 20px; border: 1px solid #e5e5e5;';
    textdiv.style.visibility="visible";
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    
}




document.getElementById('blocking_timer').innerHTML =
  03 + ":" + 00;
startTimer();

function startTimer() {
  var presentTime = document.getElementById('blocking_timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  //if(m<0){alert('timer completed')}

  if (m < 0) {
      location.reload();
    //   alert('timer completed');
    //   textdiv.innerHTML += '<button onclick="myFunction()">Proceed to website</button>';
  }
  
  document.getElementById('blocking_timer').innerHTML =
    m + ":" + s;
  setTimeout(startTimer, 2000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}


function myFunction() {
    location.reload();
}


