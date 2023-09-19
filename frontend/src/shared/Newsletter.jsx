import React from 'react'
import "./news-letter.css"
import {Container,Row,Col} from "reactstrap"
import newsletter from "../assets/images/newsletter.png"
const Newsletter =()=>{

return <>

<section className='newsletter'>
    <Container>
        <Row>
            <Col lg='6'>
                <div className='newsletter__content'>
                    <h2> Subscribe now  to get useful investing information.</h2>
                </div>
                <div className='newsletter__input'>
                    <input type="email" placeholder="Enter your email"/>
                    <button className='btn newsletter__btn'> Subscribe </button>
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