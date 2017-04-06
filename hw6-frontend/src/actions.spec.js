import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'
describe('Validate actions (these are functions that dispatch actions)', () => {
	let Action, actions,url, gotoMain, logOut, gotoProfile, localLogin, error, success, resource
	beforeEach(() => {
		if(mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
		}
		url = require('./actions').url
		gotoMain = require('./components/profile/profileAction').gotoMain
		logOut = require('./components/profile/profileAction').logOut
		gotoProfile = require('./components/main/followingAction').gotoProfile
		localLogin = require('./components/auth/authAction').localLogin
		error = require('./actions').error
		success =  require('./actions').success
		Action = require('./actions').default
		actions = require('./actions') 
		resource=require('./actions').resource
	})

	afterEach(() => {
		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
		}
	})

	it('resource should be a resource (i.e., mock a request)', (done)=> {
		mock(`${url}/sample`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
			json: {
				articles:[
					{
						"id": 0, 
						"text": "wanyi liu",
						"date": "2017-02-07",
						"img": "./image/card1.jpg",
						"comments": "",
						"author": "wl49"
					},
					{
						"id": 1, 
						"text": "test",
						"date": "2017-02-07",
						"img": "./image/card1.jpg",
						"comments": "",
						"author": "wanyi liu"
					}
				]
			}
		})
		resource('GET', 'sample').then((r) => {
			expect(r.articles).to.exist
			done()
		})
	})

	it('resource should give me the http error', (done)=> {
		resource('POST', 'error').catch((err) => {
			expect(err).to.exist
			done()
		})
	})

	it('resource should be POSTable', (done)=> {
		const username = 'wl49'
		const password = 'himself-february-listen'
		mock(`${url}/login`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json: {username, result: "success" }
		})
		resource('POST', 'login', {username, password }).then((r) => {
			expect(r).to.eql({username, result: "success"})
			done()
		})
	})

	it('should navigate (to main)', (done) => {
		const username="wl49"
		expect(gotoMain(username)).to.eql({type: Action.GOTOMAIN, username})
		done()
	})
	it('should navigate (logout to landing page)', (done) => {
		expect(logOut()).to.eql({type: Action.LOGOUT})
		done()
	})
	it('should navigate (to profile)', (done) => {
		const username="wl49"
		expect(gotoProfile(username)).to.eql({type: Action.GOTOPROFILE, username})
		done()
	})
	it('should update error message (for displaying error mesage to user)', (done) => {
		const message="test error"
		const sidebarMessage="test side error"
		expect(error(message,sidebarMessage)).to.eql({type: Action.ERROR, message, sidebarMessage})
		done()
	})
	it('should update success message (for displaying success message to user)', (done) => {
		const message="test error"
		const sidebarMessage="test side error"
		expect(success(message,sidebarMessage)).to.eql({type: Action.SUCCESS, message, sidebarMessage})
		done()
	})
})
