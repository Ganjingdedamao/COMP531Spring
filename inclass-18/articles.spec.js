/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		fetch(url("/articles"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			expect(JSON.parse(body).length>=3).to.be.true
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should add two articles with successive article ids, and return the article each time', (done) => {
		// add a new article
		// verify you get the article back with an id
		// verify the content of the article
		// add a second article
		// verify the article id increases by one
		// verify the second artice has the correct content
		fetch(url("/article"), {
            method:'POST',
            headers:new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({text:'new article 1'})
        })
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()				
		})
		.then(body => {
			expect(JSON.parse(body).text).to.equal('new article 1')
			return JSON.parse(body).id
		})
		.then((id) => {
				fetch(url("/article"), {
		            method:'POST',
		            headers:new Headers({ 'Content-Type': 'application/json' }),
		            body: JSON.stringify({text:'new article 2'})
        		})
				.then(res => {
					expect(res.status).to.eql(200)	
					return res.text()				
				})	
				.then(body => {
					expect(JSON.parse(body).id).to.equal(id+1)
					expect(JSON.parse(body).text).to.equal('new article 2')
				})
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should return an article with a specified id', (done) => {
		// call GET /articles first to find an id, perhaps one at random
		// then call GET /articles/id with the chosen id
		// validate that only one article is returned
		fetch(url("/articles"))
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()				
		})
		.then(body => {
			
			fetch(url('/articles'+Math.floor(Math.random()*JSON.parse(body).length)+1))
			.then(res => {
				expect(res.status).to.eql(200)
				return res.text()
			})
			.then(body => {
				expect(JSON.parse(body).length==1).to.be.true
			})
		})
		.then(done)
		.catch(done)
	}, 200)

	it('should return nothing for an invalid id', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results
		fetch(url('/articles/0'))
		.then(res => {
			expect(res.status).to.eql(200)
			return res.text()
		})
		.then(body => {
			expect(JSON.parse(body).length==0).to.be.true
		})
		.then(done)
		.catch(done)
	}, 200)

});