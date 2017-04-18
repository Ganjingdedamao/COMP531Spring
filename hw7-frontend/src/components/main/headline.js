import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { updateHeadline } from './followingAction'

const Headline =({profile, update})=> {
  let newheadline
  const _update=()=>{
    update(newheadline.value)
    newheadline.value=''
  }
  return(
    <div className="width_150 sidebar-module sidebar-module-inset align_center">  
      <div className="thumbnail margin_top_10">
        <img data-src="holder.js/100%x180" src={profile.img} className="img-responsive" alt="Responsive image"/>
        <div className="caption">
          <h4 id="Username">{profile.disp_name}</h4>
          <h5 id="headline" className="margin_top_10" ><span className="glyphicon glyphicon-pencil"></span> {profile.headline}</h5>
          <input type="text" placeholder="Input New Headline" id="newHeadline" className="form-control float_left width_65" ref={ (node) => newheadline = node}/>
          <button id="updateHeadline" className="btn btn-success float_right " onClick={ _update }>Update</button>
          <br/><br/>
        </div>
      </div>
    </div>
  )
}

export default connect(
  (state) => {
    return {
      profile: state.profile[0] || {}
    }
  },
  (dispatch) => {
    return{
      update: (newheadline) =>  dispatch(updateHeadline(newheadline))
    }
  }
)(Headline)