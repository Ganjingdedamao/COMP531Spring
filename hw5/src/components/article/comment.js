import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


const Comment =({id, author, text, date})=> {
  return(
    <li>
      <div className="margin_5"> 
        <div className="border_top">
          <h5><b><span className="glyphicon glyphicon-comment"></span> {author} :</b></h5>
          <h6> {date}</h6>
        </div>
        <div>
          <h6>{text}</h6>
        </div>
      </div>
    </li>
  )
}

export default Comment