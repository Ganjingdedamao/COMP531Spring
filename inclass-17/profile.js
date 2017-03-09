

var my_headline = 'A Happy COMP531 Student'
var my_email = 'wl49@rice.edu'
var my_zipcode = '77030'
var my_avatar= 'Wanyi.jpg'
const index = (req, res) => {
     res.send({ hello: 'world' })
}

const getHeadlines = (req, res) => {
	res.send({ headlines: [{
		username: req.params.user,
		headline: my_headline
	}]})
}

const putHeadline = (req, res) => {
	//console.log('Payload received', req.body)
	res.send({ headlines: [{
		username: 'wl49',
		headline: req.body.headline ||'You did not supply it'
	}]})
}

const getEmail = (req, res) => {
	res.send({ emails: [{
		username: req.params.user,
		email: my_email
	}]})		
}

const putEmail = (req, res) => {
	res.send({ emails: [{
		username: 'wl49',
		email: req.body.email ||'You did not supply it'
	}]})	
}

const getZipcode = (req, res) => {
	res.send({ zipcodes: [{
		username: req.params.user,
		zipcode: my_zipcode
	}]})		
}

const putZipcode = (req, res) => {
	res.send({ zipcodes: [{
		username: 'wl49',
		zipcode: req.body.zipcode ||'You did not supply it'
	}]})	
}

const getAvatars = (req, res) => {
	res.send({ avatars: [{
		username: req.params.user,
		avatar: my_avatar
	}]})		
}

const putAvatar = (req, res) => {
	res.send({ avatars: [{
		username: 'wl49',
		avatar: req.body.avatar ||'You did not supply it'
	}]})	
}

module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:user?', getHeadlines)
     app.put('/headline', putHeadline)
     app.get('/email/:user?', getEmail)
     app.put('/email', putEmail)
     app.get('/zipcode/:user?', getZipcode)
     app.put('/zipcode', putZipcode)
     app.get('/avatars/:user?', getAvatars)
     app.put('/avatar', putAvatar)
}