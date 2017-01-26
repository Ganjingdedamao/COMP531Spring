
'use strict'
var sunx=40;
var suny=60;
var r=30;
var carx=0;
var cary=400;
var buildings=[""];
//var num=0;

var sun_vx=20;
var sun_vy=5;
var car_vx=20;
//draw the canvas
var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 
	var windowColors = ['yellow', 'black']
	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2
		var index=Math.floor(Math.random()*blgColors.length);
		c.fillStyle= blgColors[ index]
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)
		var pos = new Object();
		pos.x1=x0;
		pos.y1=floor - blgHeight;
		pos.x2=x0+blgWidth;
		pos.y2=floor;
		pos.color=index
		//var pos=[x0, floor - blgHeight, x0+blgWidth, floor,index];
		buildings.push(pos);
		//c.fillStyle="yellow"
		for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
				c.fillStyle=windowColors[Math.floor(Math.random()*windowColors.length)];
				c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
			}
		}
	}

	return {
		build: build
	}
}
//draw the sun
var fillCircle=function(canvas){
	
	var c = canvas.getContext("2d");

	c.clearRect(0, 0, canvas.width, canvas.height);// clear the canvas 
	//paint circle at (sun_x, sun_y), radius: 20, color: yellow
	c.beginPath();
	c.arc(sunx, suny, 20, 0, 2*Math.PI);
	c.fillStyle ='yellow';
	c.fill();
	if (sunx + sun_vx > canvas.width-r){
		sunx = 40;
	}
	if (suny+sun_vy>canvas.height/4||suny+sun_vy<r){
		sun_vy = -sun_vy;
	}
	suny+=sun_vy;
	sunx+=sun_vx;
}
//draw the car
var drawcar=function(canvas){
	//var carcanvas=document.getElementById("car");

	var c = canvas.getContext("2d");
	c.clearRect(0, 0, canvas.width, canvas.width);//clear the canvas
	//paint a image at (car_x, car_y), width: 50, height:25
	var floor = canvas.height/2
	var img = document.getElementById("car");
    var width =45;
    var height = 25;
	c.drawImage(img, carx, floor - height, width, height);
	if (carx+car_vx>canvas.width-50){
		carx = 0;
	}
	carx+=car_vx;
}
window.onload = function() {
	
	var app = createApp(document.getElementById("canvas"));
	var sun=document.getElementById("sun");
	var car=document.getElementById("car");
	setInterval('fillCircle(sun)', 500);
	setInterval('drawcar(car1)', 500);
	document.getElementById("build").onclick = app.build
	document.getElementById("canvas").addEventListener("click", function (evt) { 
	  var mousePos = getMousePos(canvas, evt); 
	   
	  taller(mousePos)
	 }, false); 

}
//make the building taller
var taller=function(mousePos){
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3
	var canvas=document.getElementById("canvas");
	var c=canvas.getContext("2d");
	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 
	var windowColors = ['yellow', 'black']
	for(var i=1;i<=buildings.length;i=i+1){
		var pos=buildings[i];
		
		if(pos!=undefined&&pos.x1<=mousePos.x&&mousePos.x<=pos.x2&&pos.y1<=mousePos.y&&mousePos.y<=pos.y2)
		{	
			var floor=pos.y1;
			var oldfloor=canvas.height/2;
			var blgHeight=Math.random()*100;
			var blgWidth=pos.x2-pos.x1;
			var x0=pos.x1;
			c.fillStyle= blgColors[pos.color]
			c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)
			var newpos=new Object();
			newpos.x1=x0;
			newpos.y1=floor - blgHeight;
			newpos.x2=x0+blgWidth;
			newpos.y2=oldfloor;
			newpos.color=pos.color;
			//var newpos=[x0, floor - blgHeight, x0+blgWidth, oldfloor,pos.color];
			buildings[i]=newpos;
			//c.fillStyle="yellow"
			for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
				for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
					c.fillStyle=windowColors[Math.floor(Math.random()*windowColors.length)];
					c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
				}
			}
		}

	}
}
//get the mouse position
function getMousePos(canvas, evt) { 
   var rect = canvas.getBoundingClientRect(); 
   return { 
     x: evt.clientX - rect.left * (canvas.width / rect.width),
     y: evt.clientY - rect.top * (canvas.height / rect.height)
   }
 }