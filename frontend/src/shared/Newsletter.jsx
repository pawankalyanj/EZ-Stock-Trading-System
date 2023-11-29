import React from "react";
import { Container, Row, Col } from "reactstrap";
import newsletterImage from "../assets/images/newsletter.png";
import "./news-letter.css";

const Newsletter = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  const handleClick = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  const handleChange = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Subscribe for Valuable Investment Insights</h2>
              <p>Stay updated with the latest trends and market analyses.</p>
            </div>
            <div className="newsletter__input">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter__email-input"
              />
              <button
                className="btn newsletter__btn btn btn-dark"
                onClick={handleSubmit}
              >
                Subscribe
              </button>
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter__img">
              <img src={newsletterImage} alt="Newsletter" />
            </div>
          </Col>

        </Row>
      </Container>
    </section>
   );
 };

export default Newsletter;
