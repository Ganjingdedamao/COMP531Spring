import Action, { resource, url, error, success} from '../../actions'

export function localLogin(username,password) {
  if(!username)//check username
  {	
    const message="Please input username!!"
    return (error(message,""))
  }
  else if(!password)// check password
  {	
    const message="Please input password!!"
    return (error(message, ""))
  }
  else{//login
    return (dispatch)=>{
      resource('POST', 'login', { username, password})
      .then((r) => {
        dispatch({type: Action.LOGIN, username: r.username, password: password})
        dispatch(fetchArticles())
        dispatch(fetchFollowers(r.username))
        dispatch(fetchProfile())
      })
      .catch(r =>{ 
        dispatch(error("Unauthorized login", ""))
      })
    }
  }
}
//fetch articles
export function fetchArticles(){
  return (dispatch)=>{
    resource('GET', 'articles')
    .then((r) => {
      dispatch({type: Action.FETCHARTICLES, articles: r.articles})
    })
    .catch(r =>{ 
      dispatch(error("Failed to fetch articles", ""))
    })
  }
}
//fetch followers
export function fetchFollowers(username){
  return (dispatch)=>{
    resource('GET', 'following' + (username ? '/' + username : ''))
    .then((r) => {
      // fetch information of each follower
      r.following.map((fri)=>dispatch(fetchOne(fri)))
    })
    .catch(r =>{ 
      dispatch(error("", "Failed to fetch followers"))
    })
  }
}
//fetch information of the given follower
export function fetchOne(username){
  return (dispatch)=>{
    resource('GET', 'headlines' + (username ? '/' + username : '')).
    then((r) => {
      const headline=r.headlines[0].headline 
      resource('GET', 'avatars' + (username ? '/' + username : '')).
      then((r) => {
        const avatar=r.avatars[0].avatar    
        const follower={name: username, headline: headline, img: avatar}
        const action={type: Action.FETCHFOLLOWERS, follower:follower }
        dispatch(action) 
      })
      .catch(r =>{ 
        dispatch(error("","Failed to fetch follower's avatar"))
      })
    })
    .catch(r =>{ 
      dispatch(error("", "Failed to fetch follower's headline"))
    })
  }
}
//fetch Profile info
export function fetchProfile(){
  return (dispatch) => {
    dispatch(fetchData('avatars'))
    dispatch(fetchData('zipcode'))
    dispatch(fetchData('email'))
    dispatch(fetchData('dob'))
    dispatch(fetchData('headlines'))
  }
}
//fetch each field of the profile
export function fetchData(fieldName){ 
  return (dispatch)=>
  {
    resource('GET', fieldName).then((r) => {
      const action = { type: Action.FETCHPROFILE }
      switch(fieldName) {
        case 'avatars':
          action.avatar = r.avatars[0].avatar; break;
        case 'email':
          action.email = r.email; break;
        case 'zipcode':
          action.zipcode = r.zipcode; break;
        case 'dob':
          action.dob = new Date(r.dob).toDateString(); break;
        case 'headlines':
          action.headline=r.headlines[0].headline; break;
      }
      dispatch(action)
    })
    .catch(r =>{ 
      dispatch(error("", "Failed to fetch profile information"))
  })
}

}
export function doRegister(acco_name, disp_name, email, phone, birth, zipcode, password, pass_conf){
  //set the regular expression for account name
  const nameReg = new RegExp("^[a-zA-Z][a-zA-Z0-9]*$")
  //set the regular expression for zipcode
  const zipReg = new RegExp("^[0-9]{5}$|^[0-9]{5}-[0-9]{4}$")
  //set the regular expression for phone number
  const phoneReg = new RegExp("^[1-9][0-9]{2}[-][0-9]{3}[-][0-9]{4}$")
  //set the regular expression for email
  const emailReg= new RegExp("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+.[a-zA-Z0-9_-]+$")
  //account name required
  if(acco_name==""){
    const message="Please input your account name!"
    return (error(message,""))
  }
  //validate account name
  if(!(nameReg.test(acco_name))){
    const message="Your account name does not match the requested format. Account name can only be upper or lower case letters and numbers, but may not start with a number. Please enter a valid account name."
    return (error(message,""))
  }
  //email required
  if(email==""){
    const message="Please input your email addsress!"
    return (error(message,""))
  }
  //validate the email
  if(!(emailReg.test(email))){
    const message="Your email does not match the requested format a@b.co, please enter a valid email address."
    return (error(message,""))
  }
  //phone required
  if(phone==""){
    const message="Please input your phone number!"
    return (error(message,""))
  }
  //use regular expression to validate the phone number
  if(!(phoneReg.test(phone))){
    const message="Your phone number does not match the requested format 123-123-1234. Your phone number should not start with 0. Please enter a valid phone number."
    return (error(message,""))
  }
  //zipcode required
  if(zipcode==""){
    const message="Please input your zipcode!"
    return (error(message,""))
  }
  //use regular expression to validate the zipcode
  if(!(zipReg.test(zipcode))){
    const message="Your zipcode does not match the requested format 99999 or 99999-9999. Please enter a valid zipcode."
    return (error(message,""))
  }
  //date of birth required
  if(birth==""){
    const message="Please input your date of birth!"
    return (error(message,""))
  }
  //validate date of birth
  if(!agevalid(birth)){
    const message="Sorry! Only individuals 18 years of age or older on the day of registration are allowed to register."
    return (error(message,""))
  }
  //password required
  if(password==""){
    const message="Please input your password!"
    return (error(message,""))
  }
  //password confirmation required
  if(pass_conf!=password){
    const message="Your password confirmation is not as same as your password!"
    return (error(message,""))
  }
  //register
  const dob=birth
  const username=acco_name
  return (dispatch)=>{
    resource('POST', 'register', { username, email, dob, zipcode, password, phone})
    .then((r) => {
      dispatch({type: Action.REGISTER, message: "Register successfully!!"})
    })
    .catch(r =>{ 
      dispatch(error("Failed to register",""))
    })
  }
}
//validate 18 years old
function agevalid(birth){
  const d = new Date()
  const now_Year=d.getFullYear()
  const now_Month=d.getMonth()+1
  const now_Date=d.getDate()
  birth=birth.split("-")
  const birth_Year=parseInt(birth[0])
  const birth_Month=parseInt(birth[1])
  const birth_Date=parseInt(birth[2])

  if(now_Year-birth_Year>18) return true
  if(now_Year-birth_Year<18) return false
  if(now_Month-birth_Month>0) return true
  if(now_Month-birth_Month<0) return false
  if(now_Date-birth_Date>=0) return true
  else return false
}

function setCookie(name,value){ //set cookies
  var exp = new Date()
  exp.setTime(exp.getTime() + 1*60*60*1000) //set expiration time
  document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() //set
}
