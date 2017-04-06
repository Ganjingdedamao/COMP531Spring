const cookieParser = require('cookie-parser') 
const md5=require('md5')
let myUser = {users: []}
let sessionUser=[]

let cookieKey = 'sid'
let session_id=0

const index = (req, res) => {
     res.send({ hello: 'world' })
}

function login(req,res){
	let username = req.body.username
	let password = req.body.password
	if(!username || !password){
		res.sendStatus(400)
		return
	}
	let userObj = getUser(username)
	if(!userObj ||!isAuthorized(req, userObj)){
		res.sendStatus(401)
		return
	}
	res.cookie(cookieKey, generateCode(userObj),{maxAge: 3600*1000,
		httpOnly: true})
	let msg={username: username, result:'success'}
	res.send(msg)
}

function isAuthorized(req, auth){
	return auth.hash === md5(auth.salt + req.body.password)
}
function isLoggedIn(req, res, next){
	let sid=req.cookies[cookieKey]
	if(!sid){
		return res.sendStatus(401)
	}
	let username = sessionUser[sid]
	if(username){
		req.username = username
		next()
	}
	else{
		res.sendStatus(401)
	}
}
function logout(req,res){
	res.send('OK')
}

function register(req, res){
	let username=req.body.username
	let password=req.body.password
	if(!username||!password){
		res.sendStatus(400)
		return
	}
	let salt = ""
    let generateSaltString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    for(let i=0; i < 5; i++ ){
        salt =salt+generateSaltString.charAt(Math.floor(Math.random()*generateSaltString.length))
    }
	
	let hash = md5(salt + password)
	myUser = {
		'users' :
		[
			...myUser.users,
			{username: username, salt: salt, hash: hash}
		]
	}
	let msg={username: username, result:'success'}
	res.send(msg)
}
function getUser(username){
	let thisuser=myUser.users.filter(u=>{
		return u.username===username
	})[0]
	return thisuser
}
function generateCode(userObj){
	session_id=session_id+1
	sessionUser[session_id]=userObj.username
	return session_id
}
module.exports = (app) => {
	app.use(cookieParser())
	app.get('/',index)
	app.put('/logout', logout)
	app.post('/login', login)
	app.post('/register', register)
}
