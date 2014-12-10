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
    createProjectThumbs();
    projectSizer();
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

    projectSizer();
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

$(".projThumb").click(function(){
    var dest = $(this).attr("data-dest");
    // alert(dest);
    if (dest !== undefined) {
        window.location.href = dest;
    };

})

on_resize(function() {
    //Throttled on-resize handler
    resizeThumbs();
    evenFooters();
    projectSizer()
    
})();

$( window ).resize(function() {
    //Normal on-resize handler
});

$(window).scroll(function(e) {
    if ($(this).scrollTop() <= $(this).height() && $(this).scrollTop() >= 0 && !isMobile) {
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

    if ($("#bgHolderP").height() !== null) {
        //console.log("parallax");
        var scrollRange = $(document).height() - $(window).height();
        if ($(this).scrollTop() <= scrollRange && $(this).scrollTop() >= 0 && !isMobile) {
            var difference = $("#bgHolderP").height() - $(window).height();
            var target = Math.floor(difference * ($(this).scrollTop()/scrollRange));
            $("#bgHolderP").css("top",-target + "px");
        };
    };
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
    $(".projThumb, .galThumb").each(function(){
        //alert($(this).width());
        var h = $(this).width() * ratio;
        $(this).css("height",h+"px");
        if ($(this).data('backstretch') !== undefined) {
            $(this).backstretch("resize");
        };
    });
}

function createProjectThumbs() {
    $(".projThumb").each(function(){
        var thumb = $(this).attr("data-thumb");
        //console.log(thumb);
        if (thumb !== undefined && thumb !== null) {
            $(this).backstretch("img/projects/"+thumb);
        };
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

function projectSizer() {
    //var ratio = 16/9;
    var maxWidth = 1280;
    if (maxWidth > $(window).width() * 0.9) { maxWidth = $(window).width() * 0.9};
    var margin = $("#projectMenuBar").height();
    var elemHeight = $(window).height() - margin - (margin * 1.25);
    

    $(".vidBox").each(function(){
        var ratio = 16/9;
        var elemWidth = elemHeight * ratio;
        if (elemWidth > maxWidth) { elemWidth = maxWidth};
        $(this).css({
            "padding-top" : (margin * 1.25) + "px",
            "width" : elemWidth + "px"
        });
    });

    $(".imgBox").each(function(){
        var ratio = $(this).width()/$(this).height();
        var elemWidth = elemHeight * ratio;
        if (elemWidth > maxWidth) { elemWidth = maxWidth};
        $(this).css({
            "padding-top" : (margin * 1.25) + "px",
            "width" : elemWidth + "px"
        });
    });
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

