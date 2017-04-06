import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {editCom} from './articleActions'
var ContentEditable = require("react-contenteditable")
const Comment =({username, id, author, text, date, artId, editComment})=> {
  let newComment
  const _editComment=()=>{
    editComment(newComment, artId, id)
  }
  return(
    <li>
      <div className="margin_5"> 
        <div className="border_top">
        {
          username!=author?null:
          <h6><button className="glyphicon glyphicon-send btn_cancle_sign float_right" onClick={ _editComment }> Submit</button></h6>
        }
          <h5><b><span className="glyphicon glyphicon-comment"></span> {author} :</b></h5>
          <h6> {date}</h6>
        </div>
        <div>
          <ContentEditable className="card-user-content" html={text} disabled={username !== author} 
            onChange={ (e) => {newComment = e.target.value} }/>
        </div>
      </div>
    </li>
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
      editComment: (comment, artId, id)=> dispatch(editCom(comment, artId, id))
    }
  }
)(Comment)