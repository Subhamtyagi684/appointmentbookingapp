import React, { Component, Fragment } from 'react'
import Header from './Header'


class Register extends Component{
    constructor(){
        super()
        this.state={
            full_name:'',
            email:'',
            mobile:'',
            password:'',
            staffcode:'111',
            role:null,
            full_name_error:'',
            email_error:'',
            mobile_error:'',
            password_error:'',
            code_error:'',
            role_error:''
            
        }
    }

    handleFullname = (event) =>{
        return(
            this.setState({
                full_name:event.target.value
            })
        )
    }

    handleEmail = (event) =>{
        return(
            this.setState({
                email:event.target.value
            })
        )
    }

    handleMobile = (event) =>{
        return(
            this.setState({
                mobile:event.target.value
            })
        )
    }

    handleRole = (event) =>{
        return(
            this.setState({
                role:event.target.value,
            })
        )
    }


    handleRoleId = () => {
        if (this.state.role==='staff'){
            return(
                <Fragment>
                    <div className="mb-3">
                        <label htmlFor="staffcode" className="form-label"><span className='text-danger'>*</span>Staff Code</label>
                        <input type="text" className="form-control" id="staffcode" placeholder='Enter your private staff code here'/>
                    </div>
                </Fragment>
            )
        
        }
    }

    handlePassword = (event) =>{
        return(
            this.setState({
                password:event.target.value
            })
        )
    }

    handleSubmit = (event) =>{
        
        
        this.setState({
            full_name_error:'',
            email_error:'',
            mobile_error:'',
            password_error:'',
            role_error:'',

        })
        event.preventDefault();
        if (this.state.role==='staff'){
            if (document.getElementById('staffcode').value===this.state.staffcode){
                this.setState({
                    role:'staff'
                })
            }
            else{
                this.setState({
                    role:null,
                    role_error:"Sorry! Staff code doen't exist,Choose patient option if you do not have any staff code",
                    
                })
            }
            
        }
        
        fetch('http://127.0.0.1:8000/register/', {
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    full_name:this.state.full_name,
                    email:this.state.email,
                    mobile:this.state.mobile,
                    role:this.state.role,
                    password:this.state.password
                })
        })
            .then((Response)=> {
                if (Response.status===200){
                    Response.text()
                    .then((data)=> {
                        alert(String(data)+' You can login now.')
                        window.location.href = "http://localhost:3000/login";
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
    


    render(){
        return(
            <Fragment>
                <Header/>
                <center><h1 className='mt-2 mb-3'>Register Here!</h1></center>
                <section>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-5 m-auto'>
                            <form onSubmit={this.handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="fullname" className="form-label"><span className='text-danger'>*</span>Full name</label>
                                    <input type="text" className="form-control" id="firstname" onChange={this.handleFullname} placeholder='Enter your full name here'/>
                                    <p className='text-danger'><small>{this.state.full_name_error} </small></p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label"><span className='text-danger'>*</span>Email address</label>
                                    <input type="text" className="form-control" id="email" onChange={this.handleEmail} placeholder='Enter your valid email address' />
                                    <p className='text-danger'><small>{this.state.email_error} </small></p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mobile" className="form-label"><span className='text-danger'>*</span>Mobile</label>
                                    <input type="text" className="form-control" id="mobile" onChange={this.handleMobile}  placeholder='Please enter your 10 digit valid mobile number'/>
                                    <p className='text-danger'><small>{this.state.mobile_error} </small></p>
                                </div>
                                <div className="mb-3">
                                <p className='form-label'><span className='text-danger'>*</span>Choose account option </p>
                                <div className="form-check ms-4">
                                    <input className="form-check-input" type="radio" name="role" id="flexRadioDefault1" onChange={this.handleRole} value='patient' />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Patient
                                    </label>
                                </div>
                                <div className="form-check ms-4">
                                    <input className="form-check-input" type="radio" name="role" id="flexRadioDefault2" onChange={this.handleRole} value='staff' />
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        Staff
                                    </label>
                                </div>
                                {this.handleRoleId()}
                                <p className='text-danger'><small>{this.state.role_error} </small></p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label"><span className='text-danger'>*</span>Password</label>
                                    <input type="password" className="form-control" id="password" onChange={this.handlePassword} placeholder='Please provide a strong password'/>
                                    <p className='text-danger'><small>{this.state.password_error} </small></p>
                                    <p className='text-secondary'><small>Ensure this field must have a lowercase alphabet, an uppercase alphabet, any digit and a special character from [!#%&_@$]</small></p>
                                </div>
                                <center><button type="submit" className="btn btn-primary">Register</button></center>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }
}

export default Register