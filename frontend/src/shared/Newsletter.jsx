import React,{useState}from "react";
import { Container, Row, Col } from "reactstrap";
import newsletterImage from "../assets/images/newsletter.png";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import "./news-letter.css";

const Newsletter = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState({
    email: "",
});
  const handleChange = (e) =>{
    setEmail((prevEmail) => ({ ...prevEmail, email: e.target.value }));
  }
  const handleSubmit = async (e) => {
  
    e.preventDefault();
    console.log("email",email);
    console.log("json email",JSON.stringify(email));
    try{
      const res = await fetch(`${BASE_URL}/newsletter/subscribe`,
      {
          method: 'post',
          body: email
      });
      
      const result = await res.json();
          console.log("result",result)
          console.log("resu",res)
      if(!res.ok) alert(result.message);
      navigate('/thank-you');
  }
  catch(err){
      alert(err.message);
  }
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
                value ={email.email}
                placeholder="Enter your email"
                className="newsletter__email-input form-control mx-auto"
                onChange={handleChange}
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