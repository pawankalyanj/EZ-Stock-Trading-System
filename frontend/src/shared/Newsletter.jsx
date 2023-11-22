import React from 'react'
import "./news-letter.css"
import {Container,Row,Col} from "reactstrap"
import newsletter from "../assets/images/newsletter.png"
import { useState } from 'react';
const Newsletter =()=>{

        const [email, setEmail] = useState({
            email: undefined
        });
    
        const handleChange = (e)=>{
            setEmail(prev=>({...prev,[e.target.id]:e.target.value}))
        };
    

    const handleClick =async (e) =>{
        e.preventDefault();
        dispatch({type: 'LOGIN_START'});
        try{
            const res = await fetch(`${BASE_URL}/subscribe`,
            {
                method: 'post',
                headers: {
                    'content-type' : 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            const result = await res.json();
           
            if(!res.ok) alert(result.message);

            dispatch({type: 'LOGIN_SUCCESS', payload: result.data});
            navigate('/');
        }
        catch(err){
            dispatch({type: 'LOGIN_FAILURE',payload: err.message});
        }

    };

return <>

<section className='newsletter'>
    <Container>
        <Row>
            <Col lg='6'>
                <div className='newsletter__content'>
                    <h2> Subscribe now  to get useful investing information.</h2>
                </div>
                <div className='newsletter__input'>
                    <input type="email" placeholder="Enter your email" onChange={handleChange}/>
                    <button className='btn newsletter__btn' onSubmit = {handleClick}>
                             Subscribe </button>
                </div>
            </Col>
            <Col lg="6">
                <div className='newsletter__img'>
                    <img src={newsletter} alt=""/>
                </div>
            </Col>
        </Row>
    </Container>
    </section>
</>

};

export default Newsletter;