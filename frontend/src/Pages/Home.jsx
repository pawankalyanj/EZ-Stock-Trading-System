import React from "react";
import '../styles/home.css';
import {Container, Row,Col} from "reactstrap";
import experienceImg from "../assets/images/stockExperience.jpg";
import heroVideo from '../assets/videos/landing_vid.mp4';
import Subtitle from '../shared/Subtitle'
import Testimonials from "../components/Testimonial/Testimonial";
import Newsletter from "../shared/Newsletter";
const Home = ()=>{
    return <div>
        <section>
            <Container>
                <Row>
                    <Col lg='6'>
                        <div className="hero__content">
                            <div className="hero__subtitle d-flex align-items-center">
                                <Subtitle subtitle={'Must Know before Invseting'}/>
                            </div>
                            <h1> Invest for better Future!!! <span className="highlight"></span></h1>
                            <p> 
                                We make investing simpler and profitable.
                            </p>    

                        </div>
                    </Col>
                    {/* start images*/ }
                    <Col lg='6'>
                        <div className="hero__img-box mt-5">
                            <video controls=" autoplay">
                                <source src={heroVideo} type="video/mp4" alt=""/>
                            </video> 
                        </div>
                    </Col>
                </Row>
            </Container>
      </section>
    <section>
        <Container>
            <Row>
                <Col lg='6'>
                    <div className="experience__content">
                        <Subtitle subtitle={'Experience'}/>
                        <h2>With all our experience <br/> we will serve you</h2>
                        <p> Lorem posum</p>

                    </div>
                    <div className="counter__wrapper d-flex align-items-center gap-5">
                    <div className="counter__box">
                        <span>5+</span>
                        <h6> Successful portfolios</h6>
                    </div>
                    <div className="counter__box">
                        <span>2+</span>
                        <h6> Regular clients</h6>
                    </div>
                    <div className="counter__box">
                        <span>1+</span>
                        <h6> Years of experience</h6>
                    </div>
                    </div>
                </Col>
                <Col lg='6'>
                    <div className="experience__img">
                        <img src={experienceImg} alt=""/>
                    </div>
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
                <Subtitle subtitle={"Fans Love"} />
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