import React from "react"
import {Routes,Route,Navigate} from 'react-router-dom'

import Home from '../Pages/Home';
import Signin from '../Pages/Signin';
import Signup from '../Pages/Signup';
import ThankYou from "../Pages/ThankYou";
import StockVoting from "../Pages/StockVoting";
const Routers =()=>{
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home'/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/signin' element={<Signin/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/stocks' element={<StockVoting/>} />
            <Route path='/thank-you' element={<ThankYou/>} />
            </Routes>

    )
};

export default Routers;