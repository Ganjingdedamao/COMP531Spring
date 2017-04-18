import Promise from 'bluebird'
import fetch from 'isomorphic-fetch'

export const url = 'https://wanyibookserver.herokuapp.com'

const Action = {
  ADDARTICLE: 'ADDARTICLE',
  REGISTER: 'REGISTER',
  REMOVEFRIEND: 'REMOVEFRIEND',
  SEARCH: 'SEARCH',
  UPDATEHEADLINE: 'UPDATEHEADLINE',
  UPDATEPROFILE: 'UPDATEPROFILE',
  ADDFRIEND: 'ADDFRIEND',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  GOTOPROFILE: 'GOTOPROFILE',
  GOTOMAIN: 'GOTOMAIN',
  LOGOUT: 'LOGOUT',
  LOGIN: 'LOGIN',
  FETCHARTICLES: 'FETCHARTICLES',
  FETCHFOLLOWERS: 'FETCHFOLLOWERS',
  FETCHPROFILE: 'FETCHPROFILE',
  EDITARTICLES: 'EDITARTICLES'
}
export default Action

export function error(mes, sideMes){
  return {type: Action.ERROR, message: mes, sidebarMessage: sideMes}
}
export function success(mes, sideMes){
  return {type: Action.SUCCESS, message: mes, sidebarMessage: sideMes}
}
export const resource = (method, endpoint, payload, json=true) => {
  const sid=getCookie('sid')
  const options = {
    method,
    credentials: 'include',
    cookies: ['sid':sid]
  }
  if(json) {
    options.headers={
      'Content-Type': 'application/json'
    }
  }
  if (payload) {
    options.body = json?JSON.stringify(payload): payload
  }
  return fetch(`${url}/${endpoint}`, options)
  .then(r => {
    if (r.status === 200) {
      if (r.headers.get('Content-Type').indexOf('json') > 0) {
        return r.json()
      } 
      else {
        return r.text()
      }
    } 
    else {
      throw new Error(r.statusText)
    }
  })
}
function getCookie(name){ //get cookies
  var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)")) //match
  if(arr != null)
    return unescape(arr[2])
  return null
}