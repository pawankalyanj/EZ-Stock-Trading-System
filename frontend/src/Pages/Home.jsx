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

    // <div id="video-container">
    //   <video autoPlay muted loop>
    //     <source src={heroVideo} type="video/mp4" alt="" />
    //   </video>

    //   <div class="text-overlay center-button">
    //     <h1>Unlock Your Investing Potential!</h1>
    //     <ul>
    //       <li>Informed decisions through expert insights.</li>

    //       <li>Stay ahead with real-time market updates.</li>

    //       <li>Tailored resources for all levels of expertise.</li>

    //       <li>Streamlined analysis for confident investing.</li>
    //     </ul>
    //     <button type="button" class="btn btn-secondary btn-lg opacity-50">
    //       <Link to="/signup" class="link-light opacity-100">Get Started</Link>
    //     </button>
    //   </div>
    // </div>

    // <div id="video-container">
    //   <video id="background-video" autoplay muted loop>
    //     <source src={heroVideo} type="video/mp4" alt="" />
    //   </video>

    //   <div class="text-overlay">
    //     <h1>Welcome to Our Website</h1>
    //     <p>This is some introductory text.</p>
    //   </div>
    // </div>

    // <div>
    //   <section className="homeBackground">
    //     <Container className="homeBackground">
    //       <Row>
    //         <Col lg="6">
    //           <div className="hero__content">
    //             <h1 className="heading">
    //               {" "}
    //               Invest for better Future!!!{" "}
    //               <span className="highlight"></span>
    //             </h1>
    //             <p>
    //               Welcome to EZT. your one-stop destination for stock market
    //               insights, news, and investment resources. Whether you're a
    //               seasoned trader or just starting your investment journey, we
    //               have the tools and knowledge to help you succeed in the world
    //               of finance.
    //             </p>
    //           </div>
    //         </Col>
    //         {/* start images*/}
    //         {/* <Col>
    //           <div className="hero__img-box mt-5">
    //             <video autoPlay loop muted>
    //               <source src={heroVideo} type="video/mp4" alt="" />
    //             </video>
    //           </div>
    //         </Col> */}

    //       </Row>
    //       <Button className="btn primary__btn button">
    //         <Link to="/signup">Get Started</Link>
    //       </Button>
    //     </Container>
    //   </section>
    //   <section className="homeBackground">
    //     <Container>
    //       <Row>
    //         <Col></Col>
    //         <Col></Col>
    //       </Row>
    //     </Container>
    //   </section>
    //   {/* === gallery section===*/}

    //   {/* Testimonial Section*/}
    //   <section>
    //     <Container>
    //       <Row>
    //         <Col lg="12">
    //           <h2 className="testimonial__title">
    //             {" "}
    //             What our fans say about us{" "}
    //           </h2>
    //         </Col>
    //         <Col lg="12">
    //           <Testimonials />
    //         </Col>
    //       </Row>
    //     </Container>
    //   </section>
    //   <section>
    //     <Newsletter />
    //   </section>
    // </div>
  );
};

export default Home;
