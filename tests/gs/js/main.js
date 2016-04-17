// Gypsy Sport - Al La Do - Interactive Teaser
// (c) 2016 Luxloop
var leftDown = false;
var rightDown = false;
var mostRecent = "";
var top1 = 808;
var top2 = 406;
var hasLoaded = false;
var timeOut;

$(document).ready(function() {
  //console.log("ready");
  // timeout = setTimeout(setReadyToPlay, 10000);
  $("#theVideo").on('canplaythrough', canPlayThrough);
  $("#theVideo").attr('src','vid/gs.mp4');
  resizeContainer()
  animate()
});

$(document).keydown(function(e) {
    // console.log(e.keyCode);
    switch (e.keyCode) {
        case 37:
            e.preventDefault();
            //$("#vidWindow video").addClass("shift");
            leftDown = true;
            mostRecent = "l";
            break;
        case 39:
            //e.preventDefault();
            //$("#vidWindow video").addClass("shift2");
            rightDown = true;
            mostRecent = "r";
            break;
        default:
            break;
    }
});

$("#imgCover").click(function(e) {
    e.preventDefault();
    if (hasLoaded) {
      $(this).addClass("hidden");
      //$(this).fadeOut(2000);
      var vid = document.getElementById("theVideo");
      vid.play();
    }
});

$(document).keyup(function(e) {
    mostRecent = "";
    // console.log(e.keyCode);
    switch (e.keyCode) {
      case 37:
        e.preventDefault();
        //$("#vidWindow video").removeClass("shift");
        leftDown = false;
        break;
      case 39:
        e.preventDefault();
        //$("#vidWindow video").removeClass("shift2");
        rightDown = false;
        break;
      case 38: case 40:
        e.preventDefault();
        break;
      default:
        break;
    }
});

$("#vidWindow video").click(function(e) {
    e.preventDefault();
    var vid = document.getElementById("theVideo");
    if(vid.paused){
        vid.play();
    } else {
        vid.pause();
    }
});

var theVid = document.getElementById("theVideo");
theVid.onended = function() {
    //alert("The video has ended");
    $("#imgCover").removeClass("hidden");
    //$("#imgCover").fadeIn(2000);
};

function animate() {
  if (mostRecent !== "") {
    if (mostRecent == "l") {
      $("#vidWindow").scrollTop(top1);
    } else if (mostRecent == "r") {
      $("#vidWindow").scrollTop(top2);
    }
  } else if (leftDown) {
    $("#vidWindow").scrollTop(top1);
  } else if (rightDown) {
    $("#vidWindow").scrollTop(top2);
  } else {
    $("#vidWindow").scrollTop(1);
  }
  requestAnimationFrame(animate);
}

//Throttled on-resize handler
on_resize(function() {
    resizeContainer()
});

function canPlayThrough() {
  console.log("video can play")
  clearTimeout(timeOut)
  setReadyToPlay()
}

function setReadyToPlay() {
  $("#imgCover").removeClass('loading')
  $("#imgCover").addClass('loaded')
  hasLoaded = true;
}

function resizeContainer() {
  var scale = 0.555555556;
  var scale3up = 1.6875
  var winWidth = window.innerWidth;
  var width;
    if ($('body').hasClass("embedded")) {
      width = winWidth;
    } else if ($('body').hasClass("ownPage")) {

      if (winWidth > 1700) {
        width = winWidth * 0.6;
      } else if (winWidth > 1400) {
        width = winWidth * 0.7;
      } else if (winWidth > 600) {
        width = winWidth * 0.8;
      } else {
        width = winWidth * 0.9;
      }
    }

    if (width !== undefined) {
      $("body #vidWindow").css({"width":width,"height":width*scale})
      $("body #theVideo").css({"width":width,"height":width*scale3up})
      top2 = width * 0.563888889;
      top1 = width * 1.122222222;
    }
}


// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// debulked onresize handler
function on_resize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,250)};return c};

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// MIT license
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] ||
                                      window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());
