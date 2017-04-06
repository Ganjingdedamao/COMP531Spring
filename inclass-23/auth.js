var request=require('request')
var qs=require('querystring')
var express=require('express')
var cookieParser=require('cookie-parser')
var session=require('express-session')
var passport=require('passport')
const bodyParser = require('body-parser')
var FacebookStrategy=require('passport-facebook').Strategy
const md5=require('md5')

let users=[]

let myUser = {users: []}
let sessionUser=[]

let cookieKey = 'sid'
let session_id=0

const config={
    clientID: '814687735350697',
    clientSecret: 'ed2bb8161a64f64b09086ea12df99c49',
    callbackURL: 'http://localhost:3000/auth/callback'
  }
function index (req, res) {
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

function logOut(req,res){
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

passport.use(new FacebookStrategy(config,
	function(token,refreshToken,profile,done){
		process.nextTick(function(){
			return done(null,profile)
		})
	}))

passport.serializeUser(function(user, done) {
	users[user.id] = user
	done(null, user.id)
})
passport.deserializeUser(function(id, done) {
	var user = users[id]
	done(null, user)
})

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		next()
	} else {
		res.redirect('/auth/facebook')
	}
}

function profile(req, res) {
	res.send({'ok now what?': req.user})
}

function fail(req,res){
	res.send('Failed')
}

function logout(req, res) {
	req.logout()
	res.redirect('/')
}

module.exports = app=>{
	app.use(session({secret:'thissMySecretMessageHowWillYouGuessIt'}))
	app.use(passport.initialize());
	app.use(passport.session())
	app.use(cookieParser())
	app.use('/auth/facebook', passport.authenticate('facebook',{scope:'email'}))
	app.use('/auth/callback',passport.authenticate('facebook',{
		 	successRedirect:'/profile',failureRedirect:'/fail'
		 }))
	app.use('/profile',isLoggedIn,profile)
	app.use('/fail',fail)
	app.use('/logout',logout)

	app.get('/',index)
	app.put('/logout', logOut)
	app.post('/login', login)
	app.post('/register', register)
}