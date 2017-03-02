

export function addArticle(username,text){
	//if the new article is empty, then do nothing
	if(text=="")
		return ({ type: 'default' })
	//get the date
	let d = new Date()
	let month=["01","02","03","04","05","06","07","08","09","10","11","12"]
	let dateString=["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17",
	"18","19","20","21","22","23","24","25","26","27","28","29","30","31"]
	//change time stamp to readable string
	let date=d.getFullYear()+"-"+month[parseInt(d.getMonth())]+"-"+dateString[parseInt(d.getDate())-1]
	
	//add article
	return ({ type: 'ADDARTICLE', username, date, text})
}