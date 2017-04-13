const uploadImage = require('./uploadCloudinary')
let email = 'wl49@rice.edu'
let zipcode = '77030'
let avatar= 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/DWLeebron.jpg/220px-DWLeebron.jpg'
let dob = new Date()

let headlines = {
		'wl49':'A Happy COMP531 Student',
		'sep1':'another Happy COMP531 Student',
		'wl49test':'one more Happy COMP531 Student'
	}
const getHeadlines = (req, res) => {
	if(!req.params.user){
		res.send({
			headlines:[
			{username: 'sep1', headline: headlines['sep1']}
			]
		})
		return
	}
	const users=req.params.user.split(",")
	const getheadlines=users.map((u)=> headlines[u]?  {username: u, headline : headlines[u]} : {username:u, headline: 'Your default headline'})
	res.send({ 'headlines': getheadlines})
}

const putHeadline = (req, res) => {
	headlines['sep1']=req.body.headline || headlines['sep1']
	res.send({ 
		username: 'sep1',
		headline: req.body.headline ||'You did not supply it'
	})
}

const getEmail = (req, res) => {
	res.send({ 
		username: req.params.user || 'sep1',
		email: email
	})		
}

const putEmail = (req, res) => {
	email=req.body.email || email
	res.send({ 
		username: 'sep1',
		email: req.body.email ||'You did not supply it'
	})	
}

const getZipcode = (req, res) => {
	res.send({ 
		username: req.params.user || 'sep1',
		zipcode: zipcode
	})		
}

const putZipcode = (req, res) => {
	zipcode=req.body.zipcode || zipcode
	res.send({ 
		username: 'sep1',
		zipcode: req.body.zipcode ||'You did not supply it'
	})	
}

const getAvatars = (req, res) => {
	res.send({ avatars: [{
		username: req.params.user || 'sep1',
		avatar: avatar
	}]})		
}
const putAvatar = (req, res) => {
	if (req.fileurl != null && req.fileurl != "") {
		avatar = req.fileurl
	}
	res.send({ 
		username: 'sep1', 
		avatar: req.fileurl || 'you did not supply it' 
	})
}

// const putAvatar = (req, res) => {
// 	avatar=req.body.avatar || avatar
// 	res.send({ 
// 		username: 'sep1',
// 		avatar: req.body.avatar ||'You did not supply it'
// 	})	
// }
const getDob = (req, res) => {
	res.send({ 
		username: req.params.user || 'sep1',
		dob: dob
	})
}

const putPassword = (req, res) => {
	res.send({ 
		username: 'sep1',
		status: 'will not change'
	})	
}
module.exports = app => {     
     app.get('/headlines/:user?', getHeadlines)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:user?', getAvatars)
     app.put('/avatar', uploadImage('avatar'), putAvatar)
     app.get('/dob', getDob)
     app.put('/password', putPassword)
}