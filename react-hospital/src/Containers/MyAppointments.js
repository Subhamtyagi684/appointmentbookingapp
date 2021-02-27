import React, { Component, Fragment } from 'react'
import Header from './Header'
import {Link} from 'react-router-dom'

class MyAppointments extends Component{
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

    handlePatientData = () => {
        let x = this.state.patient_data
        if (x){
            return(
                x.map((data)=> {
                    return(

                        <Fragment>
                            <tr>
                                <td>
                                    {data.patient_apt_date}
                                </td>
                                <td>
                                    {data.patient_apt_time}
                                </td>
                                <td>
                                    {data.is_confirmed?'Yes':<Link to={`/confirmmyappointment/${data.pk}`}><button type='button' className='btn btn-primary'>Confirm</button></Link>}
                                </td>
                            </tr>
                        </Fragment>
                    )
                    
                })
            )
        }
        else{
            return(
                <Fragment>
                    <tr>
                        <td colSpan='2'><center>There are no appointments in your account</center></td>
                    </tr>
                </Fragment>
            )
        }
    }
   

    render(){
        return(
            <Fragment>
                <Header/>
                <section>
                    <div className='container'>
                        <div className='row'>
                            <div class='col-lg-8 col-md-12 m-auto' >
                                <table cellPadding='15' className='w-100 border border-1 border-dark '>
                                    <tbody className='text-center'>
                                        <tr>
                                            <th colSpan='3'>
                                                <center><h3>Your appointments</h3></center>
                                            </th>
                                            
                                        </tr>
                                        <tr>
                                            <th >
                                                <center>Appointment Date (yyyy-mm-dd)</center>
                                            </th>
                                            <th >
                                                <center>Appointment Time</center>
                                            </th>
                                            <th >
                                                <center>Confirmed</center>
                                            </th>
                                        </tr>
                                        {this.handlePatientData()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
                
            </Fragment>
        )}

        componentDidMount(){
            if(this.state.user){
                fetch(`http://127.0.0.1:8000/myappointments/${this.state.user}/`)
                .then((response)=> {
                    if(response.status===200){
                        response.json()
                        .then((data)=> {
                            this.setState({
                                patient_data:data
                            })
                        })
                    }
                    
                })
            }
            else{
                alert(' You have to login to view this page')
                window.location.href = "http://localhost:3000/login";
                
            }
        }
}
    


export default MyAppointments





