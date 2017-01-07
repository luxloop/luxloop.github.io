
$(document).ready(function() {

  fadeElements(0);

  /////////////////////////////
  // Overheard
  var video1 = document.getElementById('bgVid1');
  video1.src = 'assets/bgVid1.mp4';
  video1.addEventListener('canplaythrough', function() {
    video1.play();
  }, false);
  video1.load();

  /////////////////////////////
});

$(window).scroll(function() {
  var scrollTop = $(window).scrollTop()
  //animateVideo($(window).scrollTop());
  fadeElements(scrollTop);
  playPauseVideo(scrollTop);
});


function playPauseVideo(scrollTop) {
  $(".videoCover").each(function(){
    var vid = $(this)
    var vidElement = vid[0];

    var vidTop = vid.parent().offset().top;
    var vidBottom = vidTop + vid.parent().height()

    if (scrollTop < vidTop - window.innerHeight || scrollTop > vidBottom) {
      vidElement.pause();
      //console.log("Pause")
    } else {
      vidElement.play();
      console.log("play " + vidElement.id)
      //console.log("Pause")
    }
  })
}


function fadeElements(windowTopToPageTop){
  if( $(".fadeInElement").length > 0 ) {
    $('.fadeInElement').each(function(){
      var elementTopToPageTop = $(this).offset().top;
      var windowInnerHeight = window.innerHeight;
      var elementTopToWindowTop = elementTopToPageTop - windowTopToPageTop;
      var elementTopToWindowBottom = windowInnerHeight - elementTopToWindowTop;
      var distanceFromBottomToAppear = 100;

      if(elementTopToWindowBottom > distanceFromBottomToAppear) {
        $(this).addClass('showElement');
      }
      else if(elementTopToWindowBottom < 0) {
        $(this).removeClass('showElement');
        $(this).addClass('hideElement');
      }
    })
  }
}
