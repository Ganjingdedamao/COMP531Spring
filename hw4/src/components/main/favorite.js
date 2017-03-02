import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


class Favorite extends Component {
	render(){
		return(
			<div>

				<div className="sidebar-module margin_sidebar">
		            <h4>Favorites</h4>
		            <ol className="list-unstyled">
		              <li><span className="glyphicon glyphicon-list-alt" aria-hidden="true"></span> <a href="#">New Feed</a></li>
		              <li><span className="glyphicon glyphicon-comment"></span> <a href="#">Massages</a></li>
		              <li><span className="glyphicon glyphicon-calendar"></span> <a href="#">Events</a></li>
		              <li><span className="glyphicon glyphicon-shopping-cart"></span> <a href="#">Sale Group</a></li> 
		            </ol>
		          </div>
		          <div className="sidebar-module margin_sidebar">
		            <h4>APPS</h4>
		            <ol className="list-unstyled">
		              <li><span className="glyphicon glyphicon-calendar"></span> <a href="#">On this day</a></li>
		              <li><span className="glyphicon glyphicon-user"></span> <a href="#">Find Friends</a></li>
		              <li><span className="glyphicon glyphicon-pencil"></span> <a href="#">Suggest Edit</a></li>
		              <li><span className="glyphicon glyphicon-picture"></span> <a href="#">Photos</a></li>
		              <li><span className="glyphicon glyphicon-fire"></span> <a href="#">Games</a></li>
		            </ol>
		          </div>
		          <div className="sidebar-module margin_sidebar">
		            <h4>Interests</h4>
		            <ol className="list-unstyled">
		              <li><span className="glyphicon glyphicon-film"></span> <a href="#">Movies</a></li>
		              <li><span className="glyphicon glyphicon-file"></span> <a href="#">Essays</a></li>
		              <li><span className="glyphicon glyphicon-book"></span> <a href="#">Books</a></li>
		              <li><span className="glyphicon glyphicon-music"></span> <a href="#">Musics</a></li>
		            </ol>
		          </div>
		        </div>

			)
	}

}

export default Favorite


