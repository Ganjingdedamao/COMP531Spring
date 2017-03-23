import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ProfileForm from './profileForm'
import ProfileInfo from './profileInfo'
import Avatar from './avatar'
import Nav from './pronav'

const Profile = ({message}) => {
	return (
		<div>
			<Nav/>
			<br/><br/>
			<br/><br/>
			<div className="container height_100">
				<div className="row height_100">
					<Avatar/>
				</div>
				<div className="errordiv"><h4>{message}</h4></div>
				<div className="row height_100">
					<ProfileInfo/>
					<ProfileForm/>  
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
	(state)=>{
		return{
			message: state.message
		}
	}
)(Profile)