////////////////////////
// GLOBAL VARS

var topId = 0;

////////////////////////////////////////

////////////////////////
// SETUP ON READY

$(document).ready(function() {
  //
});

////////////////////////
// EVENTS

$( window ).load(function() {
  //
});


//Throttled on-resize handler
on_resize(function() {
  //
});

//Normal on-resize handler
$( window ).resize(function() {
  //
});

$('.card').click(function(){
  var el = $(this);
  if (el.hasClass('cardTop')) {
    switchPage(el);
  }
});

// $(window).scroll(function(e) {
// });


// $(document).keyup(function(e) {
//   switch (e.keyCode) {
//     case 27:
//       break;

//     default:
//       break;
//   }
// });

////////////////////////
// CUSTOM FUNCTIONS

function switchPage(card) {
  var id = card.attr('id').substring(4);
  topId = (parseInt(id)+1)%2
  var idNext = "#card" + topId;
  console.log(idNext);
  card.addClass("slideOut");
  $(idNext).addClass("slideUp");
  setTimeout(function() {
    $(idNext).removeClass('slideUp cardBottom').addClass('cardTop');
    fillCard(card,0)
  },1000)
}

function fillCard(card,contentIndex) {
  card.removeClass('slideOut cardTop').addClass('cardBottom');
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
