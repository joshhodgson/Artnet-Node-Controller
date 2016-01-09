var artnoot = require('artnoot');


var client = new artnoot.Client({
  host: '192.168.72.68', // optional
  port: 6454, // optional
  refresh: 120, // optional - ms to refresh values if supplied
}).connect();


/*
var RED = 1;
var GREEN = 2;
var BLUE = 3;
var AMBER = 4;
*/
var forever=true;
var differences = [];
var steps;
function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function randomColour(){
	var red = randomInt(150,255);
	var green = randomInt(0,50);
	var blue = randomInt(0,100);
	var amber = randomInt(0,55);
	
	var total = red+green+blue+amber;
	var normaliser = 700 / total;
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

function arrayGen(){
	array=[]
	for( var i = 0; i<12; i++ ){
		var totalMax = randomInt(500,1000);
		var colours = randomColour();
		array[4*i ] = colours.red;
		array[4*i +1 ] = colours.green;
		array[4*i +2] = colours.blue;
		array[4*i +3] = colours.amber;
	}
	return(array)
}
function arrayGenrgb(){
	array=[]
	for( var i = 0; i<12; i++ ){
		array[0, 4*i ] = 0;
		array[4*i +1 ] = 0;
		array[4*i +2] = 0;
		array[4*i +3] = 0;
		var rnd = Math.random()
		if (rnd<0.25) array[0, 4*i ] = 255;
		if (rnd>0.25 && rnd<0.5) array[4*i +1 ] = 255;
		if (rnd>0.5 && rnd<0.75) array[4*i +2] = 2555;	}
	return(array)
}

function setValues(newValues){
	for( var i = 0, len = newValues.length ;i<len; i++){
		client.set(0, i, newValues[i]);
	}
}
var currentValues = arrayGen();
setValues(currentValues);
var timer;

function fade( ){
	var newValues = arrayGen();
	clearTimeout(timer);
	steps = 0;
	for(i=0, len = currentValues.length; i<len; i++){
		differences[i]=(newValues[i]-currentValues[i])/1000;
	}
	timer = setInterval(function(){
		steps++;
		if (steps > 1500) {
			clearTimeout(timer);
			if (forever=true) fade();
		}
		if ( steps<1000){
		for(i=0, len = currentValues.length; i<len; i++){
			currentValues[i]=currentValues[i]+differences[i];
		}
		setValues(currentValues);}
	}, 10);
	console.log('New timer created');

	
}

function fadeRGB( ){
	var newValues = arrayGenrgb();
	clearTimeout(timer);
	steps = 0;
	for(i=0, len = currentValues.length; i<len; i++){
		differences[i]=(newValues[i]-currentValues[i])/500;
	}
	timer = setInterval(function(){
		steps++;
		if (steps > 700) {
			clearTimeout(timer);
			if (forever=true) fadeRGB();
		}
		if( steps<500) {
		for(i=0, len = currentValues.length; i<len; i++){
			currentValues[i]=currentValues[i]+differences[i];
		}
		setValues(currentValues);}
	}, 10);
	console.log('New timer created');
	
	
}
fade();






