const articles = require('./data/articles.json')
const followers = require('./data/followers.json')
const profile = require('./data/profile.json')


const Reducer = (state =  {
	username: '',
	location: 'LANDING_PAGE',
	nextId: 9,
	friendId: 3,
	articles: articles.articleitems,
	followers: followers.followeritems,
	profile: profile.profileinfo,
	visibilityFilter: 'SHOW_ALL',
	filterText: "",
	message: "",
	background: "./image/back1.jpg"
	
}, action) => {
	
	switch(action.type) {
		case 'ERROR':
			return{
				...state,
				message: action.message
			}
		case 'LOGIN':
			return{
				...state,
				username: action.username,
				location: 'MAIN_PAGE',
				message: "",
				background: ""
				
			}
		case 'REGISTER':
			return{
				...state,
				username: action.disp_name,
				location: 'MAIN_PAGE',
				message: "",
				background: ""
				
			}
		case 'GOTOPROFILE':
			return{
				...state,
				location: 'PROFILE_PAGE',
				message: ""
				
			}
		case 'LOGOUT':
			return{
				location: 'LANDING_PAGE',
				nextId: 9,
				friendId: state.friendId,
				articles: articles.articleitems,
				followers: followers.followeritems,
				profile: profile.profileinfo,
				visibilityFilter: 'SHOW_ALL',
				filterText: "",
				message: "",
				background: "./image/back1.jpg"
			}
		case 'GOTOMAIN':
			return{
				...state,
				location: 'MAIN_PAGE',
				filterText: "",
				message: ""
			}
		case 'ADDARTICLE':
			return{
				...state,
				articles: [{id:state.nextId, text: action.text, date: action.date, img: "", comments: "", author: action.username}, ...state.articles],
				nextId: state.nextId+1,
				message: ""
			}
		case 'ADDFRIEND':
			return{
				...state,
				
				followers: [...state.followers, {id:state.friendId, name: action.new_fri, headline: action.headline, img: action.img}],
				friendId: state.friendId+1,
				message: ""
				
			}
		case 'REMOVEFRIEND':
			return{
				...state,
				
				followers: state.followers.filter((f) => {return f.id != action.id}),
				message: ""
				
			}
		case 'UPDATEHEADLINE':
			return{
				...state,
				
				profile: state.profile.map((pro)=> action.headline!=""?  {...pro, headline : action.headline} : pro),
				message: ""
				
			}
		case 'UPDATEPROFILE':
			return{
				...state,
				
				profile: action.newprofile.map((pro)=>pro),
				message: ""
				
			}
		
		case 'SEARCH':
			return{
				...state,
				visibilityFilter: action.filter,
				filterText: action.filterText,
				message: ""
			}
		
		default: 
			return state
	}
}

export default Reducer