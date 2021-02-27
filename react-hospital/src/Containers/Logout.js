import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'

class Logout extends Component{
    constructor(){
        super()
        this.state = {
            user:sessionStorage.getItem('data')
        }
    }
    render(){
        if (this.state.user){
            sessionStorage.removeItem('data')
            sessionStorage.removeItem('ssid')
            return(
                
               <Redirect to='/login'/>

            )
        }
        return (
            <Redirect to='/login'/>
        )
    }
}

export default Logout