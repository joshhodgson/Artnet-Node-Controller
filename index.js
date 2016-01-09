var artnoot = require('artnoot');


var client = new artnoot.Client({
  host: '192.168.72.68', // optional
  port: 6454, // optional
  refresh: 60, // optional - ms to refresh values if supplied
}).connect();



var RED = 1;
var GREEN = 2;
var BLUE = 3;
var AMBER = 4;
function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function randomColour(){
	var red = randomInt(150,255);
	var green = randomInt(150,200);
	var blue = randomInt(150,255);
	var amber = randomInt(150,200);
	
	var total = red+green+blue+amber;
	var normaliser = 750 / total;
	red = red * normaliser;
	green = green*normaliser;
	blue=blue*normaliser;
	amber=amber*normaliser;
	var colours ={
		'red':red,
		'green':green,
		'blue':blue,
		'amber':amber
	}
	return colours;
}
function parRandom(){
for( var i = 0; i<12; i++ ){
	var totalMax = randomInt(500,1000);
	var colours = randomColour();
	for( var j = 0; j<4; j++){
		if(j=RED) client.set(0, 4*i +j -1, colours.red);
		if(j=GREEN) client.set(0, 4*i +j -1, colours.green);
		if(j=BLUE) client.set(0, 4*i +j -1, colours.blue);
		if(j=AMBER) client.set(0, 4*i +j -1, colours.amber);
	}
}
}
parRandom();



//test
var timer = setInterval(function() {parRandom(); console.log('changing')}, 3000);
