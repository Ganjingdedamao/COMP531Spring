
var time = 200 
var count = 0
var x = 0
var y = 0
var food = {'x':0,'y':0,'color':0,'score':5}
var b = []
var score=0
var length = 16  
var snake = []
var side = 8
var direction = 2  
var level=1
window.onload = function() {
	score = getCookie("score") //get cookies
	count = getCookie("count")
	level = getCookie("level")
	
	
	if(score==null)//get the value of score, level and count
		score=0
	else
		score=parseInt(score)
	if(level==null)
		level=1
	else
		level=parseInt(level)
	if(count==null)
		count=0
	else
		count=parseInt(count)
	console.log(score)
	console.log(count)
	console.log(level)
	if(level==2) //set the time for interval
		time=time/2
	if(level==3)
		time=time/4
	interval = window.setInterval(set_pace, time)//set interval to start the game
	put_food() //put a food
	document.onkeydown = function(e) { //set the keyboard action
		var key = e.keyCode 
		switch(key){
			case 37 : direction = 0;break //left
			case 38 : direction = 1;break //up
			case 39 : direction = 2;break //right
			case 40 : direction = 3;break //down
		} 
	} 
}

function set_pace(){ //move the snake
	document.getElementById("point").innerHTML=score //display the score, level and point
	document.getElementById("score").innerHTML=count
	
	document.getElementById("level").innerHTML=level

	var canvas=document.getElementById("myCanvas")
	var context=canvas.getContext("2d")
	switch(direction){                //check the direction
		case 0:x=x-side;break
		case 1:y=y-side;break 
		case 2:x=x+side;break  
		case 3:y=y+side;break 
	} 
	if(x<0||y<0||x>canvas.width||y>canvas.height){ //check if hit the wall
		setCookie("score",score) //set cookies
		setCookie("count",count)
		setCookie("level",level) 
		alert("Game end! You hit the wall!") //alert
		window.location.reload() //reload the game
	} 
	for(var i=0;i<snake.length;i++){ //check if hit yourself
		if(x==parseInt(snake[i].x)&&y==parseInt(snake[i].y)){ 
			setCookie("score",score) //set the cookies
			setCookie("count",count)
			setCookie("level",level) 
			alert("Game end! You hit yourself!") //alert
			window.location.reload() //reload the game
		} 
	} 
	if (snake.length>length) { //check the length and move the snake
		var head = snake.shift()
		context.clearRect(head['x'], head['y'], side, side)
	}; 
	snake.push({'x':x,'y':y})
	context.fillStyle = "#006699"
	context.strokeStyle = "#006699"
	context.fillRect(x, y, side, side)
	for(var i=0;i<b.length;i++){ //check if eat the bad food
		var bad_food=b[i]
		if(x==(bad_food['x']*side)&&y==(bad_food['y']*side)){
			setCookie("score",score) //set the cookies
			setCookie("count",count)
			setCookie("level",level)
			alert("Game end! You ate a bad food!!!") //alert
			window.location.reload() //reload the game
		}
	}
	if(x==(food['x']*side)&&y==(food['y']*side)){  	//check if eat a good food
		if(food['color']==1) //purple food
			length=length+3
		else  //green food
			length++ 
		count++
		score=score+food['score']*level //add score
		if(count%3==1){ //put a bad food
			console.log("put_bad_food")
			put_bad_food()
		}
		put_food() //put a good food
		if(count!=0&&count%4==0&&level<3) //move to a higher level
		{	level++ 
			time=time/2 //speed become faster
			window.clearInterval(interval)
			interval=setInterval("set_pace()",time)

		}
		document.getElementById("point").innerHTML=score //display the new score, point and level
		document.getElementById("score").innerHTML=count
		document.getElementById("level").innerHTML=level
	} 
	

} 

function put_food(){ //put a good foof
	var canvas=document.getElementById("myCanvas")
	var context=canvas.getContext("2d")
	food['x'] = Math.ceil(Math.random()*(canvas.width/side)) //get random x, y
	food['y'] = Math.ceil(Math.random()*(canvas.height/side))
	if(food['x']==(canvas.width/side))
		food['x']=food['x']-1
	if(food['y']==(canvas.height/side))
		food['y']=food['y']-1
	for(var i=0;i<b.length;i++){ //check if it is overlapped by bad food
		var bad_food=b[i]
		if(bad_food['x']==food['x']&& bad_food['y']==food['y']){
			if(bad_food['x']-1>=0){
				food['x'] = bad_food['x']-1
			}
			else{
				food['x'] = bad_food['x']+1
			}
			console.log("food==b")
		}
	} 
	
	food['color']= Math.ceil(Math.random()*2) //random color
	if(food['color']==1){ //purple
		context.fillStyle = "#FF00FF"
		context.strokeStyle = "#FF00FF"
		food['score']=15
	}
	else{ //green
		context.fillStyle = "#82D900"
		context.strokeStyle = "#82D900"
		food['score']=5
	}
	
	context.fillRect(food['x']*side, food['y']*side, side, side) //paint the food
} 
function put_bad_food(){ //put a bad food
	console.log(" in the put_bad_food")
	var canvas=document.getElementById("myCanvas")
	var context=canvas.getContext("2d")
	newx = Math.ceil(Math.random()*(canvas.width/side)) //random x, y
	newy = Math.ceil(Math.random()*(canvas.height/side))
	var color= 1 //red
	context.fillStyle = "#FF0000"
	context.strokeStyle = "#FF0000"
	context.fillRect(newx*side, newy*side, side, side) //paint the food
	b.push({'x':newx,'y':newy,'color':color}) //record the bad food
} 
function setCookie(name,value){ //set cookies
	var exp = new Date()
	exp.setTime(exp.getTime() + 1*60*60*1000) //set expiration time
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() //set
}
function getCookie(name){ //get cookies
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)")) //match
	if(arr != null)
		return unescape(arr[2])
	return null
}
function up(){ //mouse action up
	direction = 1
}
function down(){ //down
	direction = 3
}
function left(){ //left
	direction = 0
}
function right(){ //right
	direction = 2
}
function restart(){ //restart the game
	setCookie("score",0) //set the cookies
	setCookie("count",0)
	setCookie("level",1)
	window.location.reload() //restart
}
