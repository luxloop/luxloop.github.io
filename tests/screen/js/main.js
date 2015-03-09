$(document).ready(function() {

});


/*
 First main problem was that CSS classes cant begin with a number. 
 I didn't know that either.

 You can only bind the "keydown" event once on the whole document.

 By having $(document).keydown() more than once, you were overwriting 
 the previous binding that you had written above it.

 So, any key being pressed will trigger a keydown event. The data of that 
 event is passed into the fucntion as the variable "e".

 Once the event is triggered, you test "e" for what the specifics of that 
 particular event are, and perform the appropriate action. In this case, we
 are testing the "keyCode" property of "e"

 I like to throw in e.preventDefault() in case there is something else
 already bound to that particular key.
*/
$(document).keydown(function(e) {
    //console.log(e.keyCode);
    if (e.keyCode == 71) {              // G
        e.preventDefault();
        //console.log("G");
        $("#vidWindow video").addClass("shift");
    } else if (e.keyCode == 72) {       // H
        e.preventDefault();
        //console.log("H");
        $("#vidWindow video").addClass("shift2");
    } else if (e.keyCode == 74) {       // J
        e.preventDefault();
        //console.log("J");
        $("#vidWindow video").addClass("shift3");
    }    
});

/*
Remember to remove the class on the keyup event
*/
$(document).keyup(function(e) {
    if (e.keyCode == 71) {
        e.preventDefault();
        //console.log("off");
        $("#vidWindow video").removeClass("shift");
    } else if (e.keyCode == 72) {
        e.preventDefault();
        //console.log("off");
        $("#vidWindow video").removeClass("shift2");
    } else if (e.keyCode == 74) {
        e.preventDefault();
        //console.log("off");
        $("#vidWindow video").removeClass("shift3");
    } 
});

$("#imgCover").click(function(e) {
    e.preventDefault();
    $(this).addClass("hidden");
    var vid = document.getElementById("theVideo");
    vid.play();
});

$(document).keyup(function(e) {
    if (e.keyCode == 72) {
        e.preventDefault();
        //console.log("off");
        $("#vidWindow video").removeClass("2shift");
    }   
});
$(document).keyup(function(e) {
    if (e.keyCode == 75) {
        e.preventDefault();
        //console.log("off");
        $("#vidWindow video").removeClass("3shift");
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
