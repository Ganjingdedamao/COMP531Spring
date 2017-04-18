import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

const ProfileInfo =({profile})=> {
  return(
    <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5 height_90">
      <ul>
        <h3 className="mytitle">Current Info</h3>
        <br/>
        <h4><span className="glyphicon glyphicon-user"></span> Account Name</h4>
        <ul><h4 id="acconame_show">{profile.acco_name}</h4></ul>
        <h4><span className="glyphicon glyphicon-eye-open"></span> Display Name</h4>
        <ul><h4 id="name_show">{profile.disp_name}</h4></ul>
        <h4><span className="glyphicon glyphicon-envelope"></span> Email</h4>
        <ul><h4 id="email_show">{profile.email}</h4></ul>
        <h4><span className="glyphicon glyphicon-phone"></span> Phone</h4>
        <ul><h4 id="phone_show">{profile.phone}</h4></ul>
        <h4><span className="glyphicon glyphicon-calendar"></span> Birthday</h4>
        <ul><h4>{profile.birth}</h4></ul> 
        <h4><span className="glyphicon glyphicon-map-marker"></span> Zipcode</h4>
        <ul><h4 id="zip_show">{profile.zipcode}</h4></ul> 
      </ul>
    </div> 
  )
}
export default connect(
  (state) => {
    return {
      profile: state.profile[0] || ''
    }
  }
)(ProfileInfo)