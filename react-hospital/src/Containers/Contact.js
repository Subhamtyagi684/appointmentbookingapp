import React, { Component, Fragment } from 'react'
import Header from './Header'
import {Link, Redirect} from 'react-router-dom'

class Contact extends Component{
    constructor(){
        super()
        
        this.state={
            booking_date:'',
            availability_msg:'',
            booking_available:false,
            user:sessionStorage.getItem('ssid'),
            full_name:'',
            mobile:'',
            email:'',
            apt_date:'',
            apt_time:'',
            patient_data:'',
            confirmed:false,
        }
    }


   

    render(){
        return(
            <Fragment>
                <Header/>
                <h1>It is a contact page</h1>
                
            </Fragment>
        )}

}
    


export default Contact





