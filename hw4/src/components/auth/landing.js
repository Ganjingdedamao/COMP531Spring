import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Login from './login'
import Register from './register'
import Nav from './nav'

const Landing =({message})=> {

		return(
				<div className="land_back">
					<Nav/>
					<br/><br/><br/><br/><br/>
					<br/><br/><br/><br/><br/>

					<div className="container">
						<div className="errordiv"><h4>{message}</h4></div>
					    <div className="row">
					        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 div_back margin_5" >
						        <h2>New User? Register</h2>
						        <Register/>
					      	</div>
					        <div className="col-xs-6 col-sm-6 col-lg-3 col-md-3 col-sm-offset-2 col-md-offset-2 col-lg-offset-2 div_back margin_5">
					          	<h2>Login</h2>
					       		<Login/>
					    	</div>
					    </div>
					    
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
)(Landing)