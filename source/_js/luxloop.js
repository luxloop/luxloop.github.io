
///////////////////////
// Globals
var parallaxDivs = [];

///////////////////////
// Events

$(document).ready(function() {
  initParallax();
  printContactInfo();
});

$(".menuToggle").click(function(){
  toggleMenu()
});

$(window).on('scroll', function() {
  window.requestAnimationFrame(updateParallax);
});

// TO-DO:
// $(window).on('resize', function() {
//   // Code to update parallax element values
// });


///////////////////////
// Custom Functions

function toggleMenu() {
  $('#cornerMenu').toggleClass('show');
};

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
    parallaxDiv.pageTop = parallaxDiv.element.offset().top;
    parallaxDiv.offset = parallaxDiv.element.attr("data-offset");

    parallaxDiv.isShown = function(windowPos, windowHeight) {
      if (windowPos + windowHeight > parallaxDiv.pageTop && windowPos < parallaxDiv.pageTop + parallaxDiv.height) {
        return true;
      }
      return false;
    }

    parallaxDiv.getOffset = function(windowPos, windowHeight) {
      var amount = (windowPos + windowHeight - parallaxDiv.pageTop)/(parallaxDiv.pageTop + parallaxDiv.height);
      return Math.floor(parallaxDiv.offset * amount);
    }

    parallaxDiv.setPos = function(newOffset) {
      // console.log(parallaxDiv.posTop + newOffset);
      parallaxDiv.element.css("top",parallaxDiv.posTop + newOffset);
    }

    parallaxDivs.push(parallaxDiv);
  });
}

function updateParallax() {
  var windowPos = $(window).scrollTop();
  var windowHeight = window.innerHeight;
  $.each(parallaxDivs, function(index, parallaxDiv) {
    if (parallaxDiv.isShown(windowPos,windowHeight)) {
      //console.log(parallaxDiv.getOffset(windowPos, windowHeight));
      parallaxDiv.setPos(parallaxDiv.getOffset(windowPos, windowHeight));
    }
  });
}
