import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, driver } from './selenium'
import common from './common'

describe('Test Main Page (articles)', () => {
    const preamble = 'wl49test'
    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('Create new article and validate article appears in feed', (done) => {
        sleep(2000)
            .then(common.postArt())
            .then(sleep(2000))
            .then(findId('article_text').getText()
                .then(text => {
                    expect(text.indexOf('test new article')).to.equal(0)
                })
                .then(done))
    })
    it('Edit an article and validate changed article text', (done) => {
        sleep(2000)
            .then(findId('article_text').clear())
            .then(findId('article_text').sendKeys('test edit article'))
            .then(findId('edit').click())
            .then(sleep(2000))
            .then(findId('article_text').getText()
                .then(text => {
                    expect(text.indexOf('test edit article')).to.equal(0)
                })
                .then(done))
    })
    it('Search for special &quot;Only One Article Like This&quot; article and verify author', (done) => {
        sleep(3000)
            .then(findId('article_text').clear())
            .then(findId('article_text').sendKeys('test sssssssssssssssearch article'))
            .then(findId('edit').click())
            .then(sleep(2000))
            .then(findId('searchInput').clear())
            .then(findId('searchInput').sendKeys('test sssssssssssssssearch article'))
            .then(sleep(2000))
            .then(
                findId('article_text').getText()
                .then(text => {
                    expect(text.indexOf('test sssssssssssssssearch article')).to.equal(0)
                })
                .then(
                    findId('authorArt').getText()
                    .then(t=>{
                        expect(t.indexOf(preamble)).to.equal(0)
                    })
                )
                .then(
                    driver.findElements(By.css('[class="article"]'))
                    .then(a=>{
                        expect(a.length).to.equal(1)
                    })
                )
                .then(done)
            )     
    })

    after('should log out', (done) => {
        common.logout().then(done)
    })
})
