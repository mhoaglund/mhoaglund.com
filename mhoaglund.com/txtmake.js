var data = {
	active: initText,
	google : {families: ['Cardo:italic', 'Roboto:300,100', 'Cutive Mono', 'Oranienbaum', 'Nunito Sans:900,700,500,300']}
};

 WebFont.load(data);

$( window ).resize(function() {
  txtRemake();
});

var oallht;
var oallwth;
var oallctr;
var useOverlay = true;
var lightnessmod = 1.2;

function initText(){
	setOalls();
	txtMake($('#statement'));
	txtMake($('#footertxt'));
}

function setOalls(){
	 oallht = $(window).height();
	 oallwth = $(window).width(); 
	 oallctr = {x: (oallwth/2), y: (oallht/2) };
}

function txtMake(element){
	var textElement = element;
	//Grab a chunk of text and size it to the screen. Paint it with a gradient traversing the rgb color spectrum according to scrn pos
	//var target = $('#target');
	var $targetdiv = $("<div>", {class: "target"});
	var $overlaydiv = $("<div>", {class: "overlaytarget"});

	var myPar = textElement.text();

	for(i=0; i<myPar.length; i++){
		$targetdiv.append('<span class="glyph">' + myPar.charAt(i) + '</span>');
		$overlaydiv.append('<span class="overlay">' + myPar.charAt(i) + '</span>');
	}

	textElement.parent().append($targetdiv);
	if(useOverlay){
		textElement.parent().append($overlaydiv);
	}

	textElement.remove();
	txtRemake();

	$('.glyph').delay(200).animate({
		opacity: 1.0
	}, 200);
	$('.overlay').delay(200).animate({
		opacity: 0.6
	}, 200);
}

function txtRemake(){
	setOalls();
	var allglyphs = $('.glyph');
	for(i=0;i<allglyphs.length; i++){
		var glyph = $(allglyphs[i]);
		var charos = glyph.offset();
		var rtoffset = oallwth - charos.left;
		var shortheight = oallht * 0.6;
		var red = ((charos.top)/shortheight * 150)+100;
		var green = ((charos.left)/oallwth * 50)+100;
		var blue = ((rtoffset)/oallwth * 75)+20;
		var mycolor = 'rgb('+ Math.round(red * lightnessmod) + ','+ Math.round(green * lightnessmod) + ','+ Math.round(blue* lightnessmod) + ')';
		glyph.css({
			color: mycolor
		});
	}
}