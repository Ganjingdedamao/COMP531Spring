import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test Profile Page', () => {
    const preamble = 'wl49test'
    before('should log in', (done) => {
        go().then(common.login).then(done)
        .then(sleep(500))
        .then(findId('gotoProfile').click())
    })

    it("Update user email and verify", (done) => {
        sleep(2000)
        .then(findId('email').clear())
        .then(findId('email').sendKeys('wwww@22.test'))
        .then(findId('updatePro').click())
        .then(sleep(2000))
        .then(findId('email_show').getText()
            .then(text => {
                expect(text).to.equal('wwww@22.test')
            })
            .then(findId('message').getText()
                .then(t=>{
                    expect(t).to.equal('Update email successfully!')
                })
                .then(done)
            )
        )  
        
    })
    it("Update user zipcode and verify", (done) => {
        sleep(500)
        .then(findId('zipcode').clear())
        .then(findId('zipcode').sendKeys('77777'))
        .then(findId('updatePro').click())
        .then(sleep(500))
        .then(findId('zip_show').getText()
            .then(text => {
                expect(text).to.equal('77777')
            })
            .then(findId('message').getText()
                .then(t=>{
                    expect(t).to.equal('Update zipcode successfully!')
                })
                .then(done)
            )
        )  
    })
    it("Update user password and verify", (done) => {
        sleep(500)
        .then(findId('password').clear())
        .then(findId('pass_conf').clear())
        .then(findId('password').sendKeys('333333'))
        .then(findId('pass_conf').sendKeys('333333'))
        .then(findId('updatePro').click())
        .then(sleep(500))
        .then(findId('message').getText()
            .then(text => {
                expect(text).to.equal('Update password successfully, but the change will not be persistent.')
            })
            .then(done))
    })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})
