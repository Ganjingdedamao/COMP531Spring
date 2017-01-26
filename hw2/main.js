var ID=[0,0,0,0,0,0,0];
var time=[0,0,0,0,0,0,0]
for(var i=0;i<time.length;i++){
	time[i]=Math.floor(Math.random()*(5000-500))+500;
}
console.log(time);
var imglist=document.getElementsByTagName("img")
window.onload = function() {
	
	var username = document.getElementById("username")
	var loginBtn = document.getElementById("login")
	var post = document.getElementById("post")
	//set intervals
	ID[0]=setInterval(function(){changeimg(imglist[0]);}, time[0]);
	ID[1]=setInterval(function(){changeimg(imglist[1]);}, time[1]);
	ID[2]=setInterval(function(){changeimg(imglist[2]);}, time[2]);
	ID[3]=setInterval(function(){changeimg(imglist[3]);}, time[3]);
	ID[4]=setInterval(function(){changeimg(imglist[4]);}, time[4]);
	ID[5]=setInterval(function(){changeimg(imglist[5]);}, time[5]);
	ID[6]=setInterval(function(){changeimg(imglist[6]);}, time[6]);

}
//change the images
function changeimg(img)
{
	var src=img.src;
	src=src.split("/");
	src=src[src.length-1].split(".");
	var i=parseInt(src);
	//console.log(src);
	
	if(i<7) i++;
	else i=1;
	//console.log(i);
	img.src="./"+i+".jpg";
	img.width="450";
	img.height="300";
}
//start and stop intervals
function start_stop(id){
	var btn=document.getElementById(("btn"+id));
	if(btn.innerHTML=="Stop")//Stop
		pausetimer(btn,id);
	else//Start
		resumetimer(btn,id);
}
//stop the interval
function pausetimer(btn,id){
	console.log(id);
	window.clearInterval(ID[id-1]);
	btn.innerHTML="Start";
}
//start the interval
function resumetimer(btn,id){
	newtime=Math.floor(Math.random()*(5000-500))+500;
	ID[id-1]=setInterval(function(){changeimg(imglist[id-1]);}, newtime);
	btn.innerHTML="Stop";
}