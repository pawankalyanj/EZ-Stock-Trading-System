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
              <Col lg="12" className="text-center">
                <h1>Unlock Your Investing Potential!</h1>
              </Col>
              <Col lg="12" className="text-center">
                <ul>
                  <li>Informed decisions through expert insights.</li>
                  <li>Stay ahead with real-time market updates.</li>
                  <li>Tailored resources for all levels of expertise.</li>
                  <li>Streamlined analysis for confident investing.</li>
                </ul>
              </Col>
              <Col lg="12" className="text-center">
                <Button type="button" className="btn btn-outline-light ">
                  <Link to="/signup" className="link-light opacity-100">
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
          <Col lg="12" className="text-left ">
            <h2 className="testimonial__title">User Testimonials</h2>
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
