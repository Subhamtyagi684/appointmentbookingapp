import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './Home'
import Contact from './Contact'
import Footer from './Footer'
import Login from './Login'
import Logout from './Logout'
import Register from './Register'
import MyAppointments from './MyAppointments'
import Appointment from './Appointment';
import ConfirmAppointment from './ConfirmAppointment'
import ConfirmMyAppointment from './ConfirmMyAppointment'

const App = () => {
    return(
        <BrowserRouter>
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/appointment' component={Appointment}></Route>
            <Route exact path='/confirmappointment' component={ConfirmAppointment}></Route>
            <Route exact path='/confirmmyappointment/:booking_id' component={ConfirmMyAppointment}></Route>
            <Route exact path='/myappointments' component={MyAppointments}></Route>
            <Route exact path='/register' component={Register}></Route>
            <Route exact path='/login' component={Login}></Route>
            <Route exact path='/logout' component={Logout}></Route>
            <Route exact path='/contact' component={Contact}><Contact/></Route>
            <Footer/>
        </BrowserRouter>
    )
}

export default App