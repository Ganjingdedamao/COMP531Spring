import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {addArticle} from './articleActions'

const NewArticle =({username, add})=> {
  let text
  let picture
  let file
  let fd 
  const _add =()=>{
    if(text.value!=""){
      fd=new FormData()
      fd.append('text', text.value)
        if(picture){
          fd.append('image', picture)
       }
      add(username,text.value, fd)
      _cancle()
    }
  }
  const _upload=()=>{
    upfile.click()
  }
  const _cancle=()=>{
    picture=undefined
    file=undefined
    text.value=''
  }
  const _chooseImg=(e)=>{
    picture = e.target.files[0]
  }
  return(
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <h4 className="float_left margin_top_10">Post New Article</h4>
      <input type="file" id="upfile" className="upload_file" accept="image/*" onChange={(e) => _chooseImg(e)}/>
      <button id="cancleArt" className="btn btn-default float_right margin_5" onClick={ _cancle }>Cancle <span className="glyphicon glyphicon-remove-circle"></span></button>
      <button id="postArt" className="btn btn-default float_right margin_5" onClick={ _add }>Post <span className="glyphicon glyphicon-send"></span></button>
      <button id="uploadPic" className="btn btn-default float_right margin_5" onClick={ _upload }>Photo <span className="glyphicon glyphicon-camera"></span></button>
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
      add: (username, text, fd) =>  dispatch(addArticle(username, text, fd))
    }
  }
)(NewArticle)