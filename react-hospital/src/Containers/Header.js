import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'

class Header extends Component{
  constructor(){
    super()
    this.state={
      user:sessionStorage.getItem('ssid'),
      full_name:'',
      email:'',
      role:''
    }
  }

  handleAuth = () => {
    if (this.state.user && this.state.role=='patient'){
      return(
      <Fragment>
        
        <li className="nav-item">
          <Link className="nav-link" to="/myappointments">My Appointments</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/logout">Logout</Link>
        </li>
        </Fragment>
        )
    }
    else if (this.state.user && this.state.role=='staff'){
      return(
      <Fragment>
        
        <li className="nav-item">
          <Link className="nav-link" to="/logout">Logout</Link>
        </li>
        </Fragment>
        )
    }
    else {
      return(
        <Fragment>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        
        </Fragment>
      )
    }
  }
    render(){
      return(
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/">Hospital</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                  </li>
                          
                  {this.handleAuth()}
                  
                  </ul>
              </div>
            </div>
          </nav>
        </Fragment>
       
        )
    }

    componentDidMount(){
      if(this.state.user){
      fetch(`http://localhost:8000/userapi/${this.state.user}/`)
      .then((response)=>{
          if (response.status==200){
              response.json()
              .then((data)=>{
                  this.setState({
                      full_name:data.full_name,
                      role:data.role,
                      email:data.email
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
  }
}

export default Header