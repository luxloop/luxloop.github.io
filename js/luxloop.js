////////////////////////
// GLOBAL VARS

var blogImgRatio = 0.5;
var isMobile = false;
var isScrolling = false;

////////////////////////
// SETUP ON READY

$(document).ready(function() {
    $("#staticBg").backstretch("img/017.jpg");
    resizeThumbs();
});

////////////////////////
// EVENTS

$( window ).load(function() {
    if (jQuery.browser.mobile == true) {
        isMobile = true;
        $("body").addClass("isMobile");
    } else {
        $("body").addClass("isNotMobile");
    };
    
    if (!isMobile) {
        $("#slideshowBg").backstretch([
              "img/017.jpg"
            , "img/001.jpg"
            , "img/002.jpg"
            , "img/003.png"
            , "img/004.png"
            , "img/005.jpg"
            , "img/006.jpg"
            , "img/007.jpg"
            , "img/008.jpg"
            , "img/010.jpg"
            , "img/011.jpg"
            , "img/012.jpg"
            , "img/013.png"
            , "img/014.png"
        ], {duration: 5500, fade: 1000});
    };
});

$(".botNavLink, .topNavLink").click(function(){
    var dest = $(this).attr("data-dest");
    var target;
    if (dest === "#footerSection") {
        target = Math.floor($(dest).offset().top);
    } else {
        target = Math.floor($(dest).offset().top - ($("#menuBarTop").height() * 1.5));
    };
    var speed = Math.floor((target - $(window).scrollTop())/3);
    $("body").animate({
        scrollTop: target
    }, Math.abs(speed));
});

$("#topLogo").click(function(){
    var speed =  Math.floor($(window).scrollTop()/3);
    $("body").animate({
        scrollTop: 0
    }, speed);
});

on_resize(function() {
    //Throttled on-resize handler
    resizeThumbs();
    evenFooters();
    
})();

$( window ).resize(function() {
    //Normal on-resize handler
});

$(window).scroll(function(e) {
    /*
    if ($(this).scrollTop() <= 0) {
        console.log("top");
        isScrolling == false;
    };
    */
    if ($(this).scrollTop() <= $(this).height() && $(this).scrollTop() >= 0) {
        var difference = $("#bgHolder").height() - $(this).height();
        var target = Math.floor(difference * ($(this).scrollTop() / $(this).height()));
        $("#bgHolder").css("top",-target + "px");
    };

    if ($(this).scrollTop() > 5) {
        $("#menuBarBot").fadeOut(200);
        $("#menuBarTop").fadeIn(250);
    } else {
        $("#menuBarTop").fadeOut(250);
        $("#menuBarBot").fadeIn(200);
    }
});


////////////////////////
// CUSTOM FUNCTIONS

function resizeThumbs() {
    var ratio = $(window).height()/$(window).width();
    if (ratio > 3/4) {
        ratio = 3/4;
    } else if (ratio < 9/16) {
        ratio = 9/16;
    };
    $(".projThumb").each(function(){
        //alert($(this).width());
        var h = $(this).width() * ratio;
        $(this).css("height",h+"px");
    });
}

function evenFooters() {
    if ($("#footRight").css("display") !== "none") {
        var fL = $("#footLeft").height();
        var fR = $("#footRight").height();
        if ( fL > fR ) {
            $("#footRight").css("height",fL+"px");
        } else if ( fR > fL ) {
            $("#footLeft").css("height",fR+"px");
        };
    };
}

////////////////////////
// UTILITIES

// debulked onresize handler
function on_resize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,250)};return c};


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


// Mailchimp validate
(function($) {
    window.fnames = new Array(); 
    window.ftypes = new Array();
    fnames[0]='EMAIL';ftypes[0]='email';
    fnames[1]='FNAME';ftypes[1]='text';
    fnames[2]='LNAME';ftypes[2]='text';
}(jQuery));
var $mcj;
// init only if loaded external script
if (window.mc !== undefined) {
    $mcj = jQuery.noConflict(true);
};

