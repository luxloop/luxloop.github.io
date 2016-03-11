$(document).ready(function() {

});

$(document).keydown(function(e) {
    switch (e.keyCode) {
        case 71:
            e.preventDefault();
            //console.log("on");
            $("#vidWindow video").addClass("shift");
            break;
        case 83:
            e.preventDefault();
            //console.log("on");
            $("#vidWindow video").addClass("shift2");
            break;
        default:
            //console.log(e.keyCode);
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
        case 71:
            e.preventDefault();
            //console.log("on");
            $("#vidWindow video").removeClass("shift");
            break;
        case 83:
            e.preventDefault();
            //console.log("on");
            $("#vidWindow video").removeClass("shift2");
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