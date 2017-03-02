import React from 'react'
import { connect } from 'react-redux'

import Nav from './main/nav'
import Main from './main/main'
import Landing from './auth/landing'
import Profile from './profile/profile'



const App = ({ location }) => {
    
	let loc
    switch(location) {
        case 'MAIN_PAGE': loc = <Main/>; break;
        case 'PROFILE_PAGE': loc = <Profile/>; break;
        default: loc = <Landing/>; break;
    }


    return (
        <div >
	        { loc } 
        </div>
    )
}


export default connect(
    (state) => {
        return {
            location: state.location,
            
        }
    }
    
)(App)
