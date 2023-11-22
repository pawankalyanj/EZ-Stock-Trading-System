import React from "react"
import './footer.css';
import {Container, Row, Col,ListGroup, ListGroupItem } from "reactstrap";
import {Link} from 'react-router-dom';
import logo from "../../assets/images/logo.png";

const year = new Date().getFullYear;

const nav__links = [
    {
        path:'/home',
        display:'Home'
    },
    {
        path:'/about',
        display:'About'
    },
];

const quick__links = [

    {
        path:'/login',
        display:'Login'
    },
    {
        path: '/register',
        display: 'Register'
    }
];

const Footer =() =>{
return (
    <footer className="footer">
        <Container>
            <Row>
                <Col lg="3">
                    <div className="logo">
                        <img src={logo} alt=""/>
                        <p></p>
                        <div className="social__links d-flex align-items-center gap-4">
                            <span>
                                <Link to="#"><i class='ri-youtube-line'></i>

                                </Link>
                            </span>
                            <span>
                                <Link to="#"><i class='ri-github-fill'></i>

                                </Link>
                            </span>
                            <span>
                                <Link to="#"><i class='ri-linkedin-line'></i>

                                </Link>
                            </span>
                        </div>
                    </div>
                </Col>
                <Col lg='3'>
                    <h5 className="footer__link-title">Discover</h5>
                    <ListGroup className="footer__quick-links">
                        {
                            quick__links.map((item,index) =>(
                                <ListGroupItem key={index} className="ps-0 border-0">
                                    <Link to={item.path} >{item.display}</Link>
                                </ListGroupItem>
                            ))
                        }
                    </ListGroup>                
                </Col>
                <Col lg='3'>
                <h5 className="footer__link-title">Quick Links</h5>
                    <ListGroup className="footer__quick-links">
                        {
                            nav__links.map((item,index) =>(
                                <ListGroupItem key={index} className="ps-0 border-0">
                                    <Link to={item.path} >{item.display}</Link>
                                </ListGroupItem>
                            ))
                        }
                    </ListGroup>  
                </Col>
                <Col lg='3'>
                    <h5 className="footer__link-title">Contact</h5>
                    <ListGroup className="footer__quick-links">
                        <ListGroupItem className="ps-0 border-0 d-flex align-items-center-gap-3">
                            <h6 className="mb-0 d-flex align-items-center gap-2">
                                <span><i class="ri-map-pin-line"></i></span>
                                Address:
                            </h6>
                            <p className="mb-0"> San Jose, CA</p>
                        </ListGroupItem>
                        <ListGroupItem className="ps-0 border-0 d-flex align-items-center-gap-3">
                            <h6 className="mb-0 d-flex align-items-center gap-2">
                                <span><i class="ri-mail-line"></i></span>
                                Email:
                            </h6>
                            <p className="mb-0">example@gmail.com</p>
                        </ListGroupItem>
                        <ListGroupItem className="ps-0 border-0 d-flex align-items-center-gap-3">
                            <h6 className="mb-0 d-flex align-items-center gap-2">
                                <span><i class="ri-phone-line"></i></span>
                                Phone: 
                            </h6>
                            <p className="mb-0"> +1 408-000-1111 </p>
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col lg="12" className="text-center pt-5">
                 <p className="copyright">Copyright@{year}, designed and developed by EZT. </p>
                 <p>All rights reserved.</p>
                </Col>
            </Row>
        </Container>
    </footer>
)
};

export default Footer;

