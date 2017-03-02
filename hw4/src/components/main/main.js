import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Nav from './nav'
import Headline from './headline'
import Following from './following'
import Article from '../article/article'

import NewArticle from '../article/newarticle'

import Favorite from './favorite'
import { filterArticles, actions, searchArticle } from './filterArticle'


const Main = ({profile, articles, followers, search}) => {
	
	let filtertext
	const _search=()=>{
		search(filtertext.value)
	}
	return (
		<div>
			<Nav/>
			<br/><br/><br/><br/>
			<div className="container">
		      <div className="row">
		        <div className="col-xs-4 col-sm-4 col-md-2 col-lg-2 blog-sidebar">
		          <Headline/>
		          <br/>
		          <Following/>
		        </div>
		        <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-md-offset-1 col-lg-offset-1 border_left">  
		          <div className="row">
		            <NewArticle/>
		          </div>
		          <hr/>
		          <div className="row" >
		            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
		              
		              <input type="text" placeholder="Search Rice Book" name="" className="form-control float_left width_90 margin_5" onChange={ _search } ref={(node) => filtertext = node }/>
		              
		            </div>
		          </div>
		          <br/>
		          <div className="row" >
		            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 margin_left_10">
		              <div className="row">
		              	{articles.map(({id, text, date, img, comments,author}) => (
		              		
		                  		<Article key={id} id={id} text={text} date={date} img={img} comments={comments} author={author}/>
		                	
            			))}
		                
		              </div>
		            </div>
		          </div>
		        </div>
		        <div className="col-xs-12 col-sm-12 col-lg-2 col-md-2 blog-sidebar">
		          <Favorite/>
		        </div>
		      </div>

		      <hr/>

		      <footer>
		        <p>&copy; Wanyi Liu 2016</p>
		      </footer>
		    </div> 


		</div>
    

    



		)
}

export default connect(
  (state) => {
        return {
             profile: state.profile[0] || {},

            articles: filterArticles(state.articles, state.visibilityFilter, state.filterText),
        
             //articles: state.articles || [],
             followers: state.followers || []

        }
    },
     (dispatch) => {
        return{
          search: (text) =>  dispatch(searchArticle(text))
        }
      }


  )(Main)