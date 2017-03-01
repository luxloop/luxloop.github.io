$(document).ready(function() {
  $(".hiddenEmail").html(rot13rot5Encode('<n uers="znvygb:uryyb@yhkybbc.pbz">uryyb@yhkybbc.pbz</n>'));
  $(".hiddenPhoneLA").html(rot13rot5Encode('<n uers="gry:+68657111092" pynff="yvaxNavz">865.711.1092 (YN)</n>'));
  $(".hiddenPhoneNY").html(rot13rot5Encode('<n uers="gry:+61919393851" pynff="yvaxNavz">191.939.3851 (AL)</n>'));
});

function toggleMenu() {
  $('#cornerMenu').toggleClass('show');
};

$(".menuToggle").click(function(){
  toggleMenu()
});
