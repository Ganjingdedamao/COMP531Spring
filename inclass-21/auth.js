const cookieParser = require('cookie-parser') 
const md5=require('md5')
var myUser = {users: []}
var sessionUser=[]

var cookieKey = 'sid'
var session_id=0

function index(req,res){
	var a=req.headers.authorization
	if(!a || !isAuthorized(a)){
		res.header('WWW-Authenticate', 'Basic')
		res.status(401).send("Log in by entering username:password=rice:h00t")
	} else {
		res.send('authorized')
	}
}

function login(req,res){
	var username = req.body.username
	var password = req.body.password
	if(!username || !password){
		res.sendStatus(400)
		return
	}
	var userObj = getUser(username)
	if(!userObj ||!isAuthorized(req, userObj)){
		res.sendStatus(401)
		return
	}
	res.cookie(cookieKey, generateCode(userObj),{maxAge: 3600*1000,
		httpOnly: true})
	var msg={username: username, result:'success'}
	res.send(msg)
}

function isAuthorized(req, auth){
	return auth.hash === md5(auth.salt + req.body.password)
}
function isLoggedIn(req, res, next){
	var sid=req.cookies[cookieKey]
	if(!sid){
		return res.sendStatus(401)
	}
	var username = sessionUser[sid]
	if(username){
		req.username = username
		next()
	}
	else{
		res.sendStatus(401)
	}
}
function logout(req,res){
	var a=getUser(req.username)

	if(!a || a.hash!=req.cookies['hash']){
		res.header('WWW-Authenticate', 'Basic')
		res.status(401).send("Log out with out login")
	} else {
		res.send('Logged Out')
	}
}

function register(req, res){
	var username=req.body.username
	var password=req.body.password
	if(!username||!password){
		res.sendStatus(400)
		return
	}
	var salt = ""
    var generateSaltString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    for(var i=0; i < 5; i++ ){
        salt =salt+generateSaltString.charAt(Math.floor(Math.random()*generateSaltString.length))
    }
	
	var hash = md5(salt + password)
	myUser = {
		'users' :
		[
			...myUser.users,
			{username: username, salt: salt, hash: hash}
		]
	}
	res.send({users: [{username: username, salt: salt, hash: hash}]})
}
function getUser(username){
	var thisuser=myUser.users.filter(u=>{
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
	app.post('/login', login)
	app.post('/register', register)
}
