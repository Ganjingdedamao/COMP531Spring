import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { doRegister } from './authAction'

const Register = ({register})=>{
  let acco_name
  let disp_name
  let email
  let phone
  let birth
  let zipcode
  let password
  let pass_conf
  const _register=()=>{
    register(acco_name.value, disp_name.value, email.value, phone.value, birth.value, zipcode.value, password.value, pass_conf.value)
  }
  const _clear=()=>{
    acco_name.value=''
    disp_name.value=''
    email.value=''
    phone.value=''
    birth.value=''
    zipcode.value=''
    password.value=''
    pass_conf.value=''
  }
  return (
    <div>
      <div className="navbar-form navbar-left" >
        <div className="form-group">
          <input type="text" id="acco_name" placeholder="Name" className="form-control" ref={(node) => acco_name = node }/>
        </div>
        <div className="form-group">
          <input type="text" id="disp_name" placeholder="Display Name" className="form-control" ref={(node) => disp_name = node }/>
        </div>
        <br/><br/>
        <div className="form-group">
          <input type="email" id="email" placeholder="Email" className="form-control" ref={(node) => email = node }/>
        </div>
        <div className="form-group">
          <input type="text" id="phone" placeholder="Phone" className="form-control" ref={(node) => phone = node }/>
        </div>
        <br/><br/>
        <div className="form-group">
          <input type="text" id="zipcode" placeholder="Zipcode" className="form-control" ref={(node) => zipcode = node }/>
        </div>
        <div className="form-group">
          <input type="date" placeholder="Birthday" id="birth" className="form-control" ref={(node) => birth = node }/>
        </div>
        <br/><br/>
        <div className="form-group">
          <input type="password" id="password" placeholder="Password" className="form-control" ref={(node) => password = node }/>
        </div>
        <div className="form-group">
          <input type="password" id="pass_conf" placeholder="Password Confirmation" className="form-control" ref={(node) => pass_conf = node }/>
        </div>
        <br/><br/>
        <button className="btn btn-success float_right" onClick={ _register }>Register Now!</button>
        <button className="btn btn-default float_left" onClick={ _clear }>Clear</button>
      </div>
      <label>
        <input name="time" id="time" type="hidden" value="" />
      </label>
      <label>
        <input name="timedisplay" id="timedisplay" type="hidden" value="" />
      </label>
    </div>
  )
}

export default connect(null, dispatch => ({
  register: (acco_name, disp_name, email, phone, birth, zipcode, password, pass_conf) => {
    dispatch(doRegister(acco_name, disp_name, email, phone, birth, zipcode, password, pass_conf))
  }
}))(Register)