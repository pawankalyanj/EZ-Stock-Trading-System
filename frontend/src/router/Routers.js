import React from "react"
import {Routes,Route,Navigate} from 'react-router-dom'

import Home from '../Pages/Home';
import Signin from '../Pages/Signin';
import Signup from '../Pages/Signup';
import ThankYou from "../Pages/ThankYou";
import StripeContainer from "../components/Payment/StripeContainer";
const Routers =()=>{
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home'/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/signin' element={<Signin/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/thank-you' element={<ThankYou/>} />
            <Route path='/payment' element={<StripeContainer/>} />
            </Routes>

    )
};

export default Routers;