import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {addArticle} from './articleActions'

const NewArticle =({username, add})=> {
  let text
  let picture
  const _add =()=>{
    add(username,text.value)
    text.value=''
    picture.value=''
  }
  const _upload=()=>{
    upfile.click()
  }
  const _cancle=()=>{
    picture.value=''
    text.value=''
  }
  return(
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <h4 className="float_left margin_top_10">Post New Article</h4>
      <input type="file" id="upfile" className="upload_file" ref={ (node) => picture = node }/>
      <button className="btn btn-default float_right margin_5" onClick={ _cancle }>Cancle <span className="glyphicon glyphicon-remove-circle"></span></button>
      <button className="btn btn-default float_right margin_5" onClick={ _add }>Post <span className="glyphicon glyphicon-send"></span></button>
      <button className="btn btn-default float_right margin_5" onClick={ _upload }>Photo <span className="glyphicon glyphicon-camera"></span></button>
      <textarea id="article" className="form-control width_100" placeholder="Input New Feed!" ref={ (node) => text = node }></textarea>  
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
      add: (username, text) =>  dispatch(addArticle(username, text))
    }
  }
)(NewArticle)