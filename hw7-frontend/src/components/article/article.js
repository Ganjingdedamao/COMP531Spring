import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Comment from './comment'
import {addCom, editArt} from './articleActions'
var ContentEditable = require("react-contenteditable")

const Article =({username, _id, text, date, img, comments,author, addComment, editArticle})=> {
  let newArticle, newComment
  const _addComment=()=>{
    if(newComment.value!=''){
      addComment(newComment.value, _id)
      newComment.value=''
    }
  }
  const _editArticle=()=>{
    if(newArticle&&newArticle!=''){
      editArticle(newArticle, _id)
    }
  }
  return img!=null?
  (
    <div className="col-xs-12 col-lg-12  col-sm-12 col-md-12 margin_5 border border_round" >
      <article className="article">
        <div className="col-xs-3 col-lg-3 col-sm-3 col-md-3" >
          <div className="thumbnail margin_top_10" >
            <img data-src="holder.js/100%x180" className="img-responsive" src={img} alt="..."/>
          </div>
        </div>
        <div className="col-xs-9 col-lg-9 col-sm-9 col-md-9" >
          <h4 id="authorArt">{author}</h4>
          <ContentEditable id="article_text" className="card-user-content" html={text}  disabled={username !== author} onChange={ (e) => {newArticle = e.target.value} } />
          <h6 className="float_left"><span className="glyphicon glyphicon-copyright-mark"></span>{date}</h6>
          <a id="edit" className="btn btn-default float_right margin_5" onClick={_editArticle} role="button">Submit Edit <span className="glyphicon glyphicon-pencil"></span></a>
          <a className="btn btn-default float_right margin_5" onClick={_addComment} role="button">Submit Comment <span className="glyphicon glyphicon-comment"></span></a> 
        </div>
        <div>
          <input type="text" placeholder="comment" className="form-control " ref={ (node) => newComment = node }/>
        </div>
        <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12 commentdiv">
          <ol className="list-unstyled">
            {comments.map(({author, commentId, date, text}) => (   
              <Comment key={commentId} id={commentId} author={author} date={date} text={text} artId={_id}/>   
            ))}
          </ol>
        </div>
      </article>
    </div>
  ):
  (
    <div className="col-xs-12 col-lg-12  col-sm-12 col-md-12 margin_5 border border_round" >
      <article className="article">
        <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12" >
          <h4 id="authorArt">{author}</h4>
          <ContentEditable id="article_text" className="card-user-content" html={text}  disabled={username !== author} onChange={ (e) => {newArticle = e.target.value} } />
          <h6 className="float_left"><span className="glyphicon glyphicon-copyright-mark"></span>{date}</h6>
          <a id="edit" className="btn btn-default float_right margin_5" onClick={_editArticle} role="button">Submit Edit <span className="glyphicon glyphicon-pencil"></span></a>
          <a className="btn btn-default float_right margin_5" onClick={_addComment} role="button">Submit Comment <span className="glyphicon glyphicon-comment"></span></a> 
        </div>
        <div>
          <input type="text" placeholder="comment" className="form-control " ref={ (node) => newComment = node }/>
        </div>
        <div className="col-xs-12 col-lg-12 col-sm-12 col-md-12 commentdiv">
          <ol className="list-unstyled">
            {comments.map(({author, commentId, date, text}) => (   
              <Comment key={commentId} id={commentId} author={author} date={date} text={text} artId={_id}/>   
            ))}
          </ol>
        </div>
      </article>
    </div>
  )
}
export default connect(
  (state) => {
    return {
      username: state.username || ''
    }
  },
  (dispatch) => {
    return{
      addComment: (comment, id) =>  dispatch(addCom(comment, id)),
      editArticle: (text, id) =>  dispatch(editArt(text, id))
    }
  }
)(Article)