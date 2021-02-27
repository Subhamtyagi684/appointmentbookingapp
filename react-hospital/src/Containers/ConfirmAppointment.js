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
            confirmed:false,
        }
    }
   
    handleSubmit = (event) => {
        console.log('hello')
        event.preventDefault();
        if(this.state.user){
            fetch(`http://127.0.0.1:8000/patientappointment/${this.state.user}/`,{method:'POST',})
            .then((response)=> {
                if(response.status==200){
                    response.json()
                    .then((data)=> {
                        alert('You have successfully booked your appointment')
                        window.location.href = "http://localhost:3000/myappointments/";
                    })
                }
                else{
                    alert('Sorry! something went wrong, try again')
                }
            })
        }
    }

    render(){
       return(
            <Fragment>
                <Header/>
                <center><h1 className='mt-2 mb-3'>Please Confirm Your Appointment !</h1></center>
                <section>
                    <div className='container'>
                        <div className='row'>
                            <div class='col-lg-8 col-md-12 m-auto' >
                            <form onSubmit={this.handleSubmit} >
                                <table cellPadding='15' className='w-100 border border-1 border-dark ' >
                                
                                    <tbody>
                                        <tr>
                                            <th>
                                                Patient Name
                                            </th>
                                            <td>
                                                {this.state.full_name?this.state.full_name:'loading...'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                Patient Email
                                            </th>
                                            <td>
                                                {this.state.full_name?this.state.email:'loading...'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                Patient Mobile
                                            </th>
                                            <td>
                                                {this.state.mobile?this.state.mobile:'loading...'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                Patient Appointment Date
                                            </th>
                                            <td>
                                                {this.state.apt_date?this.state.apt_date:'loading...'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>
                                                Patient Appointment Time
                                            </th>
                                            <td>
                                                {this.state.apt_time?this.state.apt_time:'loading...'}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan='2'>
                                                <center><button type="submit" className="btn btn-primary">Confirm</button>
                                                <Link to='/myappointments/'> <button type="button" className="btn btn-danger ms-3">Deny</button></Link></center>
                                            </td>
                                        </tr>
                                    </tbody>
                                    
                                </table>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }
    
    componentDidMount(){
        if(this.state.user){
            fetch(`http://127.0.0.1:8000/patientappointment/${this.state.user}/`)
            .then((response)=> {
                if(response.status==200){
                    response.json()
                    .then((data)=> {
                        this.setState({
                            full_name:data.patient_name,
                            email:data.patient_email,
                            mobile:data.patient_mobile,
                            apt_date:data.patient_apt_date,
                            apt_time:data.patient_apt_time,
                            confirmed:data.is_confirmed
                        })
                    })
                }
                else{
                    alert('Sorry! user not found')
                }
            })
        }
    }
}

export default Contact





