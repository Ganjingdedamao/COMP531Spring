import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

describe('Validate Profile actions (mocked requests)', () => {
  let Action, actions, fetchProfile, updateHeadline, url
  beforeEach(() => {
    if (mockery.enable) {
      mockery.enable({warnOnUnregistered: false, useCleanCache:true})
      mockery.registerMock('node-fetch', fetch)
      require('node-fetch')
    }
    url = require('../../actions').url
    fetchProfile=require('../auth/authAction').fetchProfile
    updateHeadline=require('../main/followingAction').updateHeadline
    Action = require('../../actions').default
    actions = require('../../actions')
  })

afterEach(() => {
  if (mockery.enable) {
    mockery.deregisterMock('node-fetch')
    mockery.disable()
  }
})

  it('should fetch the user proile information', (done) => {

    const avatar = 'Wanyi.jpg'
    const zipcode = '77030'
    const email = 'wanyi.liu@rice.edu'
    const dobStr = 'SAT 12 25 1993'
    const headline ='hello'
    mock(`${url}/avatars`, {
      method: 'GET',
      headers: {'Content-Type':'application/json'},
      json: { avatars : [{avatar}] }
    })
    mock(`${url}/zipcode`, {
      method: 'GET',
      headers: {'Content-Type':'application/json'},
      json: { zipcode }
    })  
    mock(`${url}/email`, {
      method: 'GET',
      headers: {'Content-Type':'application/json'},
      json: { email }
    })
    mock(`${url}/dob`, {
      method: 'GET',
      headers: {'Content-Type':'application/json'},
      json: { dob: dobStr }
    })
    mock(`${url}/headlines`, {
      method: 'GET',
      headers: {'Content-Type':'application/json'},
      json: { headlines : [{headline}] }
    })

    const dob= new Date(dobStr).toDateString()
    var count = 0
    fetchProfile()(
      fn => fn(action => {
        if (count==0){
          expect(action).to.eql({avatar, type: Action.FETCHPROFILE})
          count++                 
        }
        else if (count==1){
          expect(action).to.eql({zipcode, type: Action.FETCHPROFILE})
          count++
        }
        else if (count==2){
          expect(action).to.eql({email, type: Action.FETCHPROFILE})
          count++ 
        }
        else if (count==3){
          expect(action).to.eql({dob, type: Action.FETCHPROFILE})
          count++   
        }
        else if (count==4){
          expect(action).to.eql({headline, type: Action.FETCHPROFILE})
          done()
        }
      }
    ))
  })

  it('should update the headline', (done) => {   
    const newheadline='Wanyi Liu'
    mock(`${url}/headline`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      json: {
        username: 'wl49',
        headline: newheadline
      }
    })
    updateHeadline(newheadline)(
      (action) => {
        expect(action).to.eql({ headline:newheadline , type:'UPDATEHEADLINE'})
        done()
      }
    )
  })
})