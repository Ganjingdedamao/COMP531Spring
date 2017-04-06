import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, sendKeys } from './selenium'
import common from './common'

describe('Test Landing Page (regsiter)', () => {
	it('should register new user', (done) => {
	        sleep(2000)
	        .then(common.register())
	        .then(findId('message').getText()
	            .then(text => {
	                expect(text).to.equal('Register successfully!!')
	            })
	            .then(done))
	    })
})