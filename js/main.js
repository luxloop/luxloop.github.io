////////////////////////
// GLOBAL VARS

var isMobile = false;

////////////////////////
// SETUP ON READY

$(document).ready(function() {
    $("#cover").backstretch("img/cover.jpg");

    var buttWidth = $(".about .row:nth-of-type(2) a").eq(1).outerWidth();
    $(".about .row:nth-of-type(2) a").eq(0).css("width",buttWidth +"px");

    resizeClientLogos();
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

    // $(".firstQuote").css("background","url(img/bgseq/20.jpg)")
    if (!isMobile) {
        // $(".bigQuote").css("background-attachment","fixed !important");
    };
});

on_resize(function() {
    //Throttled on-resize handler
    resizeClientLogos();
})();

$( window ).resize(function() {
    //Normal on-resize handler
});

$(window).scroll(function(e) {
});


////////////////////////
// CUSTOM FUNCTIONS

function resizeClientLogos(){
    var logoWidth = $(".logoHolder").width() / $(".clientLogo").length;
    console.log(logoWidth);
    $(".clientLogo").css("width",logoWidth);
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

