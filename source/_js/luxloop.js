(function () {
  ///////////////////////
  // Globals
  var parallaxDivs = [];
  var fallbackTimer;

  ///////////////////////
  // Events

  $(document).ready(function() {
    $(window).scrollIntent();
    $('body').addClass('showBody')
    processSVG();
    initParallax();
    initCover();
    sizeCover();
    createCaptions();
    printContactInfo();
    initVideos();
    scrollHandler();
  });

  $(".menuToggle").on('click',function(e) {
    toggleMenu()
  });

  $(window).on('scroll', function() {
    window.requestAnimationFrame(scrollHandler);
  });

  $('.expandButton').on('click',function(e) {
    e.preventDefault();
    var dest = e.target.getAttribute("href");
    fallbackTimer = setTimeout(function(){
      goTo(dest);
    }, 3000);
    $(this).addClass('expand');
  });

  $('#mcButton').on('click',function(e) {
    e.preventDefault();
    emailForm();
  });

  $("#mcEmail").on('keyup', function (e) {
    e.preventDefault();
    if (e.keyCode == 13) {
      emailForm()
    }
  });

  $(".expandButton").bind('oanimationend animationend webkitAnimationEnd', function(e) {
    var dest = e.target.getAttribute("href")
    if (dest) {
      clearTimeout(fallbackTimer);
      fadeTo(dest)
    }
  });

  $('.fadeLink').on('click', function(e) {
    e.preventDefault();
    var dest = e.target.getAttribute("href") || e.target.getAttribute("data-dest") || $(this).closest("a:has(*[data-dest])").children('[data-dest]').first().attr('data-dest');
    if (dest !== null && dest !== undefined) {
      fadeTo(dest);
    }
  });

  // $('.fadeLink').on('click', .'replaced-svg', function() {

  // });

  // TO-DO:
  // $(window).on('resize', function() {
  //   // Code to update parallax element values
  // });
  //

  $(window).resize(function(){
    sizeCover();
  })

  //Throttled on-resize handler
  // on_resize(function() {
  //   //sizeCover();
  //   //parallaxDivs = [];
  //   //initParallax();
  //   //updateParallax();
  // })();



  // Thank you: https://stackoverflow.com/questions/11979156/mobile-safari-back-button
  window.onpageshow = function(event) {
    if (event.persisted) {
      window.location.reload()
    }
  };

  // This hasn't worked since iOS 5:
  // window.onunload = function(){};


  ///////////////////////
  // Custom Functions

  function toggleMenu() {
    $('#cornerMenu').toggleClass('show');
  };

  function scrollShowHideThreshold(windowPos,windowHeight) {
    // var menu = $('#cornerMenu');
    // var transitioning = menu.hasClass('transitioning');
    // var noHide = menu.hasClass('noHide');
    // var threshold = menu.hasClass('threshold');

    // if (!transitioning && !noHide) {
    //   var display = menu.css('display');
    //   var showThresh = windowHeight * .5;
    //   var mode = 1; // Temporary

    //   if (display === 'none') {
    //     if ((threshold && windowPos > showThresh) || (!threshold && scrollDir === -1))  {
    //       menu.removeClass('show').addClass('transitioning').fadeIn(function(){menu.removeClass('transitioning')});
    //     }
    //   } else {
    //     if ((threshold && windowPos <= showThresh) || (!threshold && scrollDir === 1))  {
    //       menu.removeClass('show').addClass('transitioning').fadeOut(function(){menu.removeClass('transitioning')});
    //     }
    //   }
    // }
  }

  function printContactInfo() {
    $(".hiddenEmail").html(rot13rot5Encode('<n uers="znvygb:uryyb@yhkybbc.pbz" pynff="yvaxNavz">uryyb@yhkybbc.pbz</n>'));
    $(".hiddenEmail2").html(rot13rot5Encode('<n uers="znvygb:wbof@yhkybbc.pbz" pynff="yvaxNavz">wbof@yhkybbc.pbz</n>'));
    $(".hiddenPhoneLA").html(rot13rot5Encode('<n uers="gry:+68657111092" pynff="yvaxNavz">865.711.1092</n>'));
    $(".hiddenPhoneNY").html(rot13rot5Encode('<n uers="gry:+61919393851" pynff="yvaxNavz">191.939.3851</n>'));
  }

  function initParallax() {
    $('.parallax').each(function(index) {
      var parallaxDiv = {};

      parallaxDiv.element = $(this);
      parallaxDiv.height = parallaxDiv.element.height();
      parallaxDiv.posTop = parseInt(parallaxDiv.element.css("top"));
      parallaxDiv.offset = parallaxDiv.element.attr("data-offset");
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

    if (windowPos === 0) {
      $('body').addClass('top')
    } else {
      $('body').removeClass('top')
    }

    //scrollShowHideThreshold(windowPos,windowHeight);
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
      var imgDest = $(this).attr('poster');
      var parent = video.parent();
      if ($('html').hasClass('touch')) {
        video.remove();
        //parent.append('<img id="theImg" src="' + imgDest + '" />')
        parent.css("background-image","url('" + imgDest + "')");
        console.log("foo")
      } else {
        vidElement.src = vidFile;
        vidElement.addEventListener('canplaythrough', function() {
          vidElement.play();
          video.removeClass('fadeOut');
          //vidElement.currentTime = video1Pos;
          //video1Dur = vidElement.duration;
        }, false);
        vidElement.addEventListener('error', function() {
          console.log(vidElement.error);
          //video.removeClass('fadeOut');
          video.remove();
          parent.css("background-image","url('" + imgDest + "')");
        }, false);
        vidElement.load();
      }
    });
  }

  function sizeCover(selector) {
    var container = $('#pageCover .coverImage');
    //var media = $('#pageCover .coverImage video').length > 0 ? $('#pageCover .coverImage video').first() : $('#pageCover .coverImage img').first();
    var media = selector || $('#pageCover .coverImage video, #pageCover .coverImage img')
    var cRatio = container.innerWidth()/container.innerHeight();

    media.each(function(){
      var el = $(this);
      var mRatio = el.innerWidth()/el.innerHeight();

      if (cRatio > mRatio) {
        el.addClass('stretchWide');
      } else {
        el.removeClass('stretchWide');
      }
    })
  }

  function initCover() {
    //var container = $('#pageCover .coverImage');
    var image = $('#pageCover .coverImage img');
    if (image.length) {
      var dest = image.attr('src');
      image.parent().css("background-image","url('" + dest + "')");
      image.remove();
    }
  }

  function goTo(dest) {
    window.location.href = dest;

  }

  function fadeTo(dest) {
    $('body').removeClass('showBody')
    setTimeout(function(){goTo(dest)},900);
  }

  function emailForm() {
    var input=$('#mcEmail').val();
    var dest = "https://lux-loop.us9.list-manage.com/subscribe?u=932da86c44803a133780827a6&id=85c35a3d5a&MERGE0="+encodeURIComponent(input)
    window.open(dest)
  }

  function processSVG() {
    $('img.svg').each(function(){
      var $img = jQuery(this);
      var imgID = $img.attr('id');
      var imgClass = $img.attr('class');
      var dest = $img.attr('data-dest');
      var imgURL = $img.attr('src');

      $.get(imgURL, function(data) {
          // Get the SVG tag, ignore the rest
          var $svg = jQuery(data).find('svg');

          // Add replaced image's ID to the new SVG
          if(typeof imgID !== 'undefined') {
              $svg = $svg.attr('id', imgID);
          }
          // Add replaced image's classes to the new SVG
          if(typeof imgClass !== 'undefined') {
              $svg = $svg.attr('class', imgClass+' replaced-svg');
          }

          // Add replaced image's destination to the new SVG
          if(typeof dest !== 'undefined') {
              $svg = $svg.attr('data-dest', dest);
          }

          // Remove any invalid XML tags as per http://validator.w3.org
          $svg = $svg.removeAttr('xmlns:a');

          // Replace image with new SVG
          $img.replaceWith($svg);

      }, 'xml');
    });
  }

  function createCaptions() {
    $('img.caption').each(function() {
      var el = $(this);
      var elSource = el.attr('src');
      var classes = el.attr('class');
      var caption = el.attr('data-caption');
      el.replaceWith('<div class="imageWithCaption"><img src="' + elSource + '"><div class="captionElement ' + classes + '">' + caption + '</div></div>');
    });
  }


})();
