$(document).ready(function() {
	$("#titleBar").fitText(1.0, { minFontSize: '30px', maxFontSize: '100px' });

	$.backstretch([
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
});