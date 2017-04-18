import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {updateAvatar} from './profileAction'

const Avatar =({profile, updateAva})=> {
  let fd
  const _chooseImg=(e)=>{
    if(e.target.files[0]){
      fd=new FormData()
      fd.append('image', e.target.files[0])
      updateAva(fd)
    }
  }
  return(
    <div>
      <div className="col-xs-6 col-sm-6 col-md-3 col-lg-3" >
        <div className="thumbnail margin_top_10">
          <img data-src="holder.js/100%x180" src={profile.img}  className="img-responsive" alt="Responsive image"/>
          <div className="caption">
            <button className="btn btn-default float_right margin_top_10"  onClick={()=>{upfile.click()}}><span className="glyphicon glyphicon-camera"></span> Photo</button>
            <h3 id="Username" className="">{profile.disp_name}</h3>
            <h4 id="fun_status" name="fun_status" className="margin_top_10">{profile.headline}</h4>
            <input type="file" id="upfile" className="upload_file" onChange={(e)=>_chooseImg(e)}/>
          </div>
        </div>
      </div>
      <div className="col-xs-6 col-sm-6 col-md-9 col-lg-9 border_bottom height_300px" >
        <h3 className="float_bottom">Your Profile</h3>
      </div>
    </div>
  )
}
export default connect(
  (state) => {
    return {
      profile: state.profile[0] || ''
    }
  },
  (dispatch) => {
    return{
      updateAva: (fd) =>  dispatch(updateAvatar(fd))
    }
  }
)(Avatar)
