const Followers={username:'sep1', following:['wl49', 'wl49test']}

const getFollowing=(req,res)=>{
	res.send({
		username: req.params.user||'sep1',
		following: Followers.following
	})

}
const putFollowing=(req,res)=>{
	if (!Followers.following.includes(req.params.user)) {
		Followers.following = [
			...Followers.following,
			req.params.user
		]
	}
	res.send({
		username: 'sep1',
		following: Followers.following
	})
}
const deleteFollowing=(req,res)=>{
	Followers.following = Followers.following.filter((f) => f != req.params.user)
	res.send({
		username: 'sep1',
		following: Followers.following
	})
}
module.exports = (app) => {
	app.get('/following/:user?', getFollowing)
	app.put('/following/:user', putFollowing)
	app.delete('/following/:user', deleteFollowing)
}
