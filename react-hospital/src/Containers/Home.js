import React, { Component, Fragment } from 'react'
import  { Redirect, Link } from 'react-router-dom'
import Header from './Header'


class Home extends Component{
    constructor(){
        super()
        this.state= {
            token:sessionStorage.getItem('data'),
            user:sessionStorage.getItem('ssid'),
            full_name:'',
            role:'',
            email:'',
            appointment_list:'',
            booking_date:'',
            error_msg:'',
            visited:false,

        }
    }

    handleDate= (event) => {
        let x = event.target.value
        if (x){
        return(
            this.setState({
                booking_date:x
            })
        )}
    }

    handleVisitedButton = (item)=>{
        fetch(`http://localhost:8000/patientvisited/${item}/`,{method:'POST'})
        .then((response)=>{
            if (response.status==200){
                response.json()
                .then((data)=>{
                    this.setState({
                        visited:true
                    })
                })
            }
        })
    }

    handleAppointmentList = () =>{
        let item = this.state.appointment_list
        if (item){
            return(
                item.map((data,index)=> {
                    return(

                        <Fragment>
                            <tr>
                                <td>
                                    {index+1}
                                </td>
                                <td>
                                    {data.patient_name}
                                </td>
                                <td>
                                    {data.patient_email}
                                </td>
                                <td>
                                    {data.patient_mobile}
                                </td>
                                <td>
                                    {data.patient_apt_date}
                                </td>
                                <td>
                                    {data.patient_apt_time}
                                </td>
                                <td>
                                    {this.state.visited?<p className='text-success'><strong>Visited</strong></p>:<button className='btn btn-success' type='button' onClick={()=>{this.handleVisitedButton(data.pk)}}>Click me if the patient visited</button>}
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
                        <td colSpan='7'>
                            Currently there are no appointments on this date. Please search different date.
                        </td>
                    </tr>
                </Fragment>
            )
        }

    }

    handleSubmit=(event) =>{
        console.log('clicked')
        this.setState({
            error_msg:'',
            appointment_list:''

        })
        event.preventDefault();
        
        if (this.state.booking_date)
        {
            fetch(`http://127.0.0.1:8000/getpatientlist/${this.state.booking_date}/`)
            .then((Response)=> {
                if (Response.status===200){
                    Response.json()
                    .then((data)=> {
                        if (data[0]){
                        this.setState({
                            appointment_list:data
                        })}
                        else{
                            this.setState({
                                appointment_list:'',
                                error_msg:'No appointments found on this date'
                            })
                        }
                    })  
                    .catch((err)=> {
                        alert(err)
                    })
                }
                else{
                    Response.json()
                    .then((data)=> {
                        this.setState({
                            error_msg:data
                        })
                    })
                    .catch((err)=>{
                        alert(err)
                    })
                }
            })
        }
        else{
            alert('Please enter the date')
        }
        
    }
    

    render(){
        if (this.state.token){
            if (this.state.role==='patient'){
                return(
                    <Fragment>
                        <Header/>
                        <center><h1 className='mt-5'>Welcome, {this.state.full_name?this.state.full_name:'loading...'} </h1></center>
                        <center><h3 className='mt-3'>Book your appointment on clicking <Link to='/appointment'><button className='btn btn-primary'>Book appointment</button></Link></h3></center>
                    </Fragment>
                )
            }
            else if (this.state.role==='staff'){
                return(
                    <Fragment>
                        <Header/>
                        <section>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12 m-auto mt-3'>
                            <form onSubmit={this.handleSubmit}>
                                <div class="mb-3 d-flex justify-content-evenly">
                                    <label for="exampleFormControlDate1" class="form-label me-5"><b>Search appointment on a date</b></label>
                                    <input type="date" class="form-control w-50" id="exampleFormControlDate1" name='apt_date' onChange={this.handleDate}  required/>
                                    <button type="submit" className="btn btn-primary">Search</button>
                                </div>
                                
                                {/* {this.handleAppointmentList()} */}
                                {/* {this.state.availability_msg?this.state.availability_msg:''} */}
                                
                            </form>
                            <strong><p className='text-danger text-center'>{this.state.error_msg?this.state.error_msg:''}</p></strong>
                            </div>
                        </div>
                    </div>
                </section>
                <hr className='bg-dark border border-2'/>
                <section className='mt-5'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <table className='w-100' cellPadding='10'>
                                    <tbody className='text-center'>
                                        <tr>
                                            <th>
                                                S.No.
                                            </th>
                                            <th>
                                                Patient Name
                                            </th>
                                            <th>
                                                Patient Email
                                            </th>
                                            <th>
                                                Patient Mobile
                                            </th>
                                            <th>
                                                Patient Appointment Date
                                            </th>
                                            <th>
                                                Patient Appointment Time
                                            </th>
                                            <th>
                                                Change visiting status(default is not visited)
                                            </th>
                                        </tr>
                                        {this.handleAppointmentList()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
                    </Fragment>
                )
            }
            else{
                return(
                    <Fragment>
                        <Header/>
                        <center><h5 className='mt-3'>Loading....</h5></center>
                    </Fragment>
                )
            }
        }
        else{
            return(
                <Redirect to='/login'/>
            )
        }
        
    }
    componentDidMount(){
        fetch(`http://localhost:8000/userapi/${this.state.user}/`)
        .then((response)=>{
            if (response.status==200){
                response.json()
                .then((data)=>{
                    this.setState({
                        full_name:data.full_name,
                        role:data.role,
                        email:data.mobile
                    })
                })
            }
            else{
                this.setState({
                    full_name:'',
                    role:'',
                    email:'',
                })
            }
        })
    }
    componentWillUnmount(){
        this.setState({
            full_name:'',
            role:'',
            email:'',
        })
    }
}

export default Home