import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Main (headline and follower) Page', () => {
    const preamble = 'wl49test'
    let num_friends
    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it("Update the headline and verify the change", (done) => {
        sleep(2000)
        .then(findId('newHeadline').clear())
        .then(findId('newHeadline').sendKeys('test my new headline'))
        .then(findId('updateHeadline').click())
        .then(sleep(2000))
        .then(findId('headline').getText()
            .then(text => {
                expect(text).to.equal('test my new headline')
            })
            .then(done))
        .then(sleep(2000))
        .then(findId('newHeadline').clear())
        .then(findId('newHeadline').sendKeys('newnew headline'))
        .then(findId('updateHeadline').click())
        .then(sleep(2000))
        .then(findId('headline').getText()
            .then(text => {
                expect(text).to.equal('newnew headline')
            }))
    })
    it('should Remove the Follower user and verify following count decreases by one', (done) => {
        sleep(2000)
        .then(findId('num_friends').getText()
            .then(text => {
                num_friends = parseInt(text)
            }))
        .then(findId('removeBtn').click())
        .then(sleep(2000))
        .then(findId('num_friends').getText()
            .then(text => {
                expect(parseInt(text)).to.equal(num_friends-1)
            })
            .then(done))
    })
    it('should Add the Follower user and verify following count increases by one', (done) => {
        sleep(2000)
        .then(findId('num_friends').getText()
            .then(text => {
                num_friends = parseInt(text)
            }))
        .then(findId('addFollower').clear())
        .then(findId('addFollower').sendKeys('test'))
        .then(findId('addBtn').click())
        .then(sleep(2000))
        .then(findId('num_friends').getText()
            .then(text => {
                expect(parseInt(text)).to.equal(num_friends+1)
            })
            .then(done))
    })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})
