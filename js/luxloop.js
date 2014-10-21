var blogImgRatio = 0.5;

$(document).ready(function() {

    $('#fullpage').fullpage({resize:false,css3:false,loopBottom:false,normalScrollElements:'.blogEntry',
        onLeave: function(index, nextIndex, direction){
            //after leaving section 2
            if(index == 1 && direction =='down'){
                $("#menuBarBot").fadeOut();
                $("#menuBarTop").fadeIn(1200);
            }

            // else if(index == 2 && direction == 'up'){
            //     $("#menuBarTop").fadeOut();
            //     $("#menuBarBot").fadeIn(1200);
            // }

            else if(nextIndex == 1){
                $("#menuBarTop").fadeOut();
                $("#menuBarBot").fadeIn(1200);
            }


        }

    });

    
	var uA = navigator.userAgent;
	var isMobile = false;
	if (jQuery.browser.mobile == true) {
	    isMobile = true;
	};

    var moving = false;


	$("#titleBar").fitText(1.0, { minFontSize: '30px', maxFontSize: '100px' });
	$("#shadowBarR").fitText(1.0, { minFontSize: '30px', maxFontSize: '100px' });
	$("#shadowBarG").fitText(1.0, { minFontSize: '30px', maxFontSize: '100px' });
	$("#shadowBarB").fitText(1.0, { minFontSize: '30px', maxFontSize: '100px' });

	$("#titleHider").removeClass("invisible");

	$("#staticBg").backstretch("img/017.jpg");

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


	/////////////////////////////////////////////////////
    // Render Blog Posts
    if (typeof tumblr_api_read !== 'undefined') {
        var blogData = "";
        var postCount = 0;
        var maxPosts = 3;

        if (uA.indexOf("iPhone") > 0 || uA.indexOf("iphone") > 0 || uA.indexOf("iPad") > 0 || uA.indexOf("ipad") > 0) {
            maxPosts = 2;
        } else if (isMobile == true) {
            maxPosts = 1;
        };

        for (var i = 0; i < tumblr_api_read.posts.length; i++) {

            if (postCount < maxPosts) {
                var kind = tumblr_api_read.posts[i]["type"];

                if (kind == "photo" || kind == "video" || kind == "regular") {
                    var formatDate = blogDate(tumblr_api_read.posts[i]["date"]);

                    var post = '<span class="blogDate"><a href="' + tumblr_api_read.posts[i]["url"] + '"target="_blank">' + formatDate + '</a></span><div class="divider"></div>';
                    
                    // if Has Title //
                    if (tumblr_api_read.posts[i]["regular-title"] !== undefined) {
                        post = post + '<span class="postTitle"><p>This is a post Title YEAAAAAHHH</p></span>';
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
                        post = post + "<p><br /> &nbsp;</p>"
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

                    post = post + '<div class="permalink"><a href="' + tumblr_api_read.posts[i]["url"] + '"target="_blank">See Post on Tumblr</a></div>'

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
            /*
            //blogData = blogData + '<div class="blogEntry"><div class="divider"></div><p><br />&nbsp;</p>'
            // blogData = blogData + '<span class="blogFoot">See more updates on our <a href="http://axionexperience.tumblr.com/"target="_blank">tumblr</a></span>';
            blogData = blogData + '<div class="blogEntry"><p><br />See more updates on our <a href="http://axionexperience.tumblr.com/"target="_blank">tumblr</a><br />&nbsp;</p></div>';
            */
            //$("#blogContent").prepend(blogData);

            $.fn.fullpage.reBuild();

            $(".blogVid").each(function() {
                $(this).fitVids();
            });	

            $(".blogImg").each(function() {
                var w = $(this).width();
                var h = w * 0.6;
                $(this).css("height",h+"px");
            });
        };
        
    } else {
        console.log("TUMBLR IS UNDEFINED");
        $("#mediaInfo").css({
          "width": "80%",
          "height": "auto",
          "padding": "3% 10% 10% 3%"
        });
    }

    // var lh = $("#menuBar").height();
    // $("#topLinks").css("lineHeight",lh+"px");
    // $("#topEmail").css("lineHeight",lh+"px");


    $(".blogImg").each(function() {
    	var w = $(this).attr("data-width");
    	var h = $(this).attr("data-height");
    	var r = h/w;
    	if (r > blogImgRatio) {
    		var off = -1 * ((r - 0.6) * h)/2;
    		$(this).attr("data-tall","1");
    		var h = $(this).width() * blogImgRatio;
    		$(this).css("height",h+"px");
    		$(this).children().css("margin-top",off+"px");
    	};
    });	


    $("#arrowR").click(function(){
        if (moving == false) {
            moving = true;
            $("#entry1, #entry2, #entry3, #entry4").animate({left:"-=100%"},750,function(){
                $("#arrowR").css("visibility","hidden");
                $("#arrowL").css("visibility","visible");
                moving = false;
            });
        };
        
    });

    $("#arrowL").click(function(){
        if (moving == false) {
            moving = true;
            $("#entry1, #entry2, #entry3, #entry4").animate({left:"+=100%"},750,function(){
                $("#arrowL").css("visibility","hidden");
                $("#arrowR").css("visibility","visible");
                moving = false;
            });
        };
    });

    $(".botNavLink").click(function(){
        var dest = $(this).attr("data-dest");
        $.fn.fullpage.moveTo(dest);
    });

    $(".topNavLink").click(function(){
        var dest = $(this).attr("data-dest");
        $.fn.fullpage.moveTo(dest);
    });

    $("#topLogo").click(function(){
        $.fn.fullpage.moveTo(1);
    });

    $(".blogEntry").scroll(function() {
        //var pos = $(this).scrollTop() + $(this).innerHeight();
        //console.log(pos + "/" + $(this)[0].scrollHeight);
        if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight + 1) {
            //console.log("bottom");
            $.fn.fullpage.moveTo(4);
        } else if($(this).scrollTop() == 0) {
            //console.log("top");
            $.fn.fullpage.moveTo(2);
        }
    });

    $("#infoBox").scroll(function() {
        //var pos = $(this).scrollTop() + $(this).innerHeight();
        //console.log(pos + "/" + $(this)[0].scrollHeight);
        if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight + 1) {
            //console.log("bottom");
            $.fn.fullpage.moveTo(3);
        } else if($(this).scrollTop() == 0) {
            //console.log("top");
            $.fn.fullpage.moveTo(1);
        }
    });

});

on_resize(function() {
	$(".blogImg").each(function() {
    	var w = $(this).attr("data-width");
    	var h = $(this).attr("data-height");
    	var r = h/w;
    	if (r > blogImgRatio) {
    		var off = -1 * ((r - 0.6) * h)/2;
    		var h = $(this).width() * blogImgRatio;
    		$(this).css("height",h+"px");
    		$(this).children().css("margin-top",off+"px");
    		//console.log("resized");
    	};
    });	

    // var lh = $("#menuBar").height();
    // $("#topLinks").css("lineHeight",lh+"px");
    // $("#topEmail").css("lineHeight",lh+"px");

})();


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

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);


