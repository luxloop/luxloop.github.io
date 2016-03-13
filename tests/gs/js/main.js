var lKeyDown = false;;
var rKeyDown = false;

$(document).ready(function() {

});

$(document).keydown(function(e) {
    switch (e.keyCode) {
        case 37:
            e.preventDefault();
            //console.log("on");
            //LEFT KEY
            lKeyDown = true;
            $("#vidWindow video").removeClass("shift").removeClass("shift2");
            $("#vidWindow video").addClass("shift");
            break;
        case 39:
            e.preventDefault();
            //console.log("on");
            //LEFT KEY
            rKeyDown = true;
            $("#vidWindow video").removeClass("shift").removeClass("shift2");
            $("#vidWindow video").addClass("shift2");
            break;
        default:
            console.log(e.keyCode);
            break;
    }
});

$("#imgCover").click(function(e) {
    e.preventDefault();
    $(this).addClass("hidden");
    //$(this).fadeOut(2000);
    var vid = document.getElementById("theVideo");
    vid.play();
});

$(document).keyup(function(e) {
    switch (e.keyCode) {
        case 37:
            e.preventDefault();
            //console.log("on");
            //LEFT KEY
            lKeyDown = false;
            $("#vidWindow video").removeClass("shift").removeClass("shift2");
            if (rkeyDown === true) {
              $("#vidWindow video").addClass("shift2");
            }
            break;
        case 83:
            e.preventDefault();
            //console.log("on");
            //RIGHT KEY
            rKeyDown = false;
            $("#vidWindow video").removeClass("shift").removeClass("shift2");
            if (lkeyDown === true) {
              $("#vidWindow video").addClass("shift");
            }
            break;
        default:
            //console.log(e.keyCode);
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

// Place any jQuery/helper plugins in here.
