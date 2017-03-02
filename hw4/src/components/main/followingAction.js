export function gotoProfile(username) {//goto profile
	return ({type: 'GOTOPROFILE', username})
}
export function logOut() {// logout
	return ({type: 'LOGOUT'})
}
export function addFollower(new_fri){// add new friend if friend name is not empty
	let headline="new firend of mine"
	let img="./image/user3.jpg"
	if(new_fri=="")
		return ({ type: 'default' })
	
	return ({ type: 'ADDFRIEND', new_fri, headline, img})
}
export function removeFollower(id){//remove friend
	return ({ type: 'REMOVEFRIEND', id})
}
export function updateHeadline(headline){// change headline if new headline is not empty
	if(headline=="")
		return ({ type: 'default' })
	
	return ({ type: 'UPDATEHEADLINE', headline})
}
