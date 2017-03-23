import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Nav extends Component {
	render(){
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
				</div>
			</nav>
		)
	}
}
export default connect()(Nav)