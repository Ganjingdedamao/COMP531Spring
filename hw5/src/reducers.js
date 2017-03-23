import Action from './actions'

const Reducer = (state =  {
	username: '',
	location: 'LANDING_PAGE',
	friendId: 0,
	articles: [],
	followers: [],
	profile: [{"acco_name": "", "disp_name": "", "email": "", "phone": "713-560-1111", "zipcode": "", "birth": "", "password": "", "pass_conf": "", "img": "", "headline": ""}],//profile.profileinfo,
	visibilityFilter: 'SHOW_ALL',
	filterText: "",
	message: "",
	sidebarMessage: undefined,
	}, action) => {
		switch(action.type) {
			case Action.ERROR:
				return{
					...state,
					message: action.message,
					sidebarMessage: action.sidebarMessage
				}
			case Action.SUCCESS:
				return{
					...state,
					message: action.message,
					sidebarMessage: action.sidebarMessage
				}
			case Action.LOGIN:
				return{
					...state,
					username: action.username,
					profile: [{
					...state.profile[0],
					acco_name: action.username,
					disp_name: action.username
					}],
					location: 'MAIN_PAGE',
					message: ""
				}
			case Action.FETCHARTICLES:
				return{
					...state,
					articles: action.articles
				}
			case Action.FETCHFOLLOWERS: 
				return{
					...state,
					followers: [...state.followers, { id: state.friendId, ...action.follower} ],
					friendId: state.friendId+1,
					message: "",
					sidebarMessage: ""
				}
			case Action.FETCHPROFILE:
				if (action.headline){
					return{
						...state,
						profile: [{
						...state.profile[0],
						headline: action.headline
						}] 
					}
				}
				if(action.email){
					return{
						...state,
						profile: [{
						...state.profile[0],
						email: action.email
						}]
					}
				}
				if(action.zipcode){
					return{
						...state,
						profile: [{
						...state.profile[0],
						zipcode: action.zipcode
						}]
					}
				}
				if(action.avatar){
					return{
						...state,
						profile: [{
						...state.profile[0],
						img: action.avatar
						}]
					}
				}
				if(action.dob){
					return{
						...state,
						profile: [{
						...state.profile[0],
						birth: action.dob
						}]
					}
				}
				return state
			case Action.REGISTER:
				return{
					...state,
					message: action.message
				}
			case Action.GOTOPROFILE:
				return{
					...state,
					location: 'PROFILE_PAGE',
					message: ""
				}
			case Action.LOGOUT:
				return{
					username: '',
					location: 'LANDING_PAGE',
					friendId: 0,
					articles: [],
					followers: [],
					profile: [{"acco_name": "", "disp_name": "", "email": "", "phone": "713-560-1111", "zipcode": "", "birth": "", "password": "", "pass_conf": "", "img": "", "headline": ""}],//profile.profileinfo,
					visibilityFilter: 'SHOW_ALL',
					filterText: "",
					message: "",
					sidebarMessage: undefined
				}
			case Action.GOTOMAIN:
				return{
					...state,
					location: 'MAIN_PAGE',
					filterText: "",
					message: ""
				}
			case Action.ADDARTICLE:
				return{
					...state,
					articles:  [action.article, ...state.articles],
					message: "Add article successfully"
				}
			case Action.ADDFRIEND:
				return{
					...state,
					followers: [...state.followers, {id:state.friendId, name: action.new_fri, headline: action.headline, img: action.img}],
					friendId: state.friendId+1,
					sidebarMessage: "Add friend successfully"
				}
			case Action.REMOVEFRIEND:
				return{
					...state,
					followers: state.followers.filter((f) => {return f.name != action.name}),
					sidebarMessage: "Remove friend successfully"
				}
			case Action.UPDATEHEADLINE:
				return{
					...state,
					profile: state.profile.map((pro)=> action.headline!=""?  {...pro, headline : action.headline} : pro),
					sidebarMessage: "Update headline successfully"
				}
			case Action.UPDATEPROFILE:
				return{
					...state,
					profile: [{
					...state.profile[0],
						disp_name: action.disp_name? action.disp_name: state.profile[0].disp_name,
						acco_name: action.acco_name? action.acco_name: state.profile[0].acco_name,
						email: action.email? action.email: state.profile[0].email,
						phone: action.phone? action.phone: state.profile[0].phone,
						zipcode: action.zipcode? action.zipcode: state.profile[0].zipcode,
						password: action.password? action.password: state.profile[0].password
					}],
					message: action.message
				}
			case Action.SEARCH:
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