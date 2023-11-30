import React from "react";
import {Container, Row, Col ,Button} from "reactstrap";
import {Link} from "react-router-dom";
import './thank-you.css';

const Failure = () => {
    return <>
    <section>
        <Container>
            <Row>
                <Col lg="12" className="pt-5 text-center">
                    <div className="thank__you">
                        <span><i class="ri-checkbox-circle-line"></i></span>
                        <h1 className="mb-3 fw-semibold">Your Subscription is not Enabled</h1>
                        <h3 className="mb-4">Please Try again!!!</h3>
                        <Button className="btn primary__btn"><Link to='/home'>Back to Home</Link></Button>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
    </>
}

export default Failure;