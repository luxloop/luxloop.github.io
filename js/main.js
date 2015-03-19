////////////////////////
// GLOBAL VARS

var isMobile = false;
var parallaxOn = true;
var numHallwayPics = 29;


//////////////////////////////////////// ADD Load/Resize function for parralax

////////////////////////
// SETUP ON READY

$(document).ready(function() {
    // var coverSrc = $("#cover").attr("data-bg");
    // if (coverSrc != undefined) {
    //     // console.log(coverSrc);
    //     $("#cover").backstretch(coverSrc);
    // };

    // coverSrc = $("#coverHalf").attr("data-bg");
    // if (coverSrc != undefined) {
    //     // console.log(coverSrc);
    //     $("#coverHalf").backstretch(coverSrc);
    // };

    // if ($("body").hasClass("projPage")) {
    //     $(".project").each(function(){
    //         var imgSrc = $(this).attr("data-bg");
    //         $(this).backstretch(imgSrc);
    //     });
    // };

    $(".hasFullBg").each(function(){
        var coverSrc = $(this).attr("data-bg");
        if (coverSrc != undefined) {
            // console.log(coverSrc);
            $(this).backstretch(coverSrc);
        };
    });

    $(".vidHolder").fitVids();

    $('.carousel').carousel();
    

    var buttWidth = $(".resizeButtons .row:nth-of-type(2) a").eq(1).outerWidth();
    $(".resizeButtons .row:nth-of-type(2) a").eq(0).css("width",buttWidth +"px");

    resizeClientLogos();

    if (parallaxOn && !Modernizr.touch) {
        // console.log("lax me!");
        $(".parallaxPossible").each(function(){
            $(this).removeClass("parallaxOff").addClass("parallaxOn").css("background-position","center " + 100 +"px");
        });
    };
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
        var promises = [];
        for (var i = 1; i <= numHallwayPics; i++) {
            preloadHallway("img/bgseq/"+i+".jpg", promises[i] = $.Deferred());
        }
        $.when.apply($, promises).done(function() {
            // console.log("preloaded");    
            $(".hallway").addClass("moveHallway");
        });
    };
});

$(".downArrow").hover(
  function() {
    $(".downArrow .pointer").addClass("hidden");
    $(".downArrow .scrollText").removeClass("hidden");
  }, function() {
    $(".downArrow .scrollText").addClass("hidden");
    $(".downArrow .pointer").removeClass("hidden");
  }
);

on_resize(function() {
    //Throttled on-resize handler
    resizeClientLogos();
})();

$( window ).resize(function() {
    //Normal on-resize handler
});

$(window).scroll(function(e) {
    if ($("body").hasClass("isNotMobile")) {
        var scrollTop = $(window).scrollTop();
        
        //console.log($(window).scrollTop())
        
        $(".parallaxPossible").each(function(){
            parallaxIt($(this),scrollTop,window.innerHeight);
        })
    };
});

$(".menuLines").click(function(e){
    e.preventDefault();
    $(this).toggleClass("active");
    toggleFullScreenMenu();
});

$("#body-nav").click(function(e){
    $(".menuLines").removeClass("active");
    toggleFullScreenMenu();
});

$(document).keyup(function(e) {
    if (e.keyCode == 27) {
        if ($('body').hasClass('show-nav')) {
            $('body').removeClass('show-nav').addClass('hide-nav');
            $(".menuLines").removeClass("active");

            setTimeout(function() {
                $('body').removeClass('hide-nav');
            }, 500);

        }
    }
});

$(".project").click(function(e){
    var dest = $("a", this).attr("href");
    console.log(dest);
    //document.location.href = whereTo;
});

$(".samePageLink").click(function(e){
    e.preventDefault();
    var dest = $(this).attr("href");
    var target;
    target = Math.floor($(dest).offset().top);
    var speed = Math.floor((target - $(window).scrollTop())/3);
    $("body").animate({
        scrollTop: target
    }, Math.abs(speed));
});


////////////////////////
// CUSTOM FUNCTIONS

function resizeClientLogos(){
    var logoWidth = $(".logoHolder").width() / $(".clientLogo").length;
    // console.log(logoWidth);
    $(".clientLogo").css("width",Math.floor(logoWidth));
}


function preloadHallway(url, promise) {
    var img = new Image();
    img.onload = function() {
      promise.resolve();
    };
    img.src = url;
    $("#preloadCache").append('<img src="' + img.src + '">')
    // console.log(url);
}

function parallaxIt(section,scrollPos,winHeight){
    // console.log("section top: " + section.offset().top + " | " + scrollPos);
    var sectionBegin = section.offset().top - winHeight;
    var sectionLength = section.outerHeight();
    var sectionEnd = section.offset().top + sectionLength;
    var scrollProportion = Math.abs(sectionBegin - scrollPos) / (winHeight);
    if (scrollPos > sectionBegin && scrollPos < sectionEnd) {
        var parallaxShift = 100 - (100*scrollProportion);
        // console.log(scrollProportion);
        if (section.hasClass("hallway")) {
            scrollHallway(scrollPos,sectionBegin,sectionEnd,sectionLength,winHeight);
        };
        section.css("background-position","center " + parallaxShift +"px");
    } else {
        section.removeAttr("style");
    };
}

function scrollHallway(scrollPos,sectionBegin,sectionEnd,sectionLength,winHeight) {
    var scrollProportion = Math.abs(sectionBegin - scrollPos) / (sectionLength + winHeight);
    //console.log(scrollProportion);
    var value = scrollProportion * numHallwayPics;
    if (Math.ceil(value) <= 0) {
        whichImg = 1;
    } else if (Math.ceil(value) > 0 && Math.ceil(value) <= numHallwayPics){
        whichImg = Math.ceil(value);
    } else {
        whichImg = numHallwayPics;
    }
    // console.log(whichImg);
    $(".moveHallway").css("background","url(img/bgseq/" + whichImg + ".jpg)")
}

function toggleFullScreenMenu() {
    if ($('body').hasClass('show-nav')) {
        $('body').removeClass('show-nav').addClass('hide-nav');

        setTimeout(function() {
            $('body').removeClass('hide-nav');
        }, 500);

    } else {
        $('body').removeClass('hide-nav').addClass('show-nav');
    }
}

// function projectSizer() {
//     //var ratio = 16/9;
//     var maxWidth = 1280;
//     if (maxWidth > $(window).width() * 0.9) { maxWidth = $(window).width() * 0.9};
//     var margin = $("#projectMenuBar").height();
//     var elemHeight = $(window).height() - margin - (margin * 1.25);
    

//     $(".vidBox").each(function(){
//         var ratio = 16/9;
//         var elemWidth = elemHeight * ratio;
//         if (elemWidth > maxWidth) { elemWidth = maxWidth};
//         $(this).css({
//             "padding-top" : (margin * 1.25) + "px",
//             "width" : elemWidth + "px"
//         });
//     });

//     $(".imgBox").each(function(){
//         var ratio = $(this).width()/$(this).height();
//         var elemWidth = elemHeight * ratio;
//         if (elemWidth > maxWidth) { elemWidth = maxWidth};
//         $(this).css({
//             "padding-top" : (margin * 1.25) + "px",
//             "width" : elemWidth + "px"
//         });
//     });
// }


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

