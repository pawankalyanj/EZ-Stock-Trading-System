import React from "react";
import '../styles/home.css';
import {Container, Row,Col,Button} from "reactstrap";
import experienceImg from "../assets/images/stockExperience.jpg";
import heroVideo from '../assets/videos/landing_vid.mp4';
import Subtitle from '../shared/Subtitle'
import Testimonials from "../components/Testimonial/Testimonial";
import Newsletter from "../shared/Newsletter";

import {NavLink,Link,Navigate} from 'react-router-dom'
const Home = ()=>{
    return <div>
        <section className="homeBackground">
            <Container className="homeBackground">
                <Row>
                    <Col lg='6'>
                        <div className="hero__content">
                            <h1 className="heading"> Invest for better Future!!! <span className="highlight"></span></h1>
                            <p> 
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                            </p>    

                        </div>
                    </Col>
                    {/* start images*/ }
                    <Col>
                <div className="hero__img-box mt-5">
                            <video controls autoplay muted>
                                <source src={heroVideo} type="video/mp4" alt=""/>
                            </video> 
                            </div>
                </Col>
                </Row>
                    <Button className="btn primary__btn button">
                       <Link to='/signup'>Get Started</Link>
                    </Button>
            </Container>
      </section>
    <section className="homeBackground">
        <Container>
            <Row>
                <Col>
                </Col>
                <Col>
                </Col>
            </Row>
        </Container>
    </section>
    {/* === gallery section===*/}
   
   {/* Testimonial Section*/}
   <section>
    <Container>
        <Row>
            <Col lg="12">
                <h2 className="testimonial__title"> What our fans say about us </h2>
            </Col>
            <Col lg="12">
            <Testimonials/>
            </Col>

        </Row>
    </Container>
   </section>
   <section>
    <Newsletter/>
   </section>
</div>
};

export default Home;