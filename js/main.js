////////////////////////
// GLOBAL VARS

var isMobile = false;
var parallaxOn = true;

var xMousePos = 0;
var yMousePos = 0;
var lastScrolledLeft = 0;
var lastScrolledTop = 0;

/*
 * TO DO:
 * redo parallax behavior
 * write custom mailchimp API call
 * Add load/resize function for parralax
 */

//////////////////////////////////////// 

////////////////////////
// SETUP ON READY

$(document).ready(function() {

    // Build backgrounds

    //console.log(window.$f);

    $(".hasFullBg").each(function(){
        var cover = $(this);
        var coverSrc = cover.attr("data-bg");
        if (coverSrc != undefined) {
            var img = new Image();
            img.onload = function() {
              cover.backstretch(coverSrc, {fade: 3000});
              gifBg(cover);
            };
            img.onerror = function() {
              gifBg(cover);
            };
            img.src = coverSrc;
        };
    });


    // Initialize plugins

    if ($(".vidHolder").length) {
        $(".vidHolder").fitVids();  
    };

    $(".carousel").carousel({
      interval: 5000
    })
    $(".carousel").carousel('pause');
    $("#workCarousel").carousel('cycle');



    $('[data-toggle="tooltip"]').tooltip();
    

    // resize and reposition things

    var buttWidth = $(".resizeButtons .row:nth-of-type(2) a").eq(1).outerWidth();
    $(".resizeButtons .row:nth-of-type(2) a").eq(0).css("width",buttWidth +"px");

    projectTitle();
    resizeClientLogos();

    if (parallaxOn && !Modernizr.touch) {
        $(".parallaxPossible").each(function(){
            $(this).removeClass("parallaxOff").addClass("parallaxOn").css("background-position","center " + 100 +"px");
        });
    };
    $(".coverVid").removeClass("readyFade");
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
    reelLink();

    setTimeout(function() {
          resizeNavMenu(window.innerHeight*0.9,0);
    }, 450);

    resizeCarousel();
    resizeCoverVid();

    if (!isMobile) {

        ///////////////
        // preload animations
        ///////////////
        var preloader = [];
        $.when.apply($, preloader).done(function() {
            // console.log("preloaded");    
            $(".animation").addClass("animationGo");
        });

        $(".animation").each(function(){ 
            var src = $(this).attr("data-anim");
            var frames = $(this).attr("data-frames");

            for (var i = 1; i <= frames; i++) {
                preloadAnimations("img/" + src + "/"+i+".jpg", preloader[i] = $.Deferred());
            }            
        });
        ///////////////
    };
});


$(".navArrow").hover(
  function() {
    $("span:nth-of-type(1)", this).addClass("hidden");
    $("span:nth-of-type(2)", this).removeClass("hidden");
  }, function() {
    $("span:nth-of-type(2)", this).addClass("hidden");
    $("span:nth-of-type(1)", this).removeClass("hidden");
  }
);


//Throttled on-resize handler
on_resize(function() {
    resizeClientLogos();
    projectTitle();
    resizeCarousel();
    setTimeout(function() {
          resizeNavMenu(window.innerHeight*0.9,0);
    }, 450);
    resizeCoverVid();
    reelLink();
})();


//Normal on-resize handler
$( window ).resize(function() {
});

$(window).scroll(function(e) {
    if ($("body").hasClass("isNotMobile")) {

        // if(lastScrolledLeft != $(document).scrollLeft()){
        //     xMousePos -= lastScrolledLeft;
        //     lastScrolledLeft = $(document).scrollLeft();
        //     xMousePos += lastScrolledLeft;
        // }
        // if(lastScrolledTop != $(document).scrollTop()){
        //     yMousePos -= lastScrolledTop;
        //     lastScrolledTop = $(document).scrollTop();
        //     yMousePos += lastScrolledTop;
        // }

        var scrollTop = $(window).scrollTop();
        
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
    if ($(".menuLines").hasClass("active")) {
        toggleFullScreenMenu();
    };
    $(".menuLines").removeClass("active");
});

$(document).keyup(function(e) {
    if (e.keyCode == 27) {
        if ($('body').hasClass('show-nav')) {
            $('body').removeClass('show-nav').addClass('hide-nav');
            $(".menuLines").removeClass("active");
            setTimeout(function() {
                $('body').removeClass('hide-nav');
            }, 500);
        } else if ($(".coverScreen").hasClass("showIt")) {
            $(".coverScreen").removeClass("showIt");
            reelControl("pause");
            reelControl("seekTo",0.0001);
        };
    } 
});

$(".project").click(function(e){
    var dest = $("a", this).attr("href");
    document.location.href = dest;
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

$(".mouseEffect").mousemove(function(e){
// $(document).mousemove(function(e){
    xMousePos = e.pageX;
    yMousePos = e.pageY;
    // console.log("x = " + xMousePos + " y = " + yMousePos);
    mouseAnimate($(".mouseEffect"),e.pageX,e.pageY);
});

$(".showReel").click(function(e){
    e.preventDefault();
    resizeCoverVid();
    $(".coverScreen").addClass("showIt");
    reelControl("play");
    reelControl("seekTo",0.0001);
});

$(".reelClose").click(function(e){
    e.preventDefault();
    $(".coverScreen").removeClass("showIt");
    reelControl("pause");
});


////////////////////////
// CUSTOM FUNCTIONS

function resizeClientLogos(){
    var logoWidth = $(".logoHolder").width() / $(".clientLogo").length;
    $(".clientLogo").css("width",Math.floor(logoWidth));
}


function preloadAnimations(url, promise) {
    var img = new Image();
    img.onload = function() {
      promise.resolve();
    };
    img.src = url;
    $("#preloadCache").append('<img src="' + img.src + '">')
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
        if (section.hasClass("animationGo") && !section.hasClass("mouseEffect")) {
            scrollAnimate(section,scrollPos,sectionBegin,sectionEnd,sectionLength,winHeight);
        } else if (section.hasClass("animationGo") && section.hasClass("mouseEffect")) {
            mouseAnimate(section,xMousePos,yMousePos);
        };
        section.css("background-position","center " + parallaxShift +"px");
    } else {
        section.removeAttr("style");
    };
}

function scrollAnimate(animationFrame,scrollPos,sectionBegin,sectionEnd,sectionLength,winHeight) {
    var scrollProportion = Math.abs(sectionBegin - scrollPos) / (sectionLength + winHeight);

    //console.log(scrollProportion);
    var directory = animationFrame.attr("data-anim");
    var frames = animationFrame.attr("data-frames");
    var value = scrollProportion * frames;
    if (Math.ceil(value) <= 0) {
        whichImg = 1;
    } else if (Math.ceil(value) > 0 && Math.ceil(value) <= frames){
        whichImg = Math.ceil(value);
    } else {
        whichImg = frames;
    }
    //console.log(whichImg);
    // console.log(animationFrame.attr("data-frames"));

    var currentImg =  animationFrame.css("background").split(directory + "/")[1].split(".jpg")[0];
    if (whichImg != currentImg) {
        //console.log(currentImg);
        /*
        var img = new Image();
        img.onload = function() {
            // console.log(img.src);
            animationFrame.css("background","url(img/" + directory + "/" + whichImg + ".jpg)");
            //animationFrame.css("background","url(" + img.src + ")");
        };
        img.onerror = function() {
            console.log("ERROR");
        };
        img.src = "img/" + directory + "/" + whichImg + ".jpg";
        */
        animationFrame.css("background","url(img/" + directory + "/" + whichImg + ".jpg)");
    };
    //animationFrame.css("background","url(img/" + directory + "/" + whichImg + ".jpg)");
}

function mouseAnimate(section,mX,mY){
    if (section.hasClass("mouseX") && section.hasClass("animationGo")) {
        var percentAcross = mX/window.innerWidth;
        //console.log(percentAcross);

        var directory = section.attr("data-anim");
        var frames = section.attr("data-frames");
        var value = percentAcross * frames;
        var whichImg;

        if (Math.ceil(value) <= 0) {
            whichImg = 1;
        } else if (Math.ceil(value) > 0 && Math.ceil(value) <= frames){
            whichImg = Math.ceil(value);
        } else {
            whichImg = frames;
        }
        //console.log(whichImg);
        // console.log(animationFrame.attr("data-frames"));

        var currentImg =  section.css("background").split(directory + "/")[1].split(".jpg")[0];
        if (whichImg != currentImg) {
            //console.log(currentImg);
            section.css("background","url(img/" + directory + "/" + whichImg + ".jpg)");
        };
        
    };
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

function resizeCarousel(){
    // console.log($(".carousel").width());
    var carWidth = $(".carousel").width();
    var carHeight = carWidth / 1.77777777777778;
    if ($(".carousel").hasClass("tallCarousel")) {
        $(".carousel").height(carWidth*0.75);
    } else {
        $(".carousel").height(carHeight);
    };
 };

 function projectTitle() {
    var pos = window.innerHeight/3;
    $(".bigTitle").css("padding-top",pos);
 }

 function gifBg(element){
    var coverGifSrc = element.attr("data-gif");
    if (coverGifSrc != undefined) {
        // console.log(coverSrc);
        var img = new Image();
        img.onload = function() {
          // console.log("loaded!");
          element.backstretch(coverGifSrc, {fade: 3000});
        };
        img.onerror = function() {
          //console.log("problem!");
        };
        img.src = coverGifSrc;
    }
};

function resizeNavMenu(windowHeight,steps){
    var nav = $("#body-nav ul");
    var navLink = $("#body-nav ul li a");
    
    if (nav.outerHeight() > windowHeight && steps < 10) {
        var adjust = navLink.outerHeight() * 0.9;
        navLink.height(adjust).css("line-height",adjust+"px");  
        setTimeout(function() {
              resizeNavMenu(windowHeight,steps++);
        }, 150);
    } else if(nav.outerHeight() < windowHeight*0.75 && steps < 10) {
        var adjust = navLink.outerHeight() * 1.1;
        navLink.height(adjust).css("line-height",adjust+"px");  
        setTimeout(function() {
              resizeNavMenu(windowHeight,steps++);
        }, 150);
    }
}

function resizeCoverVid(){
    coverVid = $(".coverVid");
    coverVid.removeAttr("style");
    var vidWidth = coverVid.width();
    var vidHeight = vidWidth / 1.777778;

    if (vidHeight > window.innerHeight * 0.85) {
        vidHeight = window.innerHeight * 0.85;
        vidWidth = vidHeight * 1.777778;
        coverVid.width(vidWidth);
        coverVid.height(vidHeight);
    };
    coverVid.height(vidHeight + "px");
}

function reelLink() {
    if (false) {
    // if ($(".playLink").length) {
        console.log("yes");
        var pos = $(".bigLogo").offset().top + $(".bigLogo").height() * 2; 
        $(".playLink").css("margin-top",pos + "px");
    };
    //margin-top: 50vh;
}

function reelControl(method,value) {
    var player = $('#reelFrame');
    var url = window.location.protocol + player.attr('src').split('?')[0];
    var data = {method: method};
        
    if (value) {
        data.value = value;
    }

    var message = JSON.stringify(data);
    player[0].contentWindow.postMessage(data, url);
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


/////////////////////////////////////
// Old/Unused/In-progress

/*
$('.checkVisible').appear();
if (typeof $('.checkVisible').appear == "function" && $('.checkVisible').is(':appeared') == false) {
    console.log("do stuff");
    $('.checkVisible').each(function(){
        $(this).addClass("faded");
    });
};

$(document.body).on('appear', '.checkVisible', function(e, $affected) {
    // this code is executed for each appeared element
    $(this).addClass("isVisible");
    $(this).removeClass("faded");
});
$(document.body).on('disappear', '.checkVisible', function(e, $affected) {
    // this code is executed for each disappeared element
    // $(this).addClass("isNotVisible");
});
*/

// if ($(".projNavArrow").length) {
//     $.get("work.html",function(workData) {
//         // my_var contains whatever that request returned
//     }, 'html');
// };


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