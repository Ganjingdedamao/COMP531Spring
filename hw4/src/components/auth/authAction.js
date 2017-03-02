

export function localLogin(username,password) {
    if(!username)//check username
	{	let message="please input username!!"
		return ({type: 'ERROR', message})
	}
	else if(!password)// check password
	{	let message="please input password!!"
		return ({type: 'ERROR', message})
	}
	else{//login
		return ({ type: 'LOGIN', username, password})
	        
	    }
	
}

export function doRegister(acco_name, disp_name, email, phone, birth, zipcode, password, pass_conf){
        var d = new Date()
      
      //set month and date array
      var month=["01","02","03","04","05","06","07","08","09","10","11","12"]
      var date=["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17",
      "18","19","20","21","22","23","24","25","26","27","28","29","30","31"]
      //change time stamp to readable string
      var now=d.getFullYear()+"-"+month[parseInt(d.getMonth())]+"-"+date[parseInt(d.getDate())-1]
      //save readable string
     
	//set the regular expression for account name
    var nameReg = new RegExp("^[a-zA-Z][a-zA-Z0-9]*$")
    //set the regular expression for zipcode
    var zipReg = new RegExp("^[0-9]{5}$|^[0-9]{5}-[0-9]{4}$")
    //set the regular expression for phone number
    var phoneReg = new RegExp("^[1-9][0-9]{2}[-][0-9]{3}[-][0-9]{4}$")
    //set the regular expression for email
    
    var emailReg= new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+.[a-zA-Z0-9_-]+$")
    //account name required
    if(acco_name==""){
        let message="Please input your account name!"
        return ({type: 'ERROR', message})
    }
    //validate account name
    
    if(!(nameReg.test(acco_name))){
        let message="Your account name does not match the requested format. Account name can only be upper or lower case letters and numbers, but may not start with a number. Please enter a valid account name."
        return ({type: 'ERROR', message})
    }
    //email required
    if(email==""){
        let message="Please input your email addsress!"
        return ({type: 'ERROR', message})
    }
    //validate the email
    if(!(emailReg.test(email))){
        
        let message="Your email does not match the requested format a@b.co, please enter a valid email address."
      	return ({type: 'ERROR', message})
    }
    //phone required
    if(phone==""){
        let message="Please input your phone number!"
        return ({type: 'ERROR', message})
    }
    //use regular expression to validate the phone number
    if(!(phoneReg.test(phone))){
        let message="Your phone number does not match the requested format 123-123-1234. Your phone number should not start with 0. Please enter a valid phone number."
        return ({type: 'ERROR', message})
    }
    //zipcode required
    if(zipcode==""){
        let message="Please input your zipcode!"
        return ({type: 'ERROR', message})
    }
    //use regular expression to validate the zipcode
    if(!(zipReg.test(zipcode))){
        let message="Your zipcode does not match the requested format 99999 or 99999-9999. Please enter a valid zipcode."
        return ({type: 'ERROR', message})
    }
    //date of birth required
    if(birth==""){
        let message="Please input your date of birth!"
        return ({type: 'ERROR', message})
    }
    //validate date of birth
    if(!agevalid(birth,now)){
        
        let message="Sorry! Only individuals 18 years of age or older on the day of registration are allowed to register."
        return ({type: 'ERROR', message})
    }
    //password required
    if(password==""){
        let message="Please input your password!"
        return ({type: 'ERROR', message})
    }
    //password confirmation required
    if(pass_conf!=password){
        let message="Your password confirmation is not as same as your password!"
        return ({type: 'ERROR', message})
    }
    //register
    return ({ type: 'REGISTER', disp_name })
	

}

function agevalid(birth,now){//validate 18 years old
    
    now=now.split("-")
    var now_Year=parseInt(now[0])
    var now_Month=parseInt(now[1])
    var now_Date=parseInt(now[2])
    birth=birth.split("-")
    var birth_Year=parseInt(birth[0])
    var birth_Month=parseInt(birth[1])
    var birth_Date=parseInt(birth[2])
   
    if(now_Year-birth_Year>18) return true
    if(now_Year-birth_Year<18) return false
    if(now_Month-birth_Month>0) return true
    if(now_Month-birth_Month<0) return false
    if(now_Date-birth_Date>=0) return true
    else return false

}