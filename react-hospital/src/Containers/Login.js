import React, { Component, Fragment } from 'react'
import  { Redirect, Link } from 'react-router-dom'
import Header from './Header'

class Login extends Component{
    constructor(){
        super()
        let loggedIn = false
        this.state={
            email:'',
            password:'',
            email_error:'',
            password_error:'',
            loggedIn,
            token:'',
            login_error:'',
            user:sessionStorage.getItem('data')
        }
    }

    
    handleEmail = (event) =>{
        return(
            this.setState({
                email:event.target.value
            })
        )
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
            email_error:'',
            password_error:'',
        })
        event.preventDefault();
        fetch('http://127.0.0.1:8000/login/', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                email:this.state.email,
                password:this.state.password
            })
    })
        .then((Response)=> {
            if (Response.status===200){
                Response.json()
                .then((data)=> {
                    sessionStorage.setItem('data',data['token'])
                    sessionStorage.setItem('ssid',data['user_id'])
                    this.setState({
                        token:data['token'],
                       loggedIn:true
                    })
                    
                })
                .catch((err)=> {
                    alert(err)
                })
            }
            else{
                Response.json()
                .then((data)=> {
                    if(data.email || data.password){
                        if (data.email){
                            this.setState({
                                email_error:data.email[0]
                            })
                        }
                        if (data.password){
                            this.setState({
                                password_error:data.password[0]
                            })
                        }
                    }
                    else{
                        this.setState({
                            login_error:data['non_field_errors'][0]
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
        if (this.state.loggedIn){
            return (<Redirect to='/' />)
        }
        if (this.state.user){
            return (<Redirect to='/' />)
        }
        return(
            <Fragment>
                <Header/>
                <center><h1 className='mt-2 mb-3'>Login Here!</h1></center>
                <section>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-5 m-auto'>
                            <form onSubmit={this.handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label"><span className='text-danger'>*</span>Email address</label>
                                    <input type="text" className="form-control" id="email" onChange={this.handleEmail} placeholder='Enter your valid email address' />
                                    <p className='text-danger'><small>{this.state.email_error} </small></p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label"><span className='text-danger'>*</span>Password</label>
                                    <input type="password" className="form-control" id="password" onChange={this.handlePassword} placeholder='Enter your password '/>
                                    <p className='text-danger'><small>{this.state.password_error} </small></p>
                                </div>
                                <center><p className='text-danger'><strong>{this.state.login_error?this.state.login_error:''}</strong></p></center>
                                <center>
                                    <button type="submit" className="btn btn-primary">Login</button>
                                    <Link to='/register'><button type="button" className="btn btn-info text-light ms-3">or Register Here</button></Link>
                                </center>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment>
        )
    }
}

export default Login