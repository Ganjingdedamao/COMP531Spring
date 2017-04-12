var redis = require('redis').createClient('redis://h:p98cb2c88d097f939d85d30104142344b15992db15c90fbc65ddb2d3dd3e8f0d7@ec2-34-206-56-163.compute-1.amazonaws.com:28009')

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
	const sid=md5(username)
	redis.hmset(sid, {username})
	res.cookie(cookieKey, sid,{maxAge: 3600*1000,
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
	else{
		redis.hgetall(sid, function(err, userObj){
			console.log(sid+' map tp '+userObj)
			if(userObj){
				req.username=userObj.name
				next()
			}else{
				return res.status(401).send('this user session does not exist')
			}
		})
	}
}
function logout(req,res){
	const sid=req.cookies[cookieKey]
	redis.del(sid)
	res.status(200).send('OK')
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
// function generateCode(userObj){
// 	session_id=session_id+1
// 	sessionUser[session_id]=userObj.username
// 	return session_id
// }
module.exports = (app) => {
	app.use(cookieParser())
	app.get('/',index)
	app.put('/logout', isLoggedIn, logout)
	app.post('/login', login)
	app.post('/register', register)
}
