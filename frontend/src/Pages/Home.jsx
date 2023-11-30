import React from "react";
import "../styles/home.css";
import { Container, Row, Col, Button } from "reactstrap";
import heroVideo from "../assets/videos/landing_vid.mp4";
import Testimonials from "../components/Testimonial/Testimonial";
import Newsletter from "../shared/Newsletter";

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div id="video-container">
        <video autoPlay muted loop>
          <source src={heroVideo} type="video/mp4" alt="" />
        </video>

        <div className="text-overlay center-button">
          <Container>
            <Row>
              <Col lg="12" className="heading text-center">
                <h1>Unlock Your Investing Potential!!!</h1>
              </Col>
              <Col lg="12" className="text-center">
                  <p className="info"> Informed decisions through expert insights.
                  Stay ahead with real-time market updates.</p>
                  <p  className="info">We offer tailored resources for all levels of expertise.Streamlined analysis for confident investing</p>
              </Col>
              <Col lg="12" className="text-center">
                <Button type="button" className="start_link btn btn-outline-light ">
                  <Link to="/signup" className="start_link link-light opacity-100">
                    Get Started
                  </Link>
                </Button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      {/* Testimonial Section */}
      <Container>
        <Row>
          <Col lg="12" className="text-center ">
            <h2 className="testimonial__title "> Testimonials</h2>
          </Col>
          <Col lg="12">
            <Testimonials />
          </Col>
        </Row>
      </Container>

      {/* Newsletter Section */}
      <Container>
        <Row>
          <Col lg="12">
            <Newsletter />
          </Col>
        </Row>
      </Container>
    </div>
  )
};

export default Home;
