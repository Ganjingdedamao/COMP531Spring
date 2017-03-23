import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

describe('Validate Article actions', () => {
  let Action, actions,url, fetchArticles,searchArticle
  beforeEach(() => {
    if (mockery.enable) {
      mockery.enable({warnOnUnregistered: false, useCleanCache:true})
      mockery.registerMock('node-fetch', fetch)
      require('node-fetch')
    }
    url = require('../../actions').url
    fetchArticles = require('../auth/authAction').fetchArticles
    Action = require('../../actions').default
    actions = require('../../actions')
    searchArticle = require('../main/filterArticle').searchArticle
  })

  afterEach(() => {
    if (mockery.enable) {
      mockery.deregisterMock('node-fetch')
      mockery.disable()
    }
  })

  it('should fetch articles (mocked request)', (done) => {
    const fetchAtls=[{
      "id": 0, 
      "text": "test",
      "date": "2017-02-07",
      "img": "./image/card1.jpg",
      "comments": "",
      "author": "wl49"
    }]
    mock(`${url}/articles`,{
      method:'GET',
      headers: {'Content-Type':'application/json'},
      json: { articles: fetchAtls}
    })
    fetchArticles()(
      (action)=>{
      expect(action).to.eql({ type:Action.FETCHARTICLES, articles: fetchAtls })
      done()
    })
  })

  it('should update the search keyword', (done) => {
    const filterText='test update keyword'
    expect(searchArticle(filterText)).to.eql({ type: Action.SEARCH, filter:'SHOW_TEXT', filterText})
    done()
  }) 
})

