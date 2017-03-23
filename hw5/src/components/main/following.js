import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Follower from'./follower'
import {addFollower} from'./followingAction'

const Following =({followers, message, add})=> {
  let new_fri
  const _add=()=>{
    add(new_fri.value, followers, message)
    new_fri.value=''
  }
  return(
    <div>
      <div className="sidebar-module align_center width_150">
        <h4><span className="glyphicon glyphicon-heart"></span> Your Friends</h4>
        <ol className="list-unstyled">
          {followers.map(({id, name, headline, img}) => (   
          <Follower key={id} id={id} name={name} headline={headline} img={img}/>   
          ))}
        </ol>
      </div>
      <br/>
      <div className="sidebar-module align_center width_150">
        <h4><span className="glyphicon glyphicon-plus"></span> Add Friends</h4>
        <input type="text" id="addFollower" placeholder="Input friend's name" className="form-control float_left width_70" ref={ (node) => new_fri = node }/>
        <button className="btn btn-success float_right" onClick={ _add }>Add</button>
      </div>
    </div>
  )
}
export default connect((state) => {
  return {
      followers: state.followers || [],
      message: state.message
    }
  },
  (dispatch) => {
    return{
      add: (new_fri, followers, message) =>  dispatch(addFollower(new_fri, followers,message))
    }
  }
)(Following)