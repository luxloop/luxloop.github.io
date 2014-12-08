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

$("#closeIt").click(function() {
    $("#mailChimpFloater").fadeOut();
});

$("#mobileChimpShower").click(function() {
    $("#mailChimpFloater").fadeIn();
});


$("#mobileDateShower").click(function() {
    $("#eventFloater").fadeIn();
});

$("#closeIt2").click(function() {
    $("#eventFloater").fadeOut();
});

on_resize(function() {
	blogImageSizer();
    resizeThumbs();

    $("#entry1, #entry2, #entry3, #entry4").css('left', '');
    $("#arrowL").css("visibility","hidden");
    $("#arrowR").css("visibility","visible");

    // datesModal();

})();

/*
$('#logoSection').on({
    'mousewheel': function(e) {
        if (!Modernizr.touch && !jQuery.browser.mobile) {
            var scrollZone = $( window ).height()*0.95;
            if ($(window).scrollTop() < scrollZone) {
                // console.log(isScrolling);

                if (!isScrolling) {
                    
                    if (event.deltaY > 0) {
                        isScrolling = true;
                        slideDown();
                    };
                    
                };
                if (event.deltaY > 0) {
                    e.preventDefault();
                    e.stopPropagation();
                } else {
                    isScrolling = false;
                };
            }
        }    
    }
});


$(window).on({
    'mousewheel': function(e) {
        if (!Modernizr.touch && !jQuery.browser.mobile && isScrolling) {
            e.preventDefault();
            e.stopPropagation();
        }    
    }
});
//*/

////////////////////////
// CUSTOM FUNCTIONS

function slideDown() {
    //alert("woo");
    console.log("bang");
    var scrollTarget = $( window ).height();
    var topBar = $("#menuBarTop").height();
    scrollTarget -= (topBar *1.5);
    $("body").animate({
        scrollTop: scrollTarget
    }, 500, function() {
        isScrolling = false;
        console.log("finished");
    });
    return false;
    /*
    
    if (!Modernizr.touch && !jQuery.browser.mobile) {
        if ($(window).scrollTop() < scrollTarget && event.deltaY > 0 && isScrolling == false) {
            isScrolling = true;
            
            $("html, body").animate({
                scrollTop: scrollTarget
            }, 700, function() {
                isScrolling = false;
            });
            //console.log("going down " + $(window).scrollTop() + " " + event.deltaY + event.deltaFactor);
            return false;
        }
        /
        if ($(window).scrollTop() < scrollTarget && event.deltaY < 0 && isScrolling == false) {
            e.preventDefault();
            e.stopPropagation();
            isScrolling = true;
            $("html, body").animate({
                scrollTop: 0
            }, 700, function() {
                isScrolling = false;
            });
            console.log("going up " + $(window).scrollTop() + " " + event.deltaY);
            return false;
        };
        //*/
}

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


// debulked onresize handler
function on_resize(c,t){onresize=function(){clearTimeout(t);t=setTimeout(c,250)};return c};

function blogDate(dString) {
    var month = "";
    var numDay =""; 
    if (dString.charAt(5) == 0) {
        numDay = String(dString.charAt(6))
    } else {
        numDay = String(dString.charAt(5)) + String(dString.charAt(6))
    };
    var year = dString.charAt(12) + dString.charAt(13) + dString.charAt(14) + dString.charAt(15);
    var mon = dString.charAt(8) + dString.charAt(9) + dString.charAt(10);
    switch(mon) {
        case "Jan":
            month = "January";
            break;
        case "Feb":
            month = "February";
            break
        case "Mar":
            month = "March";
            break
        case "Apr":
            month = "April";
            break
        case "May":
            month = "May";
            break
        case "Jun":
            month = "June";
            break
        case "Jul":
            month = "July";
            break
        case "Aug":
            month = "August";
            break
        case "Sep":
            month = "September";
            break
        case "Oct":
            month = "October";
            break
        case "Nov":
            month = "November";
            break
        case "Dec":
            month = "December";
            break
        default:
            month = mon;
    }
    var outDate = month + " " + numDay + ", " + year;
    return outDate;
};

function blogImageSizer(){
    $(".blogImg").each(function() {
        var w = $(this).attr("data-width");
        var h = $(this).attr("data-height");
        var r = h/w;
        if (r > blogImgRatio) {
            var off = -1 * ((r - blogImgRatio) * ($(this).width()*r))/3;
            $(this).attr("data-tall","1");
            var h = $(this).width() * blogImgRatio;
            $(this).css("height",h+"px");
            $(this).children().css("margin-top",off+"px");
        };
    }); 
}

function datesModal(){
    var eventsBottom = ($(".events").position().top + $(".events").outerHeight(true));
    var infoHeight = $("#infoBox").innerHeight();
    if (eventsBottom > infoHeight) {
        $("html").addClass("eventLink");
    } else {
        $("html").removeClass("eventLink");
    };
};

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

////////////////////////
// UTILITIES

/*
$(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
        $(".scrollup").fadeIn()
    } else {
        $(".scrollup").fadeOut()
    }
});
$(".scrollup").click(function() {
    $("html, body").animate({
        scrollTop: 0
    }, 900);
    return false
});

$("#contactLink").click(function() {
    event.preventDefault();
    var dest = $("#section").offset().top;
    $("html, body").animate({
      scrollTop: dest
    }, 900);
    return false
});
*/