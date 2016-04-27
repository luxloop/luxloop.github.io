////////////////////////
// GLOBAL VARS

var topId = 0;
var pageIndex = 0;
var deBounceLux = false;
var deBounceProj = false;
var intervalID = null;
var intervalLength = 8000;

var projectData = [
  {title:"Pigments",
  blurb:"a music video responded to your touch?",
  bgImage:"projects/pigments/pigments.gif",
  mobileBg:"projects/pigments/bg.jpg",
  description:"Luxloop developed an interactive music video for LA-based artist Elohim that asks users actively keep it alive by tapping a heartbeat on their mobile device. Their interactions change the pigments within the piece.",
  target:"icantmakeuloveu.com"},

  {title:"If the Walls Had Eyes",
  blurb:"your walls became a bit more human?",
  bgImage:"projects/eyes/1.jpg",
  description:"Part inspired by an attention-starved roommate, and part by a dream, If The Walls Had Eyes is a projection installation that watches and follows the viewer as they pass by.",
  target:null},

  {title:"Overheard",
  blurb:"you could eavesdrop on fictional characters in a museum?",
  bgImage:"projects/overheard/360_2.JPG",
  description:"Coming this June, Overheard is an immersive, site-specific audio narrative woven into the Minneapolis Institute of Art. Using a custom mobile app, visitors will be able to eavesdrop on the conversations of a group of fictional characters and follow their stories through the museum.",
  target:'overheard.luxloop.com'},

  {title:"Social Sound",
  blurb:"you could hear the sound of Twitter?",
  mobileBg:"projects/socialsound/1.jpg",
  bgImage:"projects/socialsound/ss1.gif",
  description:"Social Sound is a performance tool designed to aggregate the flow of real time social activity into a rush of sound in the real world, providing a unique portrait of the social sphere at a given moment in time.",
  target:'socialsound.luxloop.com'},

  {title:"Amplified Self",
  blurb:"you could see yourself in sound?",
  bgImage:"projects/amplifiedself/gifSmall2.gif",
  mobileBg:"projects/amplifiedself/thumb.jpg",
  description:"An interactive video mirror in which viewers can only see their own reflection by yelling or making noise - the louder the noise, the clearer the image.",
  target:null},

  {title:"Axion",
  blurb:"a documentary edited itself to your thoughts?",
  bgImage:"projects/axion/altthumb.jpg",
  description:"A meditative exploration of the scientific method and human nature, Axion changes itself based on the level of focus and relaxation detected in a user's EEG brain data. By allowing a player the freedom to navigate and discover an evolving virtual environment, the project suggests a connection between the process of scientific discovery and the personal drive for curious exploration.",
  target:'axion.is'}
]

/*
{title:"Gypsy Sport Spring/Summer 2016",
  blurb:"Lorem ipsum Anim aliqua ea incididunt ea?",
  bgImage:"projects/gypsysport/cover.jpg",
  description:"Luxloop collaborated with Gypsy Sport and Greg Luna to create an interactive piece to showcase their Spring/Summer 2016 collection",
  target:'gypsysport.tv'}
 */

////////////////////////////////////////

////////////////////////
// SETUP ON READY

$(document).ready(function() {
  createCards();
  fillCard($(".cardTop"),0,true);
  fillCard($(".cardBottom"),1);

  setPageInterval();

});

////////////////////////
// EVENTS

$( window ).load(function() {
  var noRobots = '<c><n uers="znvygb:uryyb@yhkybbc.pbz" pynff="haqreyvar">uryyb@yhkybbc.pbz</n><oe />191.939.3851 (AL)<oe />865.711.1092 (YN)</c>';
  $(".encodedContactInfo").html(rot13rot5Encode(noRobots))
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
  if (el.hasClass('cardBottom')) {
    clearPageInterval();
    switchPage();
    setPageInterval();
  }
});

$('a.coolHeading').hover(
  function() {
    if ($(this).parents('.cardTop').length) {
      clearPageInterval();
    }
  }, function() {
    if ($(this).parents('.cardTop').length) {
      if (deBounceProj) {
        deBounceProj = false;
      } else {
        setPageInterval();
      }
    }
  }
).click(function(e){
  e.preventDefault();
  if ($(this).parents('.cardTop').length) {
    deBounceProj = true;
    clearPageInterval();
    $('.cardTop').addClass('showProjInfo');
  }
});

$(document).on('click', '.closeBox', function(e) {
  e.preventDefault();
  // if ($(this).parents('.showProjInfo').length) {
  //   setPageInterval();
  //   $('.cardTop').removeClass('showProjInfo');
  // } else if ($(this).parents('.showInfo').length) {
  //   setPageInterval();
  //   switchPage();
  // }
  setPageInterval();
  switchPage();
});

$(".luxLink").hover(
  function() {
    if ($(this).parents('.cardTop').length) {
      clearPageInterval();
      $(".card").addClass('fadeInfo');
    }

  }, function() {
    if ($(this).parents('.cardTop').length) {
      if (deBounceLux) {
        deBounceLux = false;
      } else {
        setPageInterval();
        $(".card").removeClass('fadeInfo');
      }
    }
  }
).click(function(e){
  e.preventDefault();
  if ($(this).parents('.cardTop').length) {
    deBounceLux = true;
    clearPageInterval();
    showInfo();
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

function setPageInterval() {
  // console.log("set")
  clearInterval();
  if (intervalID == null) {
    intervalID = window.setInterval(function(){
      switchPage();
    }, intervalLength);
  }
}

function clearPageInterval() {
  if (intervalID !== null) {
    // console.log("clear")
    window.clearInterval(intervalID);
    intervalID = null;
  } else {
    intervalID = null;
  }
}

function createCards() {
  for (var i=0, l=projectData.length; i<l; i++) {
    projectData[i];

    var div = $("<div>", {id: "projCard"+i, class: "smallCard hasBox projCard"});

    var bgDiv = $("<div>", {class: "bgHolder"});
    if (projectData[i].mobileBg) {
      bgDiv.css({"background":"url('"+ projectData[i].mobileBg +"')",
                                 "background-size": "cover",
                                 "background-position": "center center",
                                 "background-repeat": "no-repeat"}).attr('data-fullBg',projectData[i].bgImage);
    } else {
      bgDiv.css({"background":"url('"+ projectData[i].bgImage +"')",
                                 "background-size": "cover",
                                 "background-position": "center center",
                                 "background-repeat": "no-repeat"});
    }
    div.append(bgDiv);

    var textDiv = $("<div>", {class: "textHolder"});

    var p = $("<p>", {class: "coolHeading"});
    p.text(projectData[i].blurb);
    textDiv.append(p);

    p = $("<p>", {class: "projName title hidden"});
    p.text(projectData[i].title);
    textDiv.append(p);

    p = $("<p>", {class: "projDesc hidden"});
    p.text(projectData[i].description);
    textDiv.append(p);

    if (projectData[i].target) {
      p = $("<p>", {class: "projLink description hidden"});
      a = $("<a>", {class: "linkAnim"});
      a.attr({'href':'http://'+projectData[i].target,'target':'_blank'}).text(projectData[i].target)
      p.append(a)
      textDiv.append(p);
    }
    div.append(textDiv);

    // $div.click(function(){ /* ... */ });
    $("#projectCards").append(div);
  }
}

function switchPage() {
  var card = $(".cardTop");
  var id = card.attr('id').substring(4);
  topId = (parseInt(id)+1)%2
  var idNext = "#card" + topId;
  card.addClass("slideOut");
  $(idNext).addClass("slideUp");
  setTimeout(function() {
    $(idNext).removeClass('slideUp cardBottom fadeInfo showProjInfo').addClass('cardTop');
    fillCard(card,pageIndex);
  },1000)
}

function fillCard(card,contentIndex,top) {
  card.find('.projDescription').html($(".boxPrototype").html());
  sourceElement = $(".projCard").eq(contentIndex);
  var bgSource = sourceElement.find('.bgHolder').attr('data-fullBg');
  if (typeof bgSource !== typeof undefined && bgSource !== false) {
    card.find(".mediaHolder").css({"background":"url('"+ bgSource +"')",
                                   "background-size": "cover",
                                   "background-position": "center center",
                                   "background-repeat": "no-repeat"});
  } else {
    card.find(".mediaHolder").attr('style',sourceElement.find('.bgHolder').attr('style'));
    // console.log();
  }

  card.find(".coolHeading").html(sourceElement.find(".coolHeading").html());
  card.find(".projName").html(sourceElement.find(".projName").html());
  card.find(".projDesc").html(sourceElement.find(".projDesc").html());
  card.find(".projLink").html(sourceElement.find(".projLink").html());
  // console.log(pData)
  if (top === undefined || top === false) {
    card.removeClass('slideOut cardTop showInfo showProjInfo').addClass('cardBottom');
  }
  incrementIndex();
}

function showInfo() {
  clearPageInterval();
  $(".cardBottom .projDescription").html($(".luxInfo").html());
  $(".cardBottom").addClass("showInfo");
  switchPage();
}

function incrementIndex() {
  pageIndex++;
  if (pageIndex > $(".projCard").length-1) {
    pageIndex = 0;
  }
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
