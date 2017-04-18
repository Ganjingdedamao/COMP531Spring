import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import Reducer from '../../reducers'

describe('Validate authenticate actions', () => {
  const initialState = {
    username: '',
    location: 'LANDING_PAGE',
    friendId: 0,
    articles: [],
    followers: [],
    profile: [{"acco_name": "", "disp_name": "", "email": "", "phone": "713-560-1111", "zipcode": "", "birth": "", "password": "", "pass_conf": "", "img": "", "headline": ""}],//profile.profileinfo,
    visibilityFilter: 'SHOW_ALL',
    filterText: "",
    message: "Logout successfully!!",
    sidebarMessage: undefined,
  }
  let resource, url, authAction, localLogin, Action, actions 
  beforeEach(() => {
    if (mockery.enable) {
      mockery.enable({warnOnUnregistered: false, useCleanCache:true})
      mockery.registerMock('node-fetch', fetch)
      require('node-fetch')
    }
    url = require('../../actions').url
    authAction = require('./authAction')
    localLogin=require('./authAction').localLogin
    Action = require('../../actions').default
    actions = require('../../actions')
  })

  afterEach(() => {
    if (mockery.enable) {
      mockery.deregisterMock('node-fetch')
      mockery.disable()
    }
  }) 

  it('should not log in an invalid user', (done)=>{
    const username = 'wl49'
    const password = 'invalid'
    mock(`${url}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      status: 401,
      statusText: 'Unauthorized'
    })
    localLogin(username, password)(
      (action)=>{
        expect(action).to.eql({ type:Action.ERROR, message: 'Unauthorized login', sidebarMessage: ""})
        done()
      }
    )
  }) 

  it('should log in a user', (done)=>{
    const username = 'wl49'
    const password = 'himself-february-listen'
    mock(`${url}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      status: 200,
      json: {username, result:'success'}
    })
    localLogin(username, password)(
      (action)=>{
        expect(action.type).to.eql('LOGIN')
        expect(action.username).to.eql(username)
        expect(action).to.eql({ type:Action.LOGIN, username: username ,password: password})
        done()
      }
    )
  })

  it('should log out a user (state should be cleared)', ()=>{
    expect(Reducer(undefined, {type:'LOGOUT'})).to.eql(initialState)
  })  
})