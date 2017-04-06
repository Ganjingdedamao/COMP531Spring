import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import  ArticleView  from './articleView'
import { shallow } from 'enzyme'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import Reducer from '../../reducers'
import thunkMiddleware from 'redux-thunk'

describe('ArticlesView (component tests)', () => {
  let Action, actions,url, addArticle
  beforeEach(() => {
    if (mockery.enable) {
      mockery.enable({warnOnUnregistered: false, useCleanCache:true})
      mockery.registerMock('node-fetch', fetch)
      require('node-fetch')
    }
    url = require('../../actions').url
    addArticle=require('./articleActions').addArticle
    Action = require('../../actions').default
    actions = require('../../actions')
  })

  afterEach(() => {
    if (mockery.enable) {
      mockery.deregisterMock('node-fetch')
      mockery.disable()
    }
  })

  it('should dispatch actions to create a new article', (done) => { 
    const newarticle=[{
      "id": 0, 
      "text": "test addArticle", 
      "date": "2017-02-07",
      "img": "./image/card1.jpg",
      "comments": "",
      "author": "wll49"
    }]
    mock(`${url}/article`,{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      json: { articles: newarticle}
    })
    addArticle('wl49','test addArticle')(
      (action)=>{
        expect(action).to.eql({ type: Action.ADDARTICLE, article: newarticle[0]})
        done()
      }
    )

  })

  it('should render articles', () => {
    const articles =[
      {
        "_id": 0, 
        "text": "test",
        "date": "2017-02-07",
        "img": "./image/card1.jpg",
        "comments": "",
        "author": "wl49"
      },
      {
        "_id": 1, 
        "text": "test",
        "date": "2017-02-07",
        "img": "./image/card1.jpg",
        "comments": "",
        "author": "wl49"
      }
    ]
    const logger = createLogger()
    const store = createStore(Reducer, applyMiddleware(logger, thunkMiddleware))
    return (dispatch)=>{
      dispatch({type: Action.FETCHARTICLES, articles: render})
      const node = shallow(<ArticleView  store={store}/>)
      expect(node.find('div').find('div').children().length).to.equal(2)
    }
  })
})
