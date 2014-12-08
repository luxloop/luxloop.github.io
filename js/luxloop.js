var blogImgRatio = 0.5;
var isMobile = false;
var isScrolling = false;

$(document).ready(function() {
    var uA = navigator.userAgent;
    
    if (jQuery.browser.mobile == true) {
        isMobile = true;
    };

    var isIphone = false;
    if (uA.indexOf("iPhone") > 0 || uA.indexOf("iphone") > 0) {
        isIphone = true;   
        $("html").addClass("isIphone");     
    }

    $(".getRidOf").click(function(){
        $(this).fadeOut();
    });

    var eventContent = $(".events").html()
    $("#eventFloater").prepend(eventContent);

    $("#staticBg").backstretch("img/017.jpg");

    /*
    $('#fullpage').fullpage({resize:false,css3:false,loopBottom:false,easing:'swing',normalScrollElements:null,touchSensitivity:15,
        onLeave: function(index, nextIndex, direction){
            if(index == 1 && direction =='down'){
                $("#menuBarBot").fadeOut();
                $("#menuBarTop").fadeIn(1200);
            } else if(nextIndex == 1){
                $("#menuBarTop").fadeOut();
                $("#menuBarBot").fadeIn(1200);
            }
        },
        afterLoad: function(anchorLink, index){
            //datesModal();
            if(index == 1){
                $("#menuBarTop").fadeOut();
                $("#menuBarBot").fadeIn(1200);
            } else {
                $("#menuBarBot").fadeOut();
                $("#menuBarTop").fadeIn(1200);
            }
        },
        afterResize: function(){
            //datesModal();
        }
    });
    */
    
    // datesModal();


    var moving = false;
    //var blogSlide = 1;
	

	/////////////////////////////////////////////////////
    // Render Blog Posts
    if (typeof tumblr_api_read !== undefined || typeof tumblr_api_read !== 'undefined') {
        var blogData = "";
        var postCount = 0;
        var maxPosts = 3;

        if (uA.indexOf("iPhone") > 0 || uA.indexOf("iphone") > 0 || uA.indexOf("iPad") > 0 || uA.indexOf("ipad") > 0) {
            maxPosts = 3;
        } else if (isMobile == true) {
            maxPosts = 3;
        };

        for (var i = 0; i < tumblr_api_read.posts.length; i++) {

            if (postCount < maxPosts) {
                var kind = tumblr_api_read.posts[i]["type"];

                if (kind == "photo" || kind == "video" || kind == "regular") {
                    var formatDate = blogDate(tumblr_api_read.posts[i]["date"]);

                    var post = '<span class="blogDate"><a href="' + tumblr_api_read.posts[i]["url"] + '"target="_blank">' + formatDate + '</a></span><div class="divider"></div>';
                    
                    // if Has Title //
                    if (tumblr_api_read.posts[i]["regular-title"] !== undefined) {
                        post = post + '<span class="postTitle"><p>' + tumblr_api_read.posts[i]["regular-title"] + '</p></span>';
                    }
                    

                    // Photo Post //
                    if (kind == "photo") {
                        post = post + '<div class="blogImg" data-tall="0" data-width="' + tumblr_api_read.posts[i]["width"] + '" data-height="' + tumblr_api_read.posts[i]["height"] + '" ><img src="' + tumblr_api_read.posts[i]["photo-url-1280"] + '" /></div>';
                        post = post + tumblr_api_read.posts[i]["photo-caption"];
                    }
                    ////////////////

                    // Video Post //
                    if (kind == "video") {
                        post = post + '<div class="blogVid">' + tumblr_api_read.posts[i]["video-player-500"] + '</div>';
                        post = post + tumblr_api_read.posts[i]["video-caption"];
                    }
                    ////////////////

                    // Text Post //
                    if (kind == "regular") {
                        //post = post + "<p><br /> &nbsp;</p>"
                        post = post + tumblr_api_read.posts[i]["regular-body"];
                    }
                    ////////////////

                    //post = post + '<p>';
                    if (tumblr_api_read.posts[i]["tags"] !== undefined) {
                    	post = post + '<div class="visuallyhidden"><p><br />';
                        for (var j = 0; j < tumblr_api_read.posts[i]["tags"].length; j++) {
                            post = post + '<a href="http://luxloop.tumblr.com/tagged/' + tumblr_api_read.posts[i]["tags"][j] + '" target="_blank" class="hash">#' + tumblr_api_read.posts[i]["tags"][j] + '</a>';
                        };
                        post = post + '</div></p>';
                    }


                    post = post + '<p><br />&nbsp;</p>';
                    post = post + '<p><br />&nbsp;</p>';

                    post = post + '<div class="permalink"><a href="' + tumblr_api_read.posts[i]["url"] + '"target="_blank">See Full Post on Tumblr</a></div>'

                    //post = post + '<p><br />&nbsp;</p>';

                    //blogData = blogData + post;
                    postCount++;
                    //$("#blogContent .slide:nth-child("+postCount+")").prepend(post);
                    $("#blogContent .blogEntry:nth-child("+postCount+")").prepend(post);
                };
            };              
        };

        // Create the blog posts
        if (postCount >= 1) {

            //$.fn.fullpage.reBuild();

            $(".blogVid").each(function() {
                $(this).fitVids();
            });	

            $(".blogImg").each(function() {
                var w = $(this).width();
                var h = w * blogImgRatio;
                $(this).css("height",h+"px");
            });
        };
        
    } else {
        console.log("TUMBLR IS UNDEFINED");
        $("#entry1, #entry2, #entry3, #arrowR, @#arrowL").addClass("hidden");
        $("#entry4").css({
          "left": "15%",
          "width": "90%"
        });
    }

    blogImageSizer();
    


    $("#arrowR").click(function(){
        if (moving == false) {
            moving = true;
            var win2 = window.innerWidth;
            $("#entry1, #entry2, #entry3, #entry4").animate({left:"-=100%"},750,function(){
                var be4 = parseInt($("#entry4").css("left"),10);
                //alert (be4);
                $("#arrowL").css("visibility","visible");
                if (be4 < win2) {
                    $("#arrowR").css("visibility","hidden");
                    $("#arrowL").css("visibility","visible");
                };
            });
            moving = false;
        };
    });

    $("#arrowL").click(function(){
        if (moving == false) {
            moving = true;
            //var win = window.innerWidth;
            $("#entry1, #entry2, #entry3, #entry4").animate({left:"+=100%"},750,function(){
                var be1 = parseInt($("#entry1").css("left"),10);
                //alert (be4);
                $("#arrowR").css("visibility","visible");
                if (be1 > 0) {
                    $("#arrowL").css("visibility","hidden");
                    $("#arrowR").css("visibility","visible");
                };
            });
            moving = false;
        };
    });

    $(".botNavLink").click(function(){
        var dest = $(this).attr("data-dest");
        //$.fn.fullpage.moveTo(dest);
    });

    $(".topNavLink").click(function(){
        var dest = $(this).attr("data-dest");
        //$.fn.fullpage.moveTo(dest);
    });

    $("#topLogo").click(function(){
        //$.fn.fullpage.moveTo(1);
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

    resizeThumbs();


});

$( window ).load(function() {
    if (jQuery.browser.mobile == true) {
        isMobile = true;
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