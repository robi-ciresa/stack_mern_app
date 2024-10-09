import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css'; 

const Footer = () => {
    return (
        <footer className="footer-custom text-center text-lg-start mt-auto">
            <Container className="p-4">
                <Row>
                    <Col lg={6} md={12} className="mb-4 mb-md-0">
                        <h5 className="footer-title">224 Adoption</h5>
                        <p className="footer-subtitle">
                            2day, 2morrow, 4ever.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at justo orci.</p>
                    </Col>
                    <Col lg={3} md={6} className="mb-4 mb-md-0">
                        <h5 className="footer-title">Links</h5>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#!" className="footer-link">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="#!" className="footer-link">Terms of Service</a>
                            </li>
                        </ul>
                    </Col>
                    <Col lg={3} md={6} className="mb-4 mb-md-0">
                        <h5 className="footer-title">Contact</h5>
                        <ul className="list-unstyled footer-contact">
                            <li>
                                <p>Email: info@224adoption.com</p>
                            </li>
                            <li>
                                <p>Phone: (123) 456-7890</p>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            <div className="footer-copyright text-center p-3">
                &copy; {new Date().getFullYear()} 224 Adoption. All rights reserved.
            </div>
           
        </footer>
    );
};

export default Footer;