export function gotoMain(username) {
	return ({type: 'GOTOMAIN', username})
}
export function logOut() {
	return ({type: 'LOGOUT'})
}

export function updateProfile(acco_name, disp_name, email, phone, zipcode, password, pass_conf, profile){
	//set the regular expression for zipcode
    var zipReg = new RegExp("^[0-9]{5}$|^[0-9]{5}-[0-9]{4}$")
    //set the regular expression for phone number
    var phoneReg = new RegExp("^[1-9][0-9]{2}[-][0-9]{3}[-][0-9]{4}$")
    //set the regular expression for email
    var emailReg= new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+.[a-zA-Z0-9_-]+$")
    //set the regular expression for account name
    var nameReg = new RegExp("^[a-zA-Z][a-zA-Z0-9]*$")
    
    if(!validate(acco_name,nameReg)){
         let message="Your account name does not match the requested format. Account name can only be upper or lower case letters and numbers, but may not start with a number. Please enter a valid account name."
         return ({type: 'ERROR', message})
    }
    
    //validate the email
    if(!validate(email,emailReg)){

         let message="Your email does not match the requested format a@b.co, please enter a valid email address."
         return ({type: 'ERROR', message})
    }
    //use regular expression to validate the phone number
    if(!validate(phone,phoneReg)){
        let message="Your phone number does not match the requested format 123-123-1234. Your phone number should not start with 0. Please enter a valid phone number."
        return ({type: 'ERROR', message})
    }
    //use regular expression to validate the zipcode
    if(!validate(zipcode,zipReg)){
        
        let message="Your zipcode does not match the requested format 99999 or 99999-9999. Please enter a valid zipcode."
       	return ({type: 'ERROR', message})
        
    }
    //password confirmation required
    if(pass_conf!=password){
        let message="Your password confirmation is not as same as your password!"
   		return ({type: 'ERROR', message})
    }
    //console.log(profile.acco_name)
    let newacco_name=acco_name!=""? acco_name: profile.acco_name
    let newdisp_name=disp_name!=""? disp_name: profile.disp_name
    let newemail=email!=""? email: profile.email
    let newphone=phone!=""? phone: profile.phone
    let newzipcode=zipcode!=""? zipcode: profile.zipcode
    let newpass=password!=""? password: profile.password
    let newconf=pass_conf!=""? pass_conf: profile.pass_conf
   	let newbirth=profile.birth
   	let newimg=profile.img
   	let newheadline=profile.headline
    let newprofile=[{acco_name: newacco_name, disp_name: newdisp_name, email: newemail, phone: newphone, zipcode:newzipcode, password:newpass, pass_conf: newconf, birth: newbirth, img:newimg, headline:newheadline}]
   
	return ({type: 'UPDATEPROFILE', newprofile})
}
export function validate(infor,inforReg){// validate the info
    if(infor!="")
        if(!(inforReg.test(infor)))
            return false
    
    return true;
}
