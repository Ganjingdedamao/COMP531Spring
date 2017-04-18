import { expect } from 'chai'
import { findId, sleep } from './selenium'

exports.creds = {
    username: 'wl49test',
    password: 'mouth-wrote-daily'
}
exports.registerInfo ={
    acco_name: 'wanyi',
    disp_name: 'wanyi',
    email: 'aa@b.c',
    phone: '713-560-2222',
    zipcode: '99999',
    dob: '001998/11/13',
    password: '1',
    passconf: '1'
}

exports.login = () =>
    sleep(500)
        .then(findId('log_username').clear())
        .then(findId('log_password').clear())
        .then(findId('log_username').sendKeys(exports.creds.username))
        .then(findId('log_password').sendKeys(exports.creds.password))
        .then(findId('login').click())
        .then(sleep(2000))

exports.logout = () =>    
    sleep(500)
        .then(findId('logout').click())
        .then(sleep(500))
        .then(findId('message').getText()
            .then(text => {expect(text).to.equal('Logout successfully!!')})
        )
    
exports.register = () =>
    sleep(500)
        .then(findId('acco_name').clear())
        .then(findId('disp_name').clear())
        .then(findId('email').clear())
        .then(findId('phone').clear())
        //.then(findId('birth').clear())
        .then(findId('zipcode').clear())
        .then(findId('password').clear())
        .then(findId('pass_conf').clear())
        .then(findId('acco_name').sendKeys(exports.registerInfo.acco_name))
        .then(findId('disp_name').sendKeys(exports.registerInfo.disp_name))
        .then(findId('email').sendKeys(exports.registerInfo.email))
        .then(findId('phone').sendKeys(exports.registerInfo.phone))
        .then(findId('birth').sendKeys(exports.registerInfo.dob))
        .then(findId('zipcode').sendKeys(exports.registerInfo.zipcode))
        .then(findId('password').sendKeys(exports.registerInfo.password))
        .then(findId('pass_conf').sendKeys(exports.registerInfo.passconf))
        .then(findId('register').click())
        .then(sleep(2000))
exports.postArt = () =>
    sleep(500)
        .then(findId('article').clear())
        .then(findId('article').sendKeys('test new article'))
        .then(findId('postArt').click())
        .then(sleep(2000))
