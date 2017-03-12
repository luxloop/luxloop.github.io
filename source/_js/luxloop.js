
///////////////////////
// Globals
var parallaxDivs = [];
var scrollLimit;

///////////////////////
// Events

$(document).ready(function() {
  initParallax();
  printContactInfo();
  initVideos();
  scrollHandler();
});

$(".menuToggle").click(function(){
  toggleMenu()
});

$(window).on('scroll', function() {
  window.requestAnimationFrame(scrollHandler);
});

$('.expandButton').on('click',function(e) {
  e.preventDefault();
  $(this).addClass('expand');
});

$(".expandButton").bind('oanimationend animationend webkitAnimationEnd', function() {
   console.log("go to next page")
});

// TO-DO:
// $(window).on('resize', function() {
//   // Code to update parallax element values
// });
//

//Throttled on-resize handler
on_resize(function() {
  sizeCover();
  scrollLimit = Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
  //parallaxDivs = [];
  //initParallax();
  //updateParallax();
})();


///////////////////////
// Custom Functions

function toggleMenu() {
  $('#cornerMenu').toggleClass('show');
};

function toggleMenuVisible(windowPos,windowHeight) {
  var menu = $('#cornerMenu');
  if (menu.hasClass('transitioning') === false && menu.hasClass('noHide') === false) {
    var showThresh = windowHeight * .5;
    if (windowPos > showThresh && menu.css('display') === 'none') {
      menu.removeClass('show').addClass('transitioning').fadeIn(function(){menu.removeClass('transitioning')});
    } else if (windowPos <= showThresh && menu.css('display') !== 'none') {
      menu.removeClass('show').addClass('transitioning').fadeOut(function(){menu.removeClass('transitioning')});
    }
  }
}

function printContactInfo() {
  $(".hiddenEmail").html(rot13rot5Encode('<n uers="znvygb:uryyb@yhkybbc.pbz">uryyb@yhkybbc.pbz</n>'));
  $(".hiddenPhoneLA").html(rot13rot5Encode('<n uers="gry:+68657111092" pynff="yvaxNavz">865.711.1092 (YN)</n>'));
  $(".hiddenPhoneNY").html(rot13rot5Encode('<n uers="gry:+61919393851" pynff="yvaxNavz">191.939.3851 (AL)</n>'));
}

function initParallax() {
  $('.parallax').each(function(index) {
    var parallaxDiv = {};

    parallaxDiv.element = $(this);
    parallaxDiv.height = parallaxDiv.element.height();
    parallaxDiv.posTop = parseInt(parallaxDiv.element.css("top"));

    if (parallaxDiv.element.attr("data-offset")==="max") {
      parallaxDiv.offset = -1 * Math.floor(scrollLimit - parallaxDiv.height + window.innerHeight);
    } else {
      parallaxDiv.offset = parallaxDiv.element.attr("data-offset");
    }

    parallaxDiv.start = parallaxDiv.element.offset().top + parallaxDiv.posTop;

    if (parallaxDiv.element.hasClass('cropped')) {
      parallaxDiv.end = parallaxDiv.start + parallaxDiv.element.parent().innerHeight();
    } else {
      parallaxDiv.end = parallaxDiv.start + parallaxDiv.height;
    }

    parallaxDiv.isShown = function(windowPos, windowHeight) {
      if (windowPos + windowHeight > parallaxDiv.start && windowPos < parallaxDiv.end) {
        return true;
      }
      return false;
    }

    parallaxDiv.getOffset = function(windowPos, windowHeight) {
      var amount = (windowPos + windowHeight - parallaxDiv.start)/parallaxDiv.end;
      return Math.floor(parallaxDiv.offset * amount);
    }

    parallaxDiv.setPos = function(newOffset) {
      parallaxDiv.element.css("top",parallaxDiv.posTop + newOffset);
    }

    //console.log(parallaxDiv);

    parallaxDivs.push(parallaxDiv);
  });
}

function scrollHandler() {
  var windowPos = $(window).scrollTop();
  var windowHeight = window.innerHeight;

  //toggleMenuVisible(windowPos,windowHeight);
  updateParallax(windowPos,windowHeight);
}

function updateParallax(windowPos,windowHeight) {
  $.each(parallaxDivs, function(index, parallaxDiv) {
    if (parallaxDiv.isShown(windowPos,windowHeight)) {
      parallaxDiv.setPos(parallaxDiv.getOffset(windowPos, windowHeight));
    }
  });
}

function initVideos() {

  $(".fitVid").fitVids();

  $('.bgVid').each(function() {
    var video = $(this);
    var vidElement = video.get(0);
    var vidFile = $(this).attr('data-file');
    vidElement.src = vidFile;
    vidElement.addEventListener('canplaythrough', function() {
      vidElement.play();
      video.removeClass('fadeOut');
      //vidElement.currentTime = video1Pos;
      //video1Dur = vidElement.duration;
    }, false);
    vidElement.addEventListener('error', function() {
      console.log(vidElement.error);
      video.removeClass('fadeOut');
    }, false);
    vidElement.load();
  });
}

function sizeCover() {
  var coverImage = $('#pageCover .coverImage')
  var media = $('#pageCover .coverImage video').length > 0 ? $('#pageCover .coverImage video') : $('#pageCover .coverImage img');

  if (media.innerWidth() < coverImage.innerWidth()) {
    media.css({'width':'100%','height':'auto'});
  } else {
    media.attr('style','');
  }
}


