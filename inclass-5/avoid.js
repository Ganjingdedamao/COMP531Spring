function setplay(){//set up the Game
	var hidspan = document.getElementById("hidspan");
	var avoidbtn = document.getElementById("Avoidbtn");
	hidspan.onmousemove = function() {//the function for the mousemove event
		if(!ShiftPressed(event)&&avoidbtn.innerHTML=="Click Me!")//if Game is active
			move(hidspan,avoidbtn);//move the button
	}

}
function move(hidspan,clickbtn){//Move the button
	var pos=positionObj(clickbtn);
	var hidpos=getPos(hidspan);
	var x=hidpos.x;
	var y=hidpos.y;
	console.log(pos.x);
	if(pos.x<0){
		if(x+parseInt(clickbtn.style.width)+(parseInt(hidspan.style.width)-parseInt(clickbtn.style.width))/2+10<document.body.offsetWidth)
			x=x+10;
		else
			x=document.body.offsetWidth-parseInt(clickbtn.style.width);
	}
	if(pos.x>0){
		if(x+(parseInt(hidspan.style.width)-parseInt(clickbtn.style.width))/2-10>0)
			x=x-10;
		else
			x=0-(parseInt(hidspan.style.width)-parseInt(clickbtn.style.width))/2;
	}
	if(pos.y<0){
		y=y+10
	}
	if(pos.y>0){
		if(y+(parseInt(hidspan.style.height)-parseInt(clickbtn.style.height))/2-10>0)
			y=y-10;
		else
			y=0-(parseInt(hidspan.style.height)-parseInt(clickbtn.style.height))/2;
	}
	
	hidspan.style.left=x+'px';//set the location of the button
	console.log(x+"px");
	hidspan.style.top=y+"px";

}
function getPos(o)//Get the position of element o
{ 
    var x = 0, y = 0, z=0; 
    do { 
        x += o.offsetLeft; 
        y += o.offsetTop; 

    } while (o = o.offsetParent); 
    return  {'x':x,'y':y}; 
}
function positionObj(id){//Get the relative position between mouse and the button
    var pos=getPos(id);
    var thisX = pos.x+parseInt(id.style.width)/2;
    var thisY = pos.y+parseInt(id.style.height)/2;
    var thisScrollTop = document.documentElement.scrollTop + document.body.scrollTop;
    var event = window.event; 
    x = event.clientX - thisX;
    y = event.clientY - thisY + thisScrollTop; 
    return {'x':x,'y':y};
 
}
function ShiftPressed(event)//test whether Shift is pressed
{
	if (event.shiftKey==1)
		return true;
	else
		return false;
}
function ClickBtn() {//the function for onclick event
	if(document.getElementById("Avoidbtn").innerHTML=="Click Me!"){//if the innerHTML is "CLick Me!"
		document.getElementById("Cong").style.display="table-cell";//Show the Congradulation div
		document.getElementById("Avoidbtn").innerHTML="Play Again";//change to "Play Again"
	}
	else//if the innerHTML is "Play Again"
	{
		document.getElementById("Cong").style.display="none";//hid the Congradulation div
		document.getElementById("Avoidbtn").innerHTML="Click Me!";//change to "Click Me!"
	}

}
