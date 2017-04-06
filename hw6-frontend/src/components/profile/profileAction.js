import Action, { resource, error, success} from '../../actions'

export function gotoMain(username) {
  return ({type: Action.GOTOMAIN, username})
}
export function logOut() {
  return ({type: Action.LOGOUT})
}

export function updateProfile(acco_name, disp_name, email, phone, zipcode, password, pass_conf, profile){
  //set the regular expression for zipcode
  const zipReg = new RegExp("^[0-9]{5}$|^[0-9]{5}-[0-9]{4}$")
  //set the regular expression for phone number
  const phoneReg = new RegExp("^[1-9][0-9]{2}[-][0-9]{3}[-][0-9]{4}$")
  //set the regular expression for email
  const emailReg= new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+.[a-zA-Z0-9_-]+$")
  //set the regular expression for account name
  const nameReg = new RegExp("^[a-zA-Z][a-zA-Z0-9]*$")

  if(!validate(acco_name,nameReg)){
    const message="Your account name does not match the requested format. Account name can only be upper or lower case letters and numbers, but may not start with a number. Please enter a valid account name."
    return (error(message,""))
  }
  //validate the email
  if(!validate(email,emailReg)){
    const message="Your email does not match the requested format a@b.co, please enter a valid email address."
    return (error(message,""))
  }
  //use regular expression to validate the phone number
  if(!validate(phone,phoneReg)){
    const message="Your phone number does not match the requested format 123-123-1234. Your phone number should not start with 0. Please enter a valid phone number."
    return (error(message,""))
  }
  //use regular expression to validate the zipcode
  if(!validate(zipcode,zipReg)){
    const message="Your zipcode does not match the requested format 99999 or 99999-9999. Please enter a valid zipcode."
    return (error(message,""))
  }
  //password confirmation required
  if(pass_conf!=password){
    const message="Your password confirmation is not as same as your password!"
    return (error(message,""))
  }
  return (dispatch)=>{ 
    if(acco_name!="")
      dispatch({type: Action.UPDATEPROFILE, acco_name: acco_name, message: "Update accont name successfully, but the change will not be persistent."})
    if(disp_name!="")
      dispatch({type: Action.UPDATEPROFILE, disp_name: disp_name, message: "Update display name successfully, but the change will not be persistent."})
    if(email!="")
      dispatch(updateData('email', email))
    if(zipcode!="")
      dispatch(updateData('zipcode', zipcode))
    if(password!="")
      dispatch(updateData('password', password))
    if(phone!="")
      dispatch({type: Action.UPDATEPROFILE, phone: phone, message: "Update phone successfully, but the change will not be persistent."})
  }
}
export function validate(infor,inforReg){// validate the info
  if(infor!=""){
    if(!(inforReg.test(infor))){
      return false
    }
  }
  return true
}
//update each field of profile info 
export function updateData(fieldName, value) {
  const message = fieldName=='password'? "Update password successfully, but the change will not be persistent." : "Update " + fieldName + " successfully!"
  const action = { type: Action.UPDATEPROFILE, message: message}
  return (dispatch) => {
    if (value) {
      const payload = {}
      payload[fieldName] = value
      resource('PUT', fieldName, payload).then((r) => {
        if(fieldName=='password'){
          action[fieldName] = value
        }
        else{
          action[fieldName] = r[fieldName]
        }
        dispatch(action)
      })
      .catch(r =>{ 
        dispatch(error("Failed to update profile", ""))
      })
    }
  } 
}
export function updateAvatar(fd){
  return (dispatch)=>{
    resource('PUT', 'avatar', fd, false).then((r)=>{
      dispatch({type: Action.UPDATEPROFILE, avatar : r.avatar})
    })
    .catch(r=>{
      dispatch(error("Failed to upload new avatar", ""))
    })
  }
}