import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Article from './article'
import { filterArticles } from '../main/filterArticle'

const ArticleView =({articles})=> {
  return (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 margin_left_10">
      <div className="row">
        {articles.map(({_id, text, date, img, comments,author}) => (
          <Article key={_id} _id={_id} text={text} date={date} img={img} comments={comments} author={author}/>
        ))}
      </div>
    </div>
  )
}
export default connect(
  (state) => {
    return {
      articles: filterArticles(state.articles, state.visibilityFilter, state.filterText)
    }
  }
)(ArticleView)
