import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {updateProfile} from'./profileAction'

const ProfileForm =({profile, update})=>{
	let acco_name
	let disp_name
	let email
	let phone
	let zipcode
	let password
	let pass_conf
	const _update=()=>{
		update(acco_name.value, disp_name.value, email.value, phone.value, zipcode.value, password.value, pass_conf.value, profile)
		acco_name.value=''
		disp_name.value=''
		email.value=''
		phone.value=''
		zipcode.value=''
		password.value=''
		pass_conf.value=''
	}
	return(
		<div className="col-xs-12 col-sm-5 col-md-5 col-lg-5 height_90 border_left">
			<h3 className="mytitle">Update Profile</h3>
			<br/>
			<input type="text"  id="acco_name" placeholder="Account Name"  className="form-control margin_5" ref={(node) => acco_name = node }/>
			<input type="text"  id="disp_name" placeholder="Display Name"  className="form-control margin_5" ref={(node) => disp_name = node }/>    
			<input type="text"  id="email" placeholder="Email"  className="form-control margin_5" ref={(node) => email = node }/>
			<input type="text" id="phone" placeholder="Phone"  className="form-control margin_5" ref={(node) => phone = node }/>
			<input type="text" id="zipcode" placeholder="Zipcode"  className="form-control margin_5" ref={(node) => zipcode = node }/>
			<input type="password" id="password" placeholder="Password"  className="form-control margin_5" ref={(node) => password = node }/>
			<input type="password" id="pass_conf" placeholder="Password Confirmation"  className="form-control margin_5" ref={(node) => pass_conf = node }/>
			<br/>
			<button id="updatePro" className="btn btn-default float_right" onClick={ _update }>Update info</button>
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
			update: (acco_name, disp_name, email, phone, zipcode, password, pass_conf, profile) =>  dispatch(updateProfile(acco_name, disp_name, email, phone, zipcode, password, pass_conf, profile))
		}
})(ProfileForm)