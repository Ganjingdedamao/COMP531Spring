import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { gotoProfile, logOut } from './followingAction'

const Nav =({username, gotoprofile, logout}) =>{
		const _gotoprofile=()=>{
			gotoprofile(username)
		}
		const _logout=()=>{
			logout()
		}
		return(
				<nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
			      <div className="container">
			        <div className="navbar-header">
			          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
			            <span className="sr-only">Toggle navigation</span>
			            <span className="icon-bar"></span>
			            <span className="icon-bar"></span>
			            <span className="icon-bar"></span>
			          </button>
			          <a className="navbar-brand" href="#">Rice Book</a>
			        </div>
			        <div id="navbar" className="collapse navbar-collapse">
			          <ul className="nav navbar-nav">
			            <li className="active">
			              <a href="#" id="Username_nav">{username}</a>
			            </li>
			            <li >
			              <a onClick={ _gotoprofile }>Profile</a>
			            </li>
			          </ul>
			          <a className="navbar-brand navbar-right" onClick={ _logout }>Logout</a>
			        </div>
			      </div>
			    </nav>

			)
	
}
export default connect(
    (state) => {
        return {
             username: state.username || 'Guest'
             
        }
    },
     (dispatch) => {
        return{
          gotoprofile: (username) =>  dispatch(gotoProfile(username)),
          logout: ()=> dispatch(logOut())
        }
      }
    
)(Nav)