import React,{useState}from "react";
import { Container, Row, Col } from "reactstrap";
import newsletterImage from "../assets/images/newsletter.png";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/config";
import "./news-letter.css";

const Newsletter = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    email: "",
    firstName: "",
    lastName: ""
});
const handleChange = (e) => {
  const { name, value } = e.target;
  setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
};
  const handleSubmit = async (e) => {
  
    e.preventDefault();
    try{
      const res = await fetch(`${BASE_URL}/newsletter/subscribe`,
      {
          method: 'post',
          headers: {
            'content-type' : 'application/json'
        },
          body: JSON.stringify({details})
      });
     
      const result = await res.json();
          console.log("result",result)
          console.log("resu",res)
      if(res.ok) {
        navigate('/thank-you');
      }    
      else{
        navigate('/thank-you');
      }
        
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
            name="firstName"
              value ={details.firstName}
              placeholder="FirstName"
              className=" form-control mx-auto"
              onChange={handleChange}
            />

              <input
              name="lastName"
              value ={details.lastName}
              placeholder="LastName"
              className=" form-control mx-auto"
              onChange={handleChange}
            />
              
              
            </div>
            <div className="newsletter__input" >
            <input
              
              type="email"
              name= "email"
              value ={details.email}
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