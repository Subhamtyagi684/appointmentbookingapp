import React, { Component, Fragment } from 'react'
import Header from './Header'
import {Link} from 'react-router-dom'

class Appointment extends Component{
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
            submitted:false,
            booking_id:'',
        }
    }

    handleDate = (event) => {
        let x = event.target.value
        if (x){
        return(
            this.setState({
                booking_date:x
            })
        )}

    }

    handleAvailability = () => {
        this.setState({
            availability_msg:'',
            booking_available:false,
        })
        let y = document.getElementById('exampleFormControlTime1').value
        if (this.state.booking_date){
            fetch(`http://localhost:8000/checkavailability/${this.state.booking_date}/${y}/`)
                .then((Response)=> {
                if (Response.status==200){
                    Response.json()
                    .then((data)=> {
                        console.log(data)
                        if (data['available']==0){
                            this.setState({
                                availability_msg:'Sorry! This shift is unavailabe.Please select different date or different time',
                                booking_available:false
                            })
                        }
                        else{
                            this.setState({
                                availability_msg:'It is available. You can book your appointment',
                                booking_available:true
                            })
                        }
                    })  
                    .catch((err)=> {
                        alert(err)
                    })
                }
                else{
                    this.setState({
                        availability_msg:'Please check the requested date and provide a valid date. Provided date should not be beyond today.'
                    })
                }   
                })
            }
        else(
            alert('Please select a date')
        )
    }

    
    handleSubmit = (event) =>{
        let y = document.getElementById('exampleFormControlTime1').value
        
        this.setState({
            availability_msg:'',

        })
        event.preventDefault();
        
        if (this.state.full_name && this.state.mobile && this.state.user && this.state.email && y)
        {
            fetch('http://127.0.0.1:8000/bookappointment/', {
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json',
                    },
                    body: JSON.stringify({
                        patient_name:this.state.full_name,
                        patient_email:this.state.email,
                        patient_mobile:this.state.mobile,
                        patient_apt_date:this.state.booking_date,
                        patient_apt_time:y

                    })
            })
            .then((Response)=> {
                if (Response.status===200){
                    Response.json()
                    .then((data)=> {
                        alert('Please confirm the appointment')
                        window.location.href = "http://localhost:3000/confirmappointment/";
                    })  
                    .catch((err)=> {
                        alert(err)
                    })
                }
                else{
                    Response.json()
                    .then((data)=> {
                        if (data.full_name){
                            this.setState({
                                full_name_error:data.full_name[0]
                            })
                        }
                        if (data.email){
                            this.setState({
                                email_error:data.email[0]
                            })
                        }
                        if (data.mobile){
                            this.setState({
                                mobile_error:data.mobile[0]
                            })
                        }
                        if (data.role){
                            this.setState({
                                role_error:data.role[0]
                            })
                        }
                        if (data.password){
                            this.setState({
                                password_error:data.password[0]
                            })
                        }
                    })
                    .catch((err)=>{
                        alert(err)
                    })
                }
            })
        }
        else{
            alert('Something went wrong, ensure you must login before sending any request from this page')
        }
        
    }

    handleBookingbutton = () => {
        if (this.state.booking_available){
            return(
                <Fragment>
                    <center>
                        <button type="submit" className="btn btn-success mt-4" >Book Appointment</button>
                    </center>
                </Fragment>
            )
        }
    }


    

    render(){
        if(this.state.submitted){
            return(
                <Link to={`/myappointments`} />
            )
        }
       return(
            
            <Fragment>
                <Header/>
                <center><h1 className='mt-3 mb-5'>Book Your Appointment Here!</h1></center>
                <section>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-5 m-auto'>
                            <form onSubmit={this.handleSubmit}>
                                <div class="mb-3">
                                    <label for="exampleFormControlDate1" class="form-label">Choose appointment date</label>
                                    <input type="date" class="form-control" id="exampleFormControlDate1" name='apt_date' onChange={this.handleDate}  required/>
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlTime1" class="form-label">Example textarea</label>
                                    <select className="form-select" aria-label="Default select example" name='apt_time' id='exampleFormControlTime1' onChange={this.handleBookTime}>
                                        <option value="10:00AM-10:30AM">10:00 A.M - 10:30 A.M</option>
                                        <option value="10:30AM-11:00AM">10:30 A.M - 11:00 A.M</option>
                                        <option value="11:30AM-12:00PM">11:30 A.M - 12:00 P.M</option>
                                        <option value="12:00PM-12:30PM">12:00 P.M - 12:30 P.M</option>
                                        <option value="2:30PM-3:00PM">2:30 P.M - 3:00 P.M</option>
                                        <option value="3:00PM-3:30PM">3:00 P.M - 3:30 P.M</option>
                                        <option value="4:00PM-4:30PM">4:00 P.M - 4:30 P.M</option>
                                        <option value="4:30PM-5:00PM">4:30 P.M - 5:00 P.M</option>
                                    </select>
                                </div>
                                <center>
                                <strong><p className='text-danger text-center'>{this.state.availability_msg?this.state.availability_msg:''}</p></strong>
                                </center>
                                <center>
                                    <button type="button" className="btn btn-primary" onClick={this.handleAvailability}>Check availability</button>
                                </center>
                                
                                {this.handleBookingbutton()}
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
            fetch(`http://127.0.0.1:8000/userapi/${this.state.user}/`)
            .then((response)=> {
                if(response.status==200){
                    response.json()
                    .then((data)=> {
                        this.setState({
                            full_name:data.full_name,
                            email:data.email,
                            mobile:data.mobile,
                        })
                    })
                }
            })

        }
    }
}

export default Appointment





