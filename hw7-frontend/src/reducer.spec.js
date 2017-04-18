import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'
import Reducer from './reducers'

describe('Validate reducer (no fetch requests here)', ()=> {
  const filterArticles=require('./components/main/filterArticle').filterArticles
  const Action = require('./actions').default
  const initialState = {
    username: '',
    location: 'LANDING_PAGE',
    friendId: 0,
    articles: [],
    followers: [],
    profile: [{"acco_name": "", "disp_name": "", "email": "", "phone": "713-560-1111", "zipcode": "", "birth": "", "password": "", "pass_conf": "", "img": "", "headline": ""}],//profile.profileinfo,
    visibilityFilter: 'SHOW_ALL',
    filterText: "",
    message: "",
    sidebarMessage: undefined
  }

  it('should return the initial state', ()=>{
    expect(Reducer(undefined, {})).to.eql(initialState)
  })

  it('should state error (for displaying error message to user)', ()=>{
    const message = 'error test'
    expect(Reducer(undefined, {type: Action.ERROR, message}))
    .to.eql({...initialState, message: message})
  }) 
  it('should state success (for displaying success message to user)', ()=>{
    const message = 'success test'
    expect(Reducer(undefined, {type: Action.SUCCESS, message}))
    .to.eql({...initialState, message: message})
  })    

  it('should set the articles',()=> {
    const article=[
      {
        "id": 0, 
        "text": "Vivamus laoreet. Nullam tincidunt adipiscing enim. Phasellus tempus. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Fusce neque. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Vivamus aliquet elit ac nisl. Fusce fermentum odio nec arcu. Vivamus euismod mauris. In ut quam vitae odio lacinia tincidunt. Praesent ut ligula non mi varius sagittis. Cras sagittis. Praesent ac sem eget est egestas volutpat. Vivamus consectetuer hendrerit lacus. Cras non dolor. Vivamus in erat ut urna cursus vestibulum. Fusce commodo aliquam arcu. Nam commodo suscipit quam. Quisque id odio. Praesent venenatis metus at tortor pulvinar varius.", 
        "date": "2017-02-07",
        "img": "./image/card1.jpg",
        "comments": "",
        "author": "Zhaokang Li"
      }
    ]
    expect(Reducer(undefined, {type: Action.ADDARTICLE, article}))
    .to.eql({...initialState, articles:[article, ...initialState.articles], message: "Add article successfully"})
  })

  it('should set the search keyword', ()=>{
    const filterText = 'keyword test'
    const filter='SHOW_TEXT'
    expect(Reducer(undefined, {type: Action.SEARCH, filter, filterText})).to.eql({...initialState, visibilityFilter:filter, filterText: filterText })
  })

  it('should filter displayed articles by the search keyword', ()=>{
    const articles=[
      {
        "id": 0, 
        "text": "wanyi liu",
        "date": "2017-02-07",
        "img": "./image/card1.jpg",
        "comments": "",
        "author": "wl49"
      },
      {
        "id": 0, 
        "text": "test",
        "date": "2017-02-07",
        "img": "./image/card1.jpg",
        "comments": "",
        "author": "wanyi liu"
      },
      {
        "id": 0, 
        "text": "test",
        "date": "2017-02-07",
        "img": "./image/card1.jpg",
        "comments": "",
        "author": "test"
      }
    ]
    const filter='SHOW_TEXT'
    const filterText='wanyi liu'
    expect(filterArticles(articles, filter, filterText)).to.eql([
        {
          "id": 0, 
          "text": "wanyi liu",
          "date": "2017-02-07",
          "img": "./image/card1.jpg",
          "comments": "",
          "author": "wl49"
        },
        {
          "id": 0, 
          "text": "test",
          "date": "2017-02-07",
          "img": "./image/card1.jpg",
          "comments": "",
          "author": "wanyi liu"
        }
      ])
    })
})