import Action, { resource, url, error, success} from '../../actions'
import { fetchOne, fetchArticles } from '../auth/authAction'
import { logOut } from '../profile/profileAction'
//goto profile
export function gotoProfile(username) {
  return ({type: Action.GOTOPROFILE, username})
}
// add new friend if friend name is not empty
export function addFollower(new_fri, followers,message){
  if(new_fri=="")
    return ({ type: 'default' })
  return (dispatch)=>{
    const oldfri=followers.filter((f) => {return f.name == new_fri})//check if already exist
    if(oldfri.length>0)
      return dispatch(error("", "Friend already exist"))
    resource('GET', 'headlines' + (new_fri ? '/' + new_fri : '')).//fetch new friend's info
    then((r) => {
      const headline=r.headlines[0].headline 
      resource('GET', 'avatars' + (new_fri ? '/' + new_fri : '')).
      then((r) => {
        const avatar=r.avatars[0].avatar    
        const follower={name: new_fri, headline: headline, img: avatar}

        resource('PUT', 'following' + (new_fri ? '/' + new_fri : ''))// put the new friend
        .then((r) => {
          dispatch({type: Action.FETCHFOLLOWERS, follower : follower})
          dispatch(fetchArticles())
        })
        .catch(r =>{ 
          dispatch(error("", "Failed to add follower"))
        })
      })
      .catch(r =>{ 
        dispatch(error("", "Failed to fetch user's avatar"))
      })
    })
    .catch(r =>{ 
      dispatch(error("", "This username does not exist"))
    })
  }
}
export function removeFollower(name){//remove friend
  return (dispatch)=>{	
    resource('DELETE', 'following'+ (name ? '/' + name : ''))
    .then((r) => {
      dispatch({type: Action.REMOVEFRIEND, name})
      dispatch(fetchArticles())
    })
    .catch(r =>{ 
      dispatch(error("", "Failed to delete friend"))
    })
  }
}
export function updateHeadline(headline){//change headline if new headline is not empty
  if(headline=="")
    return ({ type: 'default' })
  return (dispatch)=>{
    resource('PUT', 'headline', { headline })
    .then((r) => {
      dispatch({type: Action.UPDATEHEADLINE, headline : r.headline})
    })
    .catch(r =>{ 
      dispatch(error("", "Failed to update headline"))
    })
  }
}
