import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {removeFollower} from './followingAction'

const Follower =({id, name, headline,img, remove})=> {
  const _remove=()=>{
    remove(name)
  }
  return(
    <li>
      <div className="border border_round"> 
        <img className="img-circle margin_5 float_left" width="70px" height="70px" src={img} alt="..."/>
        <div>
          <h6><button id="removeBtn" className="glyphicon glyphicon-trash btn_cancle_sign float_right" onClick={ _remove }></button></h6>
          <br/>
          <h5><span className="glyphicon glyphicon-home"></span> {name} </h5>
        </div>
        <div>
          <h6><span className="glyphicon glyphicon-paperclip"></span> {headline}</h6>
        </div>
      </div>
    </li>
  )
}

export default connect(null, dispatch => ({
  remove: (name) => {
      dispatch(removeFollower(name))
    }
  })
)(Follower)